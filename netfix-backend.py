# app/main.py
from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timedelta
from typing import List, Optional
import stripe
import jwt
import bcrypt
import nmap
import ssl
import requests
from pydantic import BaseModel

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de Base de Datos
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/netfix_hub"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Configuración de Stripe
stripe.api_key = "sk_test_..."

# Configuración de JWT
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Modelos de Base de Datos
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    company_name = Column(String)
    subscription_tier = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Scan(Base):
    __tablename__ = "scans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    scan_type = Column(String)
    target_url = Column(String)
    status = Column(String)
    results = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Esquemas Pydantic
class UserCreate(BaseModel):
    email: str
    password: str
    company_name: str

class ScanCreate(BaseModel):
    target_url: str
    scan_type: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Funciones de seguridad
def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Dependencias
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(User).filter(User.email == payload.get("sub")).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Funciones de escaneo
async def perform_basic_scan(target_url: str) -> dict:
    results = {
        "port_scan": {},
        "ssl_check": {},
        "headers_check": {}
    }
    
    # Escaneo básico de puertos
    nm = nmap.PortScanner()
    nm.scan(target_url, arguments="-F -T4")
    results["port_scan"] = nm[target_url].all_tcp()
    
    # Verificación SSL
    try:
        cert = ssl.get_server_certificate((target_url, 443))
        results["ssl_check"]["valid"] = True
        results["ssl_check"]["certificate"] = cert
    except:
        results["ssl_check"]["valid"] = False
    
    # Verificación de headers
    try:
        response = requests.head(f"https://{target_url}")
        results["headers_check"] = dict(response.headers)
    except:
        results["headers_check"] = {"error": "Could not check headers"}
    
    return results

# Rutas de la API
@app.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        company_name=user.company_name,
        subscription_tier="free"
    )
    db.add(db_user)
    db.commit()
    return {"message": "User registered successfully"}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/subscribe")
async def create_subscription(plan_id: str, current_user: User = Depends(get_current_user)):
    try:
        # Crear cliente en Stripe
        customer = stripe.Customer.create(
            email=current_user.email,
            source="tok_visa"  # Token de prueba
        )
        
        # Crear suscripción
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": plan_id}],
        )
        
        return {"subscription_id": subscription.id}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/scan/free")
async def create_free_scan(scan: ScanCreate, db: Session = Depends(get_db)):
    results = await perform_basic_scan(scan.target_url)
    db_scan = Scan(
        user_id=None,
        scan_type="free",
        target_url=scan.target_url,
        status="completed",
        results=str(results)
    )
    db.add(db_scan)
    db.commit()
    return results

@app.post("/scan")
async def create_scan(
    scan: ScanCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verificar límites de suscripción
    scan_count = db.query(Scan).filter(
        Scan.user_id == current_user.id,
        Scan.created_at >= datetime.utcnow() - timedelta(days=30)
    ).count()
    
    if current_user.subscription_tier == "basic" and scan_count >= 1:
        raise HTTPException(status_code=403, detail="Scan limit reached for basic tier")
    elif current_user.subscription_tier == "professional" and scan_count >= 5:
        raise HTTPException(status_code=403, detail="Scan limit reached for professional tier")
    
    results = await perform_basic_scan(scan.target_url)
    db_scan = Scan(
        user_id=current_user.id,
        scan_type=scan.scan_type,
        target_url=scan.target_url,
        status="completed",
        results=str(results)
    )
    db.add(db_scan)
    db.commit()
    return results

# Crear tablas
Base.metadata.create_all(bind=engine)

{
  "name": "aparicio-edge-technologies",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*",
    "platform/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.7.1",
    "turbo": "latest",
    "typescript": "^4.8.4"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "packageManager": "pnpm@7.0.0"
}

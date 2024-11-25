// infrastructure/index.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";

const config = new pulumi.Config();

// VPC Configuration
const vpc = new aws.ec2.Vpc("aet-vpc", {
    cidrBlock: "10.0.0.0/16",
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: {
        Name: "aet-vpc",
        Environment: "production"
    }
});

// EKS Cluster
const cluster = new eks.Cluster("aet-cluster", {
    vpcId: vpc.id,
    instanceType: "t3.medium",
    desiredCapacity: 3,
    minSize: 2,
    maxSize: 4,
    tags: {
        Environment: "production"
    }
});

// RDS Instance
const db = new aws.rds.Instance("aet-db", {
    engine: "postgres",
    instanceClass: "db.t3.medium",
    allocatedStorage: 20,
    name: "aet_platform",
    username: "postgres",
    password: config.requireSecret("dbPassword"),
    skipFinalSnapshot: true,
    tags: {
        Environment: "production"
    }
});

// ElastiCache Redis
const redis = new aws.elasticache.Cluster("aet-redis", {
    engine: "redis",
    engineVersion: "7.0",
    nodeType: "cache.t3.medium",
    numCacheNodes: 1,
    port: 6379,
    tags: {
        Environment: "production"
    }
});

// Route53 Domain
const zone = new aws.route53.Zone("aet-zone", {
    name: "aparicioedge.tech",
    tags: {
        Environment: "production"
    }
});

// ACM Certificate
const cert = new aws.acm.Certificate("aet-cert", {
    domainName: "*.aparicioedge.tech",
    validationMethod: "DNS",
    tags: {
        Environment: "production"
    }
});

// Export values
export const clusterName = cluster.eksCluster.name;
export const dbEndpoint = db.endpoint;
export const redisEndpoint = redis.cacheNodes[0].address;
export const domainName = zone.name;

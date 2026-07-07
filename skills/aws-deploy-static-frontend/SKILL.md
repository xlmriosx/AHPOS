---
name: aws-deploy-static-frontend
description: Use when you need to host a static single-page application (SPA) or static website on AWS, distribute it globally, or configure custom domains with SSL/TLS.
---

# Deploying Static Frontend

## Overview
This skill provides the standard AWS architecture for hosting a static frontend (React, Vue, Angular, or simple HTML/CSS). The core principle is combining an Amazon S3 bucket for storage with Amazon CloudFront for content delivery, security, and edge caching.

## When to Use

- When asked to deploy a single-page application (SPA)
- When a static website needs global distribution and low latency
- When you need to attach a custom domain with HTTPS to a static site
- When NOT to use: If the frontend requires server-side rendering (SSR) like Next.js (use AWS Amplify, ECS, or Lambda@Edge instead).

## Core Pattern

The architecture consists of:
1. **S3 Bucket**: Stores the static assets (`index.html`, `js`, `css`). Bucket must be private, accessed only via CloudFront Origin Access Control (OAC).
2. **CloudFront Distribution**: Caches content globally, provides SSL/TLS termination, and handles routing.
3. **Route 53 (Optional)**: Maps a custom domain name to the CloudFront distribution.
4. **AWS Certificate Manager (ACM) (Optional)**: Provides the SSL certificate (must be created in `us-east-1` for CloudFront).

## Quick Reference

| Resource | Purpose | Configuration Requirements |
|----------|---------|----------------------------|
| **S3 Bucket** | Storage | Block public access, enable default encryption. |
| **CloudFront OAC**| Security | Authenticates CloudFront to read from S3. |
| **S3 Bucket Policy** | Access | Allow `s3:GetObject` only from the specific CloudFront distribution ARN. |
| **CloudFront Dist** | Delivery | Default root object: `index.html`. Custom error responses for 403/404 routing back to `/index.html` (for SPAs). |
| **ACM Certificate** | SSL | **MUST** be deployed in the `us-east-1` region. |

## Implementation

### Standard Terraform Pattern

```hcl
# S3 Bucket for Frontend Assets
resource "aws_s3_bucket" "frontend" {
  bucket = "my-unique-frontend-bucket-name"
}

# Block all public access at bucket level
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "frontend-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# S3 Bucket Policy allowing CloudFront access
data "aws_iam_policy_document" "frontend_s3" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.frontend.arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.frontend.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = data.aws_iam_policy_document.frontend_s3.json
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  
  # Ensure ACM cert is in us-east-1 if using custom domain
  # aliases = ["www.example.com"]
  # viewer_certificate {
  #   acm_certificate_arn = aws_acm_certificate.cert.arn
  #   ssl_support_method  = "sni-only"
  # }
  
  # Default CloudFront cert for testing
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "S3-frontend"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-frontend"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # For SPAs (React/Vue/Angular), redirect 404/403 to index.html
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
```

## Common Mistakes

| Mistake | Solution / Reality |
|---------|--------------------|
| **Creating ACM Certificate in wrong region** | CloudFront requires ACM certificates to be created in the `us-east-1` (N. Virginia) region exclusively. |
| **Using S3 Website Endpoint** | Do not use S3 website endpoint (`website_endpoint`). Use `bucket_regional_domain_name` with CloudFront Origin Access Control (OAC). |
| **S3 bucket is public** | Modern standard requires private S3 buckets accessed solely through CloudFront OAC. |
| **SPA routing fails on refresh (403/404)** | Must configure `custom_error_response` in CloudFront to catch 403/404 and return `/index.html` with a 200 status. |
| **Using OAI instead of OAC** | Origin Access Identity (OAI) is deprecated. Always use Origin Access Control (OAC) for new deployments. |

## Red Flags - STOP and Start Over
- Deploying the ACM certificate in any region other than `us-east-1`.
- Making the S3 bucket publicly readable (`public-read`).
- Using deprecated OAI (`origin_access_identity`) instead of OAC (`origin_access_control_id`).

**All of these mean: Stop, correct the configuration.**

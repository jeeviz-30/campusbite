# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

We take the security of the Canteen Pre-Order System seriously. If you discover a security vulnerability, please follow these guidelines:

1. **Do NOT open a public GitHub issue** to report a security vulnerability.
2. Please report security concerns through GitHub's Private Vulnerability Reporting feature under the **Security** tab of this repository:
   - [Report a security vulnerability](https://github.com/MITHU-06/Canteen-Preorder-System/security/advisories/new)
3. Provide detailed steps to reproduce the vulnerability, along with proof of concept if available.

### What to include in your report:
- Type of issue (e.g., SQL Injection, Authentication Bypass, Sensitive Data Exposure)
- Step-by-step instructions to reproduce
- Affected endpoints, parameters, or components
- Potential impact and mitigation recommendations

We appreciate your responsible disclosure and will acknowledge your report promptly.

---

## Security Best Practices for Deployments

- Always change default database passwords and placeholders before deploying to production.
- Use environment variables (`DB_URL`, `DB_USER`, `DB_PASSWORD`) rather than hardcoding credentials into configuration files.
- Restrict MySQL database access to authorized IP addresses.
- Use HTTPS in production reverse proxies (e.g., Nginx or Apache HTTP Server).

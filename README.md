# TrustPay

### Pay Only When You Receive

## Live Demo
https://trustpay-interswitch.vercel.app/

## Demo Credentials
**Buyer Account**
Email:testbuyer@example.com
Password: 123456

**Seller Account**
Email:testseller@example.com
Password: 123456

## How to Test
1. Log in as Buyer
2. Create a transaction by entering seller details and amount
3. Click “Pay” to simulate payment (transaction moves to ESCROW)
4. Open the transaction
5. Click “Confirm Delivery”

Expected outcomes:
* If the transaction passes security checks → status becomes COMPLETED
* If flagged as risky → transaction is blocked and a security alert is shown

## Overview
TrustPay is a peer-to-peer escrow platform designed to address the lack of trust in online transactions, particularly in informal digital marketplaces across Africa.

In many real-world scenarios, buyers are required to pay upfront without assurance of delivery, leading to frequent scams and disputes. TrustPay introduces a system where transactions are only completed after delivery is confirmed and verified through a security layer.

## Problem
* Buyers are exposed to fraud after making payments
* Sellers struggle to establish credibility
* Fake payment confirmations are common
* There is no reliable trust infrastructure for informal digital commerce

## Solution
TrustPay introduces a structured transaction flow that ensures:
* Payments are not considered complete immediately
* Transactions are held in a logical escrow state
* A cybersecurity layer validates transactions before completion
* Users can assess trust through a scoring system

## Core Workflow
1. Transaction Creation
   Buyer creates a transaction with seller details and amount

2. Payment
   Payment is simulated and transaction status is updated to ESCROW

3. Delivery
   Seller delivers the product or service

4. Confirmation
   Buyer confirms delivery

5. Security Validation
   The system calls a cybersecurity API that:

   * Validates transaction state
   * Evaluates risk score
   * Detects suspicious behavior

6. Finalization

   * If valid → transaction status becomes COMPLETED
   * If flagged → transaction is blocked for review

## Key Features
### Escrow Logic
Transactions are not finalized immediately after payment. Instead, they remain in an escrow state until delivery is confirmed.

### Cybersecurity Risk Engine
A dedicated backend system evaluates transactions before completion by:
* Verifying transaction integrity
* Assigning a risk score
* Blocking high-risk transactions

This ensures that even after payment, transactions are not blindly completed.


### Trust Score System
Users are assigned trust scores based on:
* Transaction history
* Dispute outcomes
* Reviews
This helps users make informed decisions before transacting.

### Dispute Resolution
Buyers can raise disputes with supporting information. Sellers can respond with evidence. The system supports structured resolution of conflicts.

### Role-Based Experience
* Buyers: create transactions, confirm delivery, raise disputes
* Sellers: receive transactions, build credibility, manage profiles

### Safety Education
The platform includes role-specific guidance:
* Buyers: scam prevention and safe transaction practices
* Sellers: trust building and transaction management

## System Architecture
Frontend (React / Vercel)
↓
Backend (API Layer)
↓
Cybersecurity API (Risk Engine)
↓
Database (MongoDB / Cloud Database)

## Tech Stack
Frontend:
* React
* TypeScript
* Tailwind CSS

Backend:
* Node.js

Database:
* MongoDB / Cloud Database

Security Layer:
* Custom Cybersecurity API

## Cybersecurity API
**Endpoint:**
POST /api/transactions/confirm/:id

**Description:**
This endpoint performs validation and risk assessment before allowing a transaction to be completed.

### Success Response
```json
{
  "status": "Success",
  "message": "Security checks passed. Funds released.",
  "finalStatus": "COMPLETED"
}
```
### Error Response
```json
{
  "error": "Security Block",
  "message": "High-risk transaction detected.",
  "riskScore": 60
}
```
## API Integration Note
Due to temporary downtime of the Interswitch API during the buildathon, payment flow is currently simulated.
However, the system is designed to integrate seamlessly with:
* Interswitch Web Checkout (IPG)
* Transaction verification APIs

## Repository Structure
/client → Frontend
/server → Backend
/cyber → Security engine
/docs → Additional documentation

## Team
* Alabi Ramat
* Imoru Abdul Samad
* Ayomide Oluwatola

## Project Status
* MVP complete
* End-to-end transaction flow functional
* Payment simulation implemented due to API constraints

## Conclusion
TrustPay is not just a payment application. It is a structured trust system that ensures transactions are validated, secure, and fair before completion.
It demonstrates how digital payments can evolve into intelligent systems that prioritize trust, verification, and user protection.

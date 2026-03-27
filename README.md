# TrustPay MVP

TrustPay is an escrow-first checkout prototype built with Next.js App Router and MongoDB.

Core promise: **Pay Only When You Receive**.

## Stack

- Next.js 16 (App Router)
- MongoDB + Mongoose
- Simulated Interswitch Web Checkout callback flow
- Multilingual UI labels (English, Nigerian Pidgin, Yoruba, Hausa) via a Yarn GPT translation utility adapter

## Required Environment Variables

Create a `.env.local` file:

```bash
MONGODB_URI=<your-mongodb-connection-string>
MONGODB_DB=trustpay
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<at-least-32-char-random-secret>
CYBERSECURITY_CONFIRM_URL=<optional-external-cyber-confirm-endpoint>
CYBERSECURITY_SHARED_SECRET=<optional-service-to-service-secret>
```

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Transaction Lifecycle

`PENDING -> ESCROW -> DELIVERED -> COMPLETED`

`DISPUTED` can be raised from `ESCROW` or `DELIVERED`.

## API Routes

- `POST /api/create-transaction`
- `POST /api/pay`
- `GET /api/interswitch/callback`
- `POST /api/transactions/confirm/:id`
- `POST /api/raise-dispute`

Additional lifecycle helper:

- `POST /api/confirm-delivery` (legacy compatibility route)
- `POST /api/mark-delivered`

## MVP Logic Included

- Trust score starts at `50`
- Successful completion adds `+10` trust to buyer and seller
- Lost dispute applies `-20` trust penalty
- Risk engine flags new-account high-value transactions and users with multiple active disputes
- Blockchain-style tamper log stores SHA-256 hash chain entries per transaction event

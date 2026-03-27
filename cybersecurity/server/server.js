import express from 'express';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transaction.js';

dotenv.config();

const app = express();
app.use(express.json()); // Allows the server to read JSON data

// Use your secured routes
app.use('/api/transactions', transactionRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🛡️ TrustPay Security Layer Active on Port ${PORT}`);
});
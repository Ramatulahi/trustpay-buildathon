import express from 'express';
import { riskCheck } from '../middleware/riskCheck.js';
import { enforceState } from '../middleware/security.js';

const router = express.Router();

// The "Confirm Delivery" logic
router.post('/confirm/:id', 
  async (req, res, next) => {
    // 1. Mock Database Fetch
    req.transaction = { id: req.params.id, status: 'ESCROW', buyerId: 'user123' }; 
    req.user = { id: 'user123' }; 
    next();
  },
  enforceState('ESCROW'), 
  riskCheck,              
  async (req, res) => {
    // 2. Final Logic
    req.transaction.status = 'COMPLETED';
    
    res.json({
      status: 'Success',
      message: 'Security checks passed. Funds released.',
      finalStatus: req.transaction.status
    });
  }
);

// 🛡️ CRITICAL: This is the default export server.js is looking for
export default router;
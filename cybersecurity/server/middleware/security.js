export function enforceState(requiredState) {
  return (req, res, next) => {
    const tx = req.transaction;
    if (!tx) return res.status(404).json({ error: "Transaction not found" });

    if (tx.status !== requiredState) {
      return res.status(400).json({ 
        error: "Invalid State", 
        message: `Expected ${requiredState}, got ${tx.status}` 
      });
    }
    next();
  };
}

export function onlyBuyer(req, res, next) {
  // Assuming req.user.id is populated by your auth middleware
  if (req.transaction.buyerId.toString() !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized: Only the buyer can perform this action" });
  }
  next();
}

export function preventDoubleAction(actionField) {
  return (req, res, next) => {
    if (req.transaction[actionField]) {
      return res.status(400).json({ error: "Action already performed" });
    }
    next();
  };
}
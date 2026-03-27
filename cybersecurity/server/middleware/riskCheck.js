import { calculateRisk } from "../utils/riskEngine.js";

export async function riskCheck(req, res, next) {
  const user = req.user; 
  const tx = req.body; 

  // Dev note: Replace with real Redis/DB counter for production
  const meta = { txCountLastMinute: req.rateLimitData?.count || 0 };

  const risk = calculateRisk(user, tx, meta);

  if (risk >= 50) {
    return res.status(403).json({
      error: "Security Block",
      message: "High-risk transaction detected. Manual review required.",
      riskScore: risk
    });
  }

  req.riskScore = risk;
  next();
}
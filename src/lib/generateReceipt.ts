export const generateReceipt = (transaction: {
  id: string;
  description: string;
  seller_name: string;
  seller_email: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  risk_score?: number | null;
  delivery_confirmed?: boolean;
}, buyerEmail: string) => {
  // Build SVG-based receipt content and convert to printable HTML
  const date = new Date(transaction.created_at).toLocaleDateString("en-NG", {
    day: "numeric", month: "long", year: "numeric"
  });
  const completedDate = new Date(transaction.updated_at).toLocaleDateString("en-NG", {
    day: "numeric", month: "long", year: "numeric"
  });
  const txRef = transaction.id.slice(0, 8).toUpperCase();

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>TrustPay Receipt - ${txRef}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #f0f2f5; padding: 40px; }
  .receipt { max-width: 500px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #3355cc, #7c4dff); padding: 32px 28px; color: #fff; text-align: center; }
  .header .logo { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; }
  .header .logo-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .header h1 { font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; opacity: 0.9; }
  .header .amount { font-size: 36px; font-weight: 800; margin-top: 12px; }
  .header .status { display: inline-block; margin-top: 10px; padding: 4px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.2); }
  .body { padding: 28px; }
  .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f2f5; }
  .row:last-child { border-bottom: none; }
  .row .label { color: #6b7280; font-size: 13px; font-weight: 500; }
  .row .value { color: #111827; font-size: 13px; font-weight: 600; text-align: right; max-width: 60%; word-break: break-word; }
  .divider { height: 1px; background: #e5e7eb; margin: 8px 0; }
  .footer { padding: 20px 28px; background: #f9fafb; text-align: center; border-top: 1px solid #f0f2f5; }
  .footer p { font-size: 11px; color: #9ca3af; line-height: 1.6; }
  .footer .brand { font-weight: 700; color: #3355cc; }
  .security-badge { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 12px; padding: 8px 16px; background: #ecfdf5; border-radius: 10px; }
  .security-badge span { font-size: 12px; color: #059669; font-weight: 600; }
  @media print {
    body { padding: 0; background: #fff; }
    .receipt { box-shadow: none; border-radius: 0; max-width: 100%; }
  }
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <div class="logo">
      <div class="logo-icon">🛡️</div>
      <span style="font-size:18px;font-weight:800;">TrustPay</span>
    </div>
    <h1>Transaction Receipt</h1>
    <div class="amount">₦${Number(transaction.amount).toLocaleString()}</div>
    <div class="status">✅ ${transaction.status}</div>
  </div>
  <div class="body">
    <div class="row"><span class="label">Reference</span><span class="value">#${txRef}</span></div>
    <div class="row"><span class="label">Description</span><span class="value">${transaction.description}</span></div>
    <div class="row"><span class="label">Seller</span><span class="value">${transaction.seller_name}</span></div>
    <div class="row"><span class="label">Seller Email</span><span class="value">${transaction.seller_email}</span></div>
    <div class="row"><span class="label">Buyer</span><span class="value">${buyerEmail}</span></div>
    <div class="divider"></div>
    <div class="row"><span class="label">Date Created</span><span class="value">${date}</span></div>
    <div class="row"><span class="label">Date Completed</span><span class="value">${completedDate}</span></div>
    <div class="row"><span class="label">Delivery Confirmed</span><span class="value">${transaction.delivery_confirmed ? "Yes ✅" : "No"}</span></div>
    ${transaction.risk_score != null ? `<div class="row"><span class="label">Security Score</span><span class="value">${transaction.risk_score}/100</span></div>` : ""}
    <div class="security-badge">
      <span>🔒 Secured by TrustPay Escrow</span>
    </div>
  </div>
  <div class="footer">
    <p>This receipt confirms a completed transaction on <span class="brand">TrustPay</span>.</p>
    <p style="margin-top:4px;">Generated on ${new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
  </div>
</div>
</body>
</html>`;

  // Open in new window for print/save as PDF
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    // Auto-trigger print dialog after a short delay
    setTimeout(() => printWindow.print(), 500);
  }
};

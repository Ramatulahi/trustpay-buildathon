export function calculateRisk(user, transaction, meta) {
  let risk = 0;
  const accountAgeHours = (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60);

  // 🔴 High Value + New Account: $Risk_{age} = 50$
  if (accountAgeHours < 24 && transaction.amount > 50000) risk += 50;

  // 🔴 Rapid Transaction Spikes: $Risk_{velocity} = 30$
  if (meta.txCountLastMinute > 3) risk += 30;

  // 🔴 Repeat Offenders: $Risk_{disputes} = 20$
  if (user.disputes > 2) risk += 20;

  return risk;
}
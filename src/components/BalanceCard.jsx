export default function BalanceCard({ balance = 0 }) {
  return (
    <div className="balance-card">
      <h3>Balance</h3>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
}

import "./BalanceCard.css";

const BalanceCard = () => {

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    user = storedUser
      ? JSON.parse(storedUser)
      : null;

  } catch (error) {
    user = null;
  }

  return (
    <div className="balance-card">
      <p>Total Balance</p>

      <h1>
        ₹ {user?.totalBalance || 0}
      </h1>
    </div>
  );
};

export default BalanceCard;
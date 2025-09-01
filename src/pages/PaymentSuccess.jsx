import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.performance.getEntriesByType("navigation")[0]?.type === "reload"
    ) {
      navigate(0);
    }
  }, [navigate]);
  return (
    <div>
      Payment success return To <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default PaymentSuccess;
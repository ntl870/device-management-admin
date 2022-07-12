import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuardRoute = ({ isPrivate = false, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isAuth = localStorage.getItem("isAuth");
      if (!isAuth && isPrivate) {
        navigate("/login", {
          replace: true,
        });
      }
      if (isAuth && !isPrivate) {
        navigate("/", {
          replace: true,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default GuardRoute;

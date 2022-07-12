import ProLayout from "@ant-design/pro-layout";
import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const settings = {
  colorWeak: false,
  title: "Device management",
  headerHeight: 60,
  fixedHeader: true,
  fixSiderbar: true,
  navTheme: "dark",
  theme: "dark",
  layout: "top",
  headerTheme: "dark",
};

export const PrivateLayout = ({ routes, children }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ProLayout
      navTheme="dark"
      headerTheme="dark"
      theme="dark"
      logo={null}
      route={{
        routes,
      }}
      location={{
        pathname,
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      menuFooterRender={(props) => {
        return (
          <div className="footer">
            <Button
              icon={<LogoutOutlined />}
              type="text"
              style={{ width: "100%" }}
              onClick={logout}
              danger
            >
              {!props.collapsed && "Logout"}
            </Button>
          </div>
        );
      }}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

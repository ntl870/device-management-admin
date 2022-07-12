import { PrivateLayout } from "./PrivateLayout";
import { Home } from "../pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { PlusOutlined, AppstoreOutlined } from "@ant-design/icons";
import { NewDevice } from "../pages/NewDevice";
import { EditDevice } from "../pages/EditDevice";

export const PrivateRoute = () => {
  const routes = [
    {
      path: "/",
      name: "Home",
      element: <Home />,
      icon: <AppstoreOutlined />,
    },
    {
      path: "/add-device",
      name: "Add new device",
      element: <NewDevice />,
      icon: <PlusOutlined />,
    },
    {
      path: "/edit-device/:id",
      name: "Edit Device",
      element: <EditDevice />,
      icon: <PlusOutlined />,
      hiddenSidebar: true,
    },
  ];

  return (
    <PrivateLayout routes={routes.filter((item) => !item.hiddenSidebar)}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PrivateLayout>
  );
};

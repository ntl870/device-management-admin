import {
  Table,
  Image,
  Button,
  Modal,
  Typography,
  notification,
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import { deleteProduct } from "../api/product";
import {
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getListProducts } from "../api/product";

export const Home = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteBook = async () => {
    try {
      setDeleteLoading(true);
      await deleteProduct(selectedItem.id);
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Device deleted successfully"
            type="success"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
      setSelectedItem(null);
      setDeleteLoading(false);
      setLoading(false);
    } catch (e) {
      notification.error({
        message: (
          <Typography.Title level={5} type="success">
            Error
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Book deleted failed"
            type="success"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
    } finally {
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      render: (device) => device?.category.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      key: "image",
      render: (device) => {
        return (
          <Image src={device.image} width={200} title="Preview" alt="preview" />
        );
      },
    },
    {
      title: "Price",
      key: "price",
      render: (device) => `$${device.price}`,
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Sold Quantity",
      key: "soldQuantity",
      dataIndex: "soldQuantity",
    },
    {
      title: "Action",
      key: "action",
      render: (device) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onClick={() => navigate(`/edit-device/${device.id}`)}>
              <EditOutlined />
            </Button>
            <Button type="ghost" danger onClick={() => setSelectedItem(device)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    getListProducts()
      .then(({ data }) => {
        setDevices(data.products);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Table
        pagination={{
          defaultCurrent: 1,
          pageSize: 5,
        }}
        dataSource={devices}
        columns={columns}
        loading={loading}
      />
      {!!selectedItem && (
        <Modal
          title="Delete book"
          visible={!!selectedItem}
          onCancel={() => setSelectedItem(null)}
          footer={
            <>
              <Button danger onClick={handleDeleteBook} loading={deleteLoading}>
                Delete
              </Button>
              <Button onClick={() => setSelectedItem(null)}>Cancel</Button>
            </>
          }
        >
          <Typography>Do you want to delete this book ?</Typography>
        </Modal>
      )}
      <Button
        icon={<LogoutOutlined />}
        type="primary"
        style={{ position: "fixed", right: "1rem", bottom: "1rem" }}
        onClick={logout}
        danger
      >
        Logout
      </Button>
    </>
  );
};

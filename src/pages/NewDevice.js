import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Upload,
  InputNumber,
  Image,
  message,
} from "antd";
import {
  LockOutlined,
  DollarCircleOutlined,
  NumberOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { CategoriesSelector } from "../components/selectors/CategoriesSelector";
import { getDownloadURL } from "firebase/storage";
import { upLoadFile } from "../utils/uploadFile";
import { useState } from "react";
import { createProduct } from "../api/product";
import { useNavigate } from "react-router-dom";

export const NewDevice = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({
    fileList: [],
    url: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createProduct({
        ...values,
        categoryId: values.categories,
        image: image.url,
      });
      message.success("Added device successfully");
      form.resetFields();
      setImage({
        fileList: [],
        url: "",
      });
    } catch (e) {
      message.error("Added device failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          fileList: [],
          url: "",
        }}
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Row justify="center" align="middle">
          <Col span={14}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input type="text" placeholder="Device Name" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Description"
              />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: "Please input your price!",
                  },
                ]}
              >
                <InputNumber
                  prefix={
                    <DollarCircleOutlined className="site-form-item-icon" />
                  }
                  type="text"
                  placeholder="Price"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[
                  {
                    required: true,
                    message: "Please input your stock!",
                  },
                ]}
              >
                <InputNumber
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="Stock"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="soldQuantity"
                label="Sold Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your quantity!",
                  },
                ]}
              >
                <InputNumber
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="Quantity"
                />
              </Form.Item>
            </Col>
          </Col>

          <Col span={14}></Col>

          <Col span={14}>
            {image.fileList.length > 0 ? (
              <Image src={image.url} />
            ) : (
              <Upload
                name="image"
                listType="picture-card"
                rules={[
                  {
                    required: true,
                    message: "Please input your cover image!",
                  },
                ]}
                fileList={[]}
                // onPreview={handlePreview}
                onChange={(e) => {
                  const uploadTask = upLoadFile(
                    e.fileList[0].originFileObj,
                    `books/cover-image/${e.fileList[0].name}`
                  );
                  uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                      alert(error);
                    },
                    () => {
                      getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                          setImage({
                            fileList: e.fileList,
                            url: downloadURL,
                          });
                        }
                      );
                    }
                  );
                }}
              >
                Upload
              </Upload>
            )}
          </Col>
          <Col span={14}>
            <Form.Item
              name="categories"
              rules={[
                {
                  required: true,
                  message: "Please input your category!",
                },
              ]}
              label="Category"
            >
              <CategoriesSelector
                name="categories"
                onChange={(value) => form.setFieldsValue({ categories: value })}
              />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Add new device
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
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

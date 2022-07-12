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
} from "@ant-design/icons";
import { CategoriesSelector } from "../components/selectors/CategoriesSelector";
import { getDownloadURL } from "firebase/storage";
import { upLoadFile } from "../utils/uploadFile";
import { useState } from "react";
import { getProductById, updateProductById } from "../api/product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const EditDevice = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState({});
  const [image, setImage] = useState({
    fileList: [],
    url: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateProductById(
        {
          ...values,
          categoryId: values.categories,
          image: image.url,
        },
        id
      );
      message.success("Edited device successfully");
      form.resetFields();
      setImage({
        fileList: [],
        url: "",
      });
    } catch (e) {
      message.error("Edited device failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await getProductById(id);
      setInitForm({
        ...data.product,
        categories: data.product.categoryId,
      });
      form.setFieldsValue({
        ...data.product,
        categories: data.product.categoryId,
      });
    })();
  }, [form, id]);

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
      initialValues={initForm}
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
              Edit device
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

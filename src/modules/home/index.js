import React from "react";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Layout } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Menu } from "antd";
import {  PicLeftOutlined} from "@ant-design/icons";
import style from "./styles.module.css";

const { Content, Footer, Sider } = Layout;
const sider_items = [{
	key: 1,
	icon: React.createElement(PicLeftOutlined),
	label: 'All Servers'
}];

const EditableTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`).then((res) => {
      setDataSource(res.data);
    });
  }, []);

  const onFinish = (values) => {
    setConfirmLoading(true);
    if (editing) {
      values['id'] = selectedRecord.id;
      axios
        .put(
          `${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`,
          values
        )
        .then((res) => {
          setDataSource(
            dataSource.map((record) =>
              record.id === selectedRecord.id ? { ...res.data } : record
            )
          );
          setConfirmLoading(false);
          setVisible(false);
          setEditing(false);
          setSelectedRecord({});
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`, values)
        .then((res) => {
          setDataSource([...dataSource, res.data]);
          setConfirmLoading(false);
          setVisible(false);
          setEditing(false);
          setSelectedRecord({});
        });
    }
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditing(true);
    setSelectedRecord(record);
    setVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers/${record.id}`)
      .then(() => {
        setDataSource(dataSource.filter((r) => r.id !== record.id));
      });
  };

  const columns = [{
        title: "Name",
        dataIndex: "name",
        key: "name",
    }, {
        title: "Id",
        dataIndex: "id",
        key: "id",
    }, {
        title: "Language",
        dataIndex: "language",
        key: "language",
    }, {
        title: "Framework",
        dataIndex: "framework",
        key: "framework",
    }, {
        title: "Action",
        key: "action",
        render: (record) => (
            <span>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                style={{ marginRight: "8px" }}
            >
                Edit
            </Button>
            <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
            >
                Delete
            </Button>
            </span>
        ),
    },
  ];

  return (
    <>
      <Layout hasSider>
        <Sider className={style.sider}>
            <div className={style.sider_child}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={sider_items} />
                <Button type="primary" onClick={() => setVisible(true)}>
                  Add New
                </Button>
                {/* <ModalForm className={style.modal} handler={props.handler}/> */}
            </div>
        </Sider>
        <Layout className={style.site_layout}>
            <Content className={style.content}>
                <div className={style.wrapper}>
                    <div className={style.table}>
                        <Table dataSource={dataSource} columns={columns} />
                        <Modal
                          title={editing ? "Edit Record" : "Add New Record"}
                          visible={visible}
                          onOk={form.submit}
                          confirmLoading={confirmLoading}
                          onCancel={() => {
                            setVisible(false);
                            setEditing(false);
                            setSelectedRecord({});
                            form.resetFields();
                          }}
                        >
                          <Form form={form} onFinish={onFinish}>
                            <Form.Item
                              name="name"
                              label="Name"
                              rules={[{ required: true, message: "Please input name!" }]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="language"
                              label="language"
                              rules={[
                                {
                                  type: "string",
                                  // required: true,
                                  message: "Please input language!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="framework"
                              label="framework"
                              rules={[
                                {
                                  // required: true,
                                  message: "Please input framework!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Form>
                        </Modal>
                    </div>
                </div>
            </Content>
            <Footer
                style={{
                textAlign: "center",
                }}
            >
                Kaiburr Assessment ,2023 Created by Siddhartha Rana
            </Footer>
        </Layout>
      </Layout>
    </>
  );

}
export default EditableTable
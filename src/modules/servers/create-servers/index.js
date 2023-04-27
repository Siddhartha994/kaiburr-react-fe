import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const ModalForm = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const onFinish = (values) => {
        // create unique id using ms
        const id =  Date.now() % 10000;
        values['id'] = id;

        // submit form data to server
        axios.post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`,values)
            .then((result) => {
                if (result?.status === 200) {
                    // update state
                    props.handler(result);  
                    // success-popup
                    message.success({
                        content: 'Form submitted successfully',
                        icon: <CheckCircleOutlined />,
                        duration: 3 // Duration in seconds to show the message
                        });
                    setIsModalVisible(false);
                }
                else if (result?.status === 400) {
                    message.error({
                        content: 'Failed to submit form',
                        icon: <ExclamationCircleOutlined />,
                        duration: 3
                    })
                    setIsModalVisible(false);
                }
                else {
                    message.error({
                        content: 'Failed to submit form',
                        icon: <ExclamationCircleOutlined />,
                        duration: 3
                    })
                    setIsModalVisible(false);
                }
            }).catch(err => {
                message.error({
                    content: 'Failed to submit form',
                    icon: <ExclamationCircleOutlined />,
                    duration: 3
                })
            setIsModalVisible(false);
        })
        form.resetFields(); // Clear the form data
    };
    return (
        <>
        <Button type="primary" onClick={showModal}>Create Server</Button>
        <Modal title="Add a New Server" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
            <Form form={form} onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input server name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Language" name="language" rules={[{ required: true, message: 'Please enter a programming Language' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Framework" name="framework" rules={[{ required: false }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default ModalForm;

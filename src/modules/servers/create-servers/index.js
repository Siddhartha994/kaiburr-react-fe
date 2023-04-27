import React, { useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const ModalForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const onFinish = (values) => {
        const id =  Date.now() % 10000;
        values['id'] = id;
        
        console.log(values);
        // submit form data to server
        const saveData = axios.post(`${process.env.REACT_APP_BASE_API_ENDPOINT}/servers`,values);
        saveData
        .then((result) => {
            if (result?.status === 200) {
                console.log(result)
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

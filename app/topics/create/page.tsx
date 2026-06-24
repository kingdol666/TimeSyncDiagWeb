"use client";

import { Card, Form, Input, InputNumber, Select, Button } from "antd";
import type { Topic } from "@/types/kafka";

const { Option } = Select;

const CreateTopic = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Topic) => {
    console.log("表单数据:", values);
    // 这里可以添加创建主题的逻辑
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">创建主题</h1>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            partitions: 8,
            replicas: 3,
            retention: 7,
            cleanupPolicy: "delete",
          }}
        >
          <Form.Item
            label="主题名称"
            name="name"
            rules={[
              { required: true, message: "请输入主题名称" },
              {
                pattern: /^[a-zA-Z0-9_.-]+$/,
                message: "主题名称只能包含字母、数字、下划线、点和连字符",
              },
            ]}
          >
            <Input placeholder="请输入主题名称" />
          </Form.Item>

          <Form.Item
            label="分区数"
            name="partitions"
            rules={[{ required: true, message: "请输入分区数" }]}
          >
            <InputNumber min={1} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="副本数"
            name="replicas"
            rules={[{ required: true, message: "请输入副本数" }]}
          >
            <InputNumber min={1} max={10} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="保留时间（天）"
            name="retention"
            rules={[{ required: true, message: "请输入保留时间" }]}
          >
            <InputNumber min={1} max={365} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="清理策略"
            name="cleanupPolicy"
            rules={[{ required: true, message: "请选择清理策略" }]}
          >
            <Select placeholder="请选择清理策略">
              <Option value="delete">删除（delete）</Option>
              <Option value="compact">压缩（compact）</Option>
            </Select>
          </Form.Item>

          <Form.Item label="描述" name="description">
            <Input.TextArea rows={4} placeholder="请输入主题描述" />
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="default" className="mr-2">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              创建主题
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTopic;

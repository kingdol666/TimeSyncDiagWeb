"use client";

import { Card, Form, Input, InputNumber, Switch, Button, Divider } from "antd";

const SettingsPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("设置数据:", values);
    // 这里可以添加保存设置的逻辑
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
            fetchInterval: 5000,
          }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">系统设置</h3>
            <Form.Item
              label="后端 API 地址"
              name="apiUrl"
              rules={[{ required: true, message: "请输入后端 API 地址" }]}
            >
              <Input placeholder="例如: localhost:9092,localhost:9093" />
            </Form.Item>
          </div>

          <Divider />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">性能设置</h3>
            <Form.Item
              label="数据刷新间隔（毫秒）"
              name="fetchInterval"
              rules={[{ required: true, message: "请输入刷新间隔" }]}
            >
              <InputNumber min={1000} max={60000} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Divider />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">存储设置</h3>
            <Form.Item
              label="数据保留天数"
              name="retentionDays"
              rules={[{ required: true, message: "请输入保留天数" }]}
            >
              <InputNumber min={1} max={365} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Divider />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">功能开关</h3>
            <Form.Item
              label="启用指标监控"
              name="enableMetrics"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="启用告警通知"
              name="enableAlerts"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item className="text-right">
            <Button type="default" className="mr-2">
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPage;

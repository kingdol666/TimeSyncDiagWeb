"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Descriptions } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, BugOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function TestLevel1Sub2Page() {
  const router = useRouter();

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              style={{ marginBottom: "16px" }}
            >
              返回
            </Button>
            <Title level={2}>
              <BugOutlined style={{ marginRight: "8px" }} />
              子菜单2 - 测试页面
            </Title>
          </div>
          
          <Card type="inner" title="页面详情">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="菜单路径">
                测试菜单 / 一级菜单 / 子菜单2
              </Descriptions.Item>
              <Descriptions.Item label="页面状态">
                <Tag color="success">正常运行</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {new Date().toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          
          <Card type="inner" title="测试信息">
            <Paragraph>
              这是子菜单2的测试页面，用于验证多级菜单系统的完整性和功能正确性。
            </Paragraph>
            <Space>
              <Tag color="red">测试页面</Tag>
              <Tag color="cyan">一级菜单</Tag>
              <Tag color="purple">子菜单2</Tag>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
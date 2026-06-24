"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Divider } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ExperimentOutlined } from "@ant-design/icons";
import DragTextContainerManager from "./DragTextContainerManager";

const { Title, Paragraph } = Typography;

export default function TestLevel1Sub1Page() {
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
              <ExperimentOutlined style={{ marginRight: "8px" }} />
              子菜单1 - 测试页面
            </Title>
          </div>
          
          <Card type="inner" title="页面信息">
            <Paragraph>
              这是测试菜单 → 一级菜单 → 子菜单1 的测试页面。
            </Paragraph>
            <Space>
              <Tag color="blue">测试页面</Tag>
              <Tag color="green">一级菜单</Tag>
              <Tag color="orange">子菜单1</Tag>
            </Space>
          </Card>
          
          <Card type="inner" title="功能测试">
            <Paragraph>
              此页面用于测试多级菜单导航功能，确保页面能够正确加载和显示。
            </Paragraph>
          </Card>
          
          <Divider />
          
          <DragTextContainerManager />
        </Space>
      </Card>
    </div>
  );
}
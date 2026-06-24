"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Alert } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, NodeExpandOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function TestDeep1Page() {
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
              <NodeExpandOutlined style={{ marginRight: "8px" }} />
              深层页面1 - 嵌套菜单测试
            </Title>
          </div>
          
          <Alert
            message="深层嵌套页面"
            description="这是三级嵌套菜单中的深层页面1，用于测试深层路由导航功能。"
            type="info"
            showIcon
          />
          
          <Card type="inner" title="页面路径">
            <Paragraph>
              测试菜单 → 二级菜单 → 嵌套菜单 → 深层页面1
            </Paragraph>
            <Space>
              <Tag color="blue">深层页面</Tag>
              <Tag color="green">三级嵌套</Tag>
              <Tag color="orange">深层页面1</Tag>
            </Space>
          </Card>
          
          <Card type="inner" title="功能说明">
            <Paragraph>
              此页面用于验证深层嵌套菜单的导航功能，确保在多层嵌套结构下页面能够正确加载和显示。
            </Paragraph>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
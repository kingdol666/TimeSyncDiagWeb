"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Timeline } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function TestDeep2Page() {
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
              <ClockCircleOutlined style={{ marginRight: "8px" }} />
              深层页面2 - 时间线测试
            </Title>
          </div>
          
          <Card type="inner" title="页面路径">
            <Paragraph>
              测试菜单 → 二级菜单 → 嵌套菜单 → 深层页面2
            </Paragraph>
            <Space>
              <Tag color="blue">深层页面</Tag>
              <Tag color="green">三级嵌套</Tag>
              <Tag color="orange">深层页面2</Tag>
            </Space>
          </Card>
          
          <Card type="inner" title="时间线演示">
            <Timeline
              items={[
                {
                  children: '创建深层页面1',
                },
                {
                  children: '创建深层页面2',
                  color: 'green',
                },
                {
                  children: '测试多级菜单导航',
                  color: 'blue',
                },
                {
                  children: '验证页面功能',
                  color: 'red',
                },
              ]}
            />
          </Card>
        </Space>
      </Card>
    </div>
  );
}
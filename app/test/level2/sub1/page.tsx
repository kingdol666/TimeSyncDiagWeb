"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Statistic, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, DashboardOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function TestLevel2Sub1Page() {
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
              <DashboardOutlined style={{ marginRight: "8px" }} />
              测试页面A - 数据看板
            </Title>
          </div>
          
          <Card type="inner" title="页面信息">
            <Paragraph>
              这是测试菜单 → 二级菜单 → 测试页面A 的数据看板页面。
            </Paragraph>
            <Space>
              <Tag color="blue">数据看板</Tag>
              <Tag color="green">二级菜单</Tag>
              <Tag color="orange">测试页面A</Tag>
            </Space>
          </Card>
          
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="测试数据1"
                  value={1128}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="测试数据2"
                  value={93.5}
                  precision={1}
                  valueStyle={{ color: '#cf1322' }}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="测试数据3"
                  value={1234}
                  precision={0}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </Card>
    </div>
  );
}
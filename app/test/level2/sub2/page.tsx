"use client";

import React from "react";
import { Card, Typography, Space, Tag, Button, Table } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, TableOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const testData = [
  {
    key: '1',
    name: '测试项目1',
    status: '运行中',
    progress: 85,
    createTime: '2024-01-15 10:30:00',
  },
  {
    key: '2',
    name: '测试项目2',
    status: '已完成',
    progress: 100,
    createTime: '2024-01-14 15:20:00',
  },
  {
    key: '3',
    name: '测试项目3',
    status: '待开始',
    progress: 0,
    createTime: '2024-01-16 09:00:00',
  },
];

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const color = status === '运行中' ? 'orange' : status === '已完成' ? 'green' : 'default';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    render: (progress: number) => `${progress}%`,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

export default function TestLevel2Sub2Page() {
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
              <TableOutlined style={{ marginRight: "8px" }} />
              测试页面B - 数据表格
            </Title>
          </div>
          
          <Card type="inner" title="页面信息">
            <Paragraph>
              这是测试菜单 → 二级菜单 → 测试页面B 的数据表格页面。
            </Paragraph>
            <Space>
              <Tag color="blue">数据表格</Tag>
              <Tag color="green">二级菜单</Tag>
              <Tag color="orange">测试页面B</Tag>
            </Space>
          </Card>
          
          <Card type="inner" title="测试数据">
            <Table 
              columns={columns} 
              dataSource={testData} 
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </Space>
      </Card>
    </div>
  );
}
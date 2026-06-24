"use client";

import { Card, Table, Button, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { Topic } from "@/types/kafka";

const TopicList = () => {
  // 模拟主题数据
  const topicsData: Topic[] = [
    {
      key: "1",
      name: "sensor_data",
      partitions: 8,
      replicas: 3,
      status: "active",
      messages: 12500,
    },
    {
      key: "2",
      name: "logs",
      partitions: 16,
      replicas: 2,
      status: "active",
      messages: 8900,
    },
    {
      key: "3",
      name: "events",
      partitions: 4,
      replicas: 3,
      status: "active",
      messages: 5400,
    },
    {
      key: "4",
      name: "metrics",
      partitions: 2,
      replicas: 2,
      status: "inactive",
      messages: 3200,
    },
    {
      key: "5",
      name: "alerts",
      partitions: 1,
      replicas: 3,
      status: "active",
      messages: 1200,
    },
  ];

  const columns = [
    { title: "主题名称", dataIndex: "name", key: "name" },
    { title: "分区数", dataIndex: "partitions", key: "partitions" },
    { title: "副本数", dataIndex: "replicas", key: "replicas" },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "活跃" : "非活跃"}
        </Tag>
      ),
    },
    { title: "消息数", dataIndex: "messages", key: "messages" },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">主题列表</h1>

      <div className="mb-4 flex justify-end">
        <Button type="primary">创建主题</Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={topicsData}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default TopicList;

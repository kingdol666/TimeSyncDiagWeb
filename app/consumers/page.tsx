"use client";

import { Card, Table, Tag, Button, Space } from "antd";
import { UserOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ConsumerGroup } from "@/types/kafka";

const ConsumersPage = () => {
  // 模拟消费者组数据
  const consumersData: ConsumerGroup[] = [
    {
      key: "1",
      groupId: "sensor_data_group",
      status: "stable",
      members: 5,
      lag: 0,
    },
    {
      key: "2",
      groupId: "logs_consumer_group",
      status: "stable",
      members: 3,
      lag: 0,
    },
    {
      key: "3",
      groupId: "events_processor",
      status: "rebalancing",
      members: 2,
      lag: 42,
    },
    {
      key: "4",
      groupId: "metrics_aggregator",
      status: "stable",
      members: 1,
      lag: 0,
    },
    {
      key: "5",
      groupId: "alerts_handler",
      status: "dead",
      members: 0,
      lag: 128,
    },
  ];

  const columns = [
    { title: "消费者组ID", dataIndex: "groupId", key: "groupId" },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "green";
        let text = "稳定";

        if (status === "rebalancing") {
          color = "orange";
          text = "重新平衡中";
        } else if (status === "dead") {
          color = "red";
          text = "死亡";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    { title: "成员数", dataIndex: "members", key: "members" },
    { title: "消费延迟", dataIndex: "lag", key: "lag" },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>
            查看详情
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除组
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">消费者组管理</h1>

      <Card>
        <Table
          columns={columns}
          dataSource={consumersData}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ConsumersPage;

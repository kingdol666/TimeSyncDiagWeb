"use client";

import { Card, Statistic, Row, Col, List, Progress, Button } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import type { SystemStat, TopicStat } from "@/types/kafka";
import ThickMapChart from "@/components/ThickMapChart";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardOverview = () => {
  const { t, toggleLanguage, language } = useLanguage();

  const stats: SystemStat[] = [
    {
      title: t.overview.totalTopics,
      value: 42,
      prefix: <UserOutlined />,
      trend: 12,
    },
    {
      title: t.overview.activeConsumers,
      value: 18,
      prefix: <UserOutlined />,
      trend: -5,
    },
    {
      title: t.overview.messageThroughput,
      value: "28.5k",
      prefix: <UserOutlined />,
      trend: 8,
    },
    {
      title: t.overview.latencyMetric,
      value: "12ms",
      prefix: <UserOutlined />,
      trend: -3,
    },
  ];

  const topicStats: TopicStat[] = [
    { name: "sensor_data", messages: 12500, progress: 85 },
    { name: "logs", messages: 8900, progress: 60 },
    { name: "events", messages: 5400, progress: 45 },
    { name: "metrics", messages: 3200, progress: 30 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t.overview.title}</h1>
        <Button
          type="default"
          icon={<GlobalOutlined />}
          onClick={toggleLanguage}
        >
          {language === "zh" ? "English" : "中文"}
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={
                  stat.trend !== undefined && (
                    <span
                      className={
                        stat.trend > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {stat.trend > 0 ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )}
                      {Math.abs(stat.trend)}%
                    </span>
                  )
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card title={t.overview.topicActivity} className="mt-6">
        <List
          dataSource={topicStats}
          renderItem={(item) => (
            <List.Item className="py-4">
              <div className="flex justify-between w-full">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-gray-500 text-sm">
                    {item.messages} {t.overview.messages}
                  </div>
                </div>
                <div className="w-3/5">
                  <Progress
                    percent={item.progress}
                    strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                  />
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <div className="mt-6">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ThickMapChart />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardOverview;

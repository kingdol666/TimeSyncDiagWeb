'use client';

import { Card, Row, Col, Statistic, List, Button, Typography } from 'antd';
import { UserOutlined, ArrowUpOutlined, ArrowDownOutlined, BarChartOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { SystemStat } from '@/types/kafka';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  // 模拟系统概览数据
  const overviewStats: SystemStat[] = [
    { title: '活跃主题', value: 42, prefix: <FileTextOutlined />, trend: 5 },
    { title: '消费者组', value: 18, prefix: <UserOutlined />, trend: 2 },
    { title: '今日消息量', value: '2.5M', prefix: <BarChartOutlined />, trend: 15 },
    { title: '系统状态', value: '正常', prefix: <SettingOutlined />, trend: 0 },
  ];

  // 快速链接
  const quickLinks = [
    { key: '1', title: '数据看板概览', href: '/dashboard/overview', icon: <BarChartOutlined /> },
    { key: '2', title: '主题列表', href: '/topics/list', icon: <FileTextOutlined /> },
    { key: '3', title: '创建主题', href: '/topics/create', icon: <FileTextOutlined /> },
    { key: '4', title: '消费者组', href: '/consumers', icon: <UserOutlined /> },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={3}>欢迎使用 TimeSyncDiag</Title>
            <Paragraph>
              时序对齐图像诊断系统 —— 膜厚采集、热力图云图生成、QwenVL 多模态 AI 诊断。
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <h2 className="text-xl font-bold mt-6 mb-4">系统概览</h2>
      <Row gutter={[16, 16]}>
        {overviewStats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.trend !== undefined && stat.trend !== 0 ? (
                  <span className={stat.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                    {stat.trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stat.trend)}%
                  </span>
                ) : undefined}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-xl font-bold mt-6 mb-4">快速操作</h2>
      <Card>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={quickLinks}
          renderItem={(item) => (
            <List.Item>
              <Link href={item.href} className="block">
                <Button type="primary" icon={item.icon} block>
                  {item.title}
                </Button>
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default HomePage;

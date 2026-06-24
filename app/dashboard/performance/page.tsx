'use client';

import { Card, Row, Col, Table, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { PerformanceMetric } from '@/types/kafka';

const PerformanceMonitoring = () => {
  // 模拟性能数据
  const performanceStats = [
    { title: '平均延迟', value: '8.2ms' },
    { title: '最大延迟', value: '45ms' },
    { title: 'CPU使用率', value: '42%' },
    { title: '内存使用率', value: '68%' },
  ];

  // 性能指标表格数据
  const performanceData: PerformanceMetric[] = [
    { key: '1', metric: 'producer_latency', value: '7.8ms', unit: 'ms', trend: '+2.1%' },
    { key: '2', metric: 'consumer_latency', value: '9.3ms', unit: 'ms', trend: '-1.5%' },
    { key: '3', metric: 'broker_cpu', value: '42', unit: '%', trend: '+5.2%' },
    { key: '4', metric: 'broker_memory', value: '68', unit: '%', trend: '+3.8%' },
    { key: '5', metric: 'disk_io', value: '23.5', unit: 'MB/s', trend: '-2.3%' },
  ];

  const columns = [
    { title: '指标名称', dataIndex: 'metric', key: 'metric' },
    { title: '当前值', dataIndex: 'value', key: 'value' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '趋势', dataIndex: 'trend', key: 'trend' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">性能监控</h1>
      
      <Row gutter={[16, 16]}>
        {performanceStats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="详细性能指标" className="mt-6">
        <Table columns={columns} dataSource={performanceData} pagination={false} />
      </Card>
    </div>
  );
};

export default PerformanceMonitoring;
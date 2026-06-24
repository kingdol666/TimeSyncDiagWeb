// Kafka相关的类型定义

export interface Topic {
  key: string;
  name: string;
  partitions: number;
  replicas: number;
  status: 'active' | 'inactive';
  messages: number;
}

export interface ConsumerGroup {
  key: string;
  groupId: string;
  status: 'stable' | 'rebalancing' | 'dead';
  members: number;
  lag: number;
}

export interface PerformanceMetric {
  key: string;
  metric: string;
  value: string;
  unit: string;
  trend: string;
}

export interface SystemStat {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  trend?: number;
}

export interface TopicStat {
  name: string;
  messages: number;
  progress: number;
}
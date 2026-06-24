// 菜单项基础配置
export interface MenuConfigItem {
  key: string;
  label: string;
  children?: MenuConfigItem[];
}

// 主菜单配置
export const menuConfig: MenuConfigItem[] = [
  { key: '/', label: '首页' },
  {
    key: 'dashboard',
    label: '数据看板',
    children: [
      { key: 'dashboard/overview', label: '概览' },
      { key: 'dashboard/performance', label: '性能监控' },
      { key: 'dashboard/history', label: '查看历史诊断数据' },
    ],
  },
  {
    key: 'topics',
    label: '主题管理',
    children: [
      { key: 'topics/list', label: '主题列表' },
      { key: 'topics/create', label: '创建主题' },
    ],
  },
  { key: 'consumers', label: '消费者组' },
  { key: 'settings', label: '系统设置' },
  {
    key: 'test',
    label: '测试菜单',
    children: [
      {
        key: 'test/level1',
        label: '一级菜单',
        children: [
          { key: 'test/level1/sub1', label: '子菜单1' },
          { key: 'test/level1/sub2', label: '子菜单2' },
        ],
      },
      {
        key: 'test/level2',
        label: '二级菜单',
        children: [
          { key: 'test/level2/sub1', label: '测试页面A' },
          { key: 'test/level2/sub2', label: '测试页面B' },
          {
            key: 'test/level2/nested',
            label: '嵌套菜单',
            children: [
              { key: 'test/level2/nested/deep1', label: '深层页面1' },
              { key: 'test/level2/nested/deep2', label: '深层页面2' },
            ],
          },
        ],
      },
      { key: 'test/agentPage', label: 'AgentTest' },
    ],
  },
];

// 快速链接配置
export const quickLinksConfig = [
  { key: '1', title: '数据看板概览', href: '/dashboard/overview' },
  { key: '2', title: '主题列表', href: '/topics/list' },
  { key: '3', title: '创建主题', href: '/topics/create' },
  { key: '4', title: '消费者组', href: '/consumers' },
];
export type Language = 'zh' | 'en';

export interface Translations {
  history: {
    title: string;
    statusFilter: string;
    statusAll: string;
    statusNormal: string;
    statusAbnormal: string;
    noData: string;
    loading: string;
    totalRecords: string;
    recordsPerPage: string;
  };
  overview: {
    title: string;
    totalTopics: string;
    activeConsumers: string;
    messageThroughput: string;
    latencyMetric: string;
    topicActivity: string;
    messages: string;
  };
  thickMapChart: {
    title: string;
    connected: string;
    disconnected: string;
    connecting: string;
    reconnect: string;
    connectionError: string;
    websocketNotConnected: string;
    clickToReconnect: string;
    connectingWebSocket: string;
    waitingForData: string;
    dataPoints: string;
    minThickness: string;
    maxThickness: string;
    avgThickness: string;
    abnormalStatus: string;
    abnormal: string;
    normal: string;
    startTime: string;
    endTime: string;
    lastUpdate: string;
    aiAnalysis: string;
    anomalyDetection: string;
  };
  table: {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
    statusNormal: string;
    statusAbnormal: string;
    image: string;
    noImage: string;
    action: string;
    viewAnalysisResult: string;
    addComment: string;
  };
  modal: {
    previewTitle: string;
    analysisResultTitle: string;
    loading: string;
    commentTitle: string;
    commentPlaceholder: string;
    useRag: string;
    save: string;
    cancel: string;
    saveSuccess: string;
    saveError: string;
  };
  analysisResult: {
    title: string;
    expandAll: string;
    collapseAll: string;
    basicInfo: string;
    id: string;
    thicknessMapUuid: string;
    useRag: string;
    yes: string;
    no: string;
    createdAt: string;
    updatedAt: string;
    detectionAgentResult: string;
    processingAgentResult: string;
    decisionAgentResult: string;
    comment: string;
    noContent: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    history: {
      title: '查看历史诊断数据',
      statusFilter: '状态筛选：',
      statusAll: '全部',
      statusNormal: '正常',
      statusAbnormal: '异常',
      noData: '暂无历史诊断数据',
      loading: '加载中...',
      totalRecords: '共 {total} 条记录',
      recordsPerPage: '条/页',
    },
    overview: {
      title: '数据看板概览',
      totalTopics: '总主题数',
      activeConsumers: '活跃消费者',
      messageThroughput: '消息吞吐量',
      latencyMetric: '延迟指标',
      topicActivity: '主题活跃度',
      messages: '条消息',
    },
    thickMapChart: {
      title: '膜厚云图',
      connected: '已连接',
      disconnected: '未连接',
      connecting: '连接中...',
      reconnect: '重连',
      connectionError: '连接错误',
      websocketNotConnected: 'WebSocket 未连接',
      clickToReconnect: '点击重连按钮重新建立连接',
      connectingWebSocket: '正在连接 WebSocket...',
      waitingForData: '等待数据...',
      dataPoints: '数据点数',
      minThickness: '最小厚度',
      maxThickness: '最大厚度',
      avgThickness: '平均厚度',
      abnormalStatus: '异常状态',
      abnormal: '异常',
      normal: '正常',
      startTime: '开始时间',
      endTime: '结束时间',
      lastUpdate: '最后更新',
      aiAnalysis: 'AI 智能分析',
      anomalyDetection: '异常检测',
    },
    table: {
      id: 'ID',
      startTime: '开始时间',
      endTime: '结束时间',
      status: '状态',
      statusNormal: '正常',
      statusAbnormal: '异常',
      image: '图片',
      noImage: '无图片',
      action: '操作',
      viewAnalysisResult: '查看分析结果',
      addComment: '添加批注',
    },
    modal: {
      previewTitle: '膜厚温度云图预览',
      analysisResultTitle: '分析结果详情',
      loading: '加载中...',
      commentTitle: '添加批注',
      commentPlaceholder: '请输入批注内容...',
      useRag: '是否使用RAG知识库',
      save: '保存',
      cancel: '取消',
      saveSuccess: '批注保存成功',
      saveError: '批注保存失败',
    },
    analysisResult: {
      title: '分析结果详情',
      expandAll: '展开全部',
      collapseAll: '收起',
      basicInfo: '基本信息',
      id: '分析结果ID',
      thicknessMapUuid: '膜厚温度云图UUID',
      useRag: '是否使用RAG知识库',
      yes: '是',
      no: '否',
      createdAt: '创建时间',
      updatedAt: '更新时间',
      detectionAgentResult: '检测 Agent 结果',
      processingAgentResult: '加工 Agent 结果',
      decisionAgentResult: '决策 Agent 结果',
      comment: '批注',
      noContent: '暂无内容',
    },
  },
  en: {
    history: {
      title: 'View Historical Diagnostic Data',
      statusFilter: 'Status Filter:',
      statusAll: 'All',
      statusNormal: 'Normal',
      statusAbnormal: 'Abnormal',
      noData: 'No Historical Diagnostic Data',
      loading: 'Loading...',
      totalRecords: 'Total {total} records',
      recordsPerPage: 'records/page',
    },
    overview: {
      title: 'Dashboard Overview',
      totalTopics: 'Total Topics',
      activeConsumers: 'Active Consumers',
      messageThroughput: 'Message Throughput',
      latencyMetric: 'Latency Metric',
      topicActivity: 'Topic Activity',
      messages: 'messages',
    },
    thickMapChart: {
      title: 'Thickness Map',
      connected: 'Connected',
      disconnected: 'Disconnected',
      connecting: 'Connecting...',
      reconnect: 'Reconnect',
      connectionError: 'Connection Error',
      websocketNotConnected: 'WebSocket Not Connected',
      clickToReconnect: 'Click reconnect button to establish connection',
      connectingWebSocket: 'Connecting to WebSocket...',
      waitingForData: 'Waiting for data...',
      dataPoints: 'Data Points',
      minThickness: 'Min Thickness',
      maxThickness: 'Max Thickness',
      avgThickness: 'Avg Thickness',
      abnormalStatus: 'Abnormal Status',
      abnormal: 'Abnormal',
      normal: 'Normal',
      startTime: 'Start Time',
      endTime: 'End Time',
      lastUpdate: 'Last Update',
      aiAnalysis: 'AI Analysis',
      anomalyDetection: 'Anomaly Detection',
    },
    table: {
      id: 'ID',
      startTime: 'Start Time',
      endTime: 'End Time',
      status: 'Status',
      statusNormal: 'Normal',
      statusAbnormal: 'Abnormal',
      image: 'Image',
      noImage: 'No Image',
      action: 'Action',
      viewAnalysisResult: 'View Analysis Result',
      addComment: 'Add Comment',
    },
    modal: {
      previewTitle: 'Thickness Map Preview',
      analysisResultTitle: 'Analysis Result Details',
      loading: 'Loading...',
      commentTitle: 'Add Comment',
      commentPlaceholder: 'Please enter comment...',
      useRag: 'Use RAG Knowledge Base',
      save: 'Save',
      cancel: 'Cancel',
      saveSuccess: 'Comment saved successfully',
      saveError: 'Failed to save comment',
    },
    analysisResult: {
      title: 'Analysis Result Details',
      expandAll: 'Expand All',
      collapseAll: 'Collapse',
      basicInfo: 'Basic Information',
      id: 'Analysis Result ID',
      thicknessMapUuid: 'Thickness Map UUID',
      useRag: 'Use RAG Knowledge Base',
      yes: 'Yes',
      no: 'No',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      detectionAgentResult: 'Detection Agent Result',
      processingAgentResult: 'Processing Agent Result',
      decisionAgentResult: 'Decision Agent Result',
      comment: 'Comment',
      noContent: 'No Content',
    },
  },
};

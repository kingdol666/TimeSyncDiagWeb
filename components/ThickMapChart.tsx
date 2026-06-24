"use client";

import {
  Card,
  Tag,
  Space,
  Statistic,
  Row,
  Col,
  Alert,
  Spin,
  Button,
  Image,
  Collapse,
} from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  WifiOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { useThicknessMapStore } from "@/store/tk_map_store";
import { useEffect } from "react";
import ImageAnalyzer from "./AgentChat";
import { useLanguage } from "@/contexts/LanguageContext";

const ThickMapChart = () => {
  const { t } = useLanguage();
  const {
    currentMap,
    isConnected,
    isConnecting,
    error,
    lastUpdateTime,
    connect,
    disconnect,
  } = useThicknessMapStore();

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      connect();
    }
  }, [isConnected, isConnecting, connect]);

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "-";
    const date = new Date(timeStr);
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleReconnect = () => {
    disconnect();
    setTimeout(() => {
      connect();
    }, 500);
  };

  return (
    <Card
      title={
        <Space>
          <span className="text-lg font-semibold">{t.thickMapChart.title}</span>
          <Tag
            icon={
              isConnected ? <CheckCircleOutlined /> : <CloseCircleOutlined />
            }
            color={isConnected ? "success" : "error"}
          >
            {isConnected
              ? t.thickMapChart.connected
              : t.thickMapChart.disconnected}
          </Tag>
          {isConnecting && (
            <Tag icon={<WifiOutlined spin />} color="processing">
              {t.thickMapChart.connecting}
            </Tag>
          )}
        </Space>
      }
      extra={
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={handleReconnect}
          disabled={isConnecting}
        >
          {t.thickMapChart.reconnect}
        </Button>
      }
      className="shadow-sm"
    >
      {error && (
        <Alert
          message={t.thickMapChart.connectionError}
          description={error}
          type="error"
          showIcon
          closable
          className="mb-4"
        />
      )}

      {!isConnected && !isConnecting && !error && (
        <Alert
          message={t.thickMapChart.websocketNotConnected}
          description={t.thickMapChart.clickToReconnect}
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      {isConnecting && (
        <div className="flex justify-center items-center py-12">
          <Spin size="large">
            <div className="p-12">{t.thickMapChart.connectingWebSocket}</div>
          </Spin>
        </div>
      )}

      {currentMap ? (
        <div>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={12}>
              <Image
                src={`data:image/png;base64,${currentMap.map_image}`}
                alt="膜厚云图"
                className="w-full h-auto rounded-lg shadow-md"
                style={{ maxHeight: "800px", objectFit: "contain" }}
              />
            </Col>

            <Col span={12}>
              <Image
                src={`data:image/png;base64,${currentMap.map_combined}`}
                alt="膜厚云图"
                className="w-full h-auto rounded-lg shadow-md"
                style={{ maxHeight: "800px", objectFit: "contain" }}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col span={6}>
              <Statistic
                title={t.thickMapChart.dataPoints}
                value={currentMap.data_points_count}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={t.thickMapChart.minThickness}
                value={currentMap.min_thickness}
                suffix="μm"
                precision={2}
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={t.thickMapChart.maxThickness}
                value={currentMap.max_thickness}
                suffix="μm"
                precision={2}
                valueStyle={{ color: "#faad14" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={t.thickMapChart.avgThickness}
                value={currentMap.avg_thickness}
                suffix="μm"
                precision={2}
                valueStyle={{ color: "#722ed1" }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={t.thickMapChart.abnormalStatus}
                value={
                  currentMap.is_abnormal
                    ? t.thickMapChart.abnormal
                    : t.thickMapChart.normal
                }
                valueStyle={{
                  color: currentMap.is_abnormal ? "#ff4d4f" : "#52c41a",
                }}
              />
            </Col>
          </Row>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {t.thickMapChart.startTime}:
                </span>
                <span className="font-medium">
                  {formatTime(currentMap.start_time)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {t.thickMapChart.endTime}:
                </span>
                <span className="font-medium">
                  {formatTime(currentMap.end_time)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {t.thickMapChart.lastUpdate}:
                </span>
                <span className="font-medium">
                  {formatTime(lastUpdateTime || "")}
                </span>
              </div>
            </Space>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <div className="text-center text-gray-400">
            <ClockCircleOutlined
              style={{ fontSize: "48px", marginBottom: "16px" }}
            />
            <p>{t.thickMapChart.waitingForData}</p>
          </div>
        </div>
      )}

      {currentMap?.is_abnormal && (
        <Collapse
          className="mt-4"
          items={[
            {
              key: "1",
              label: (
                <Space>
                  <RobotOutlined />
                  <span>{t.thickMapChart.aiAnalysis}</span>
                  <Tag color="error">{t.thickMapChart.anomalyDetection}</Tag>
                </Space>
              ),
              children: (
                <ImageAnalyzer
                  thicknessMapUuid={currentMap.thickness_map_uuid}
                  autoAnalyze={false}
                  detectImage={`data:image/png;base64,${currentMap.map_image}`}
                  processImage={`data:image/png;base64,${currentMap.map_combined}`}
                />
              ),
            },
          ]}
        />
      )}
    </Card>
  );
};

export default ThickMapChart;

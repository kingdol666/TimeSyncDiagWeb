"use client";

import { useState } from "react";
import {
  Card,
  Descriptions,
  Collapse,
  Tag,
  Typography,
  Space,
  Button,
} from "antd";
import type { CollapseProps } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ExpandOutlined,
  CompressOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import type { ImageAnalysisResultResponse } from "@/request/image_analysis";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./AnalysisResultDetail.module.css";

const { Title, Paragraph, Text } = Typography;

interface AnalysisResultDetailProps {
  analysisResult: ImageAnalysisResultResponse;
}

const AnalysisResultDetail: React.FC<AnalysisResultDetailProps> = ({
  analysisResult,
}) => {
  const { t } = useLanguage();
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"summary" | "full">("summary");

  const handlePanelChange = (keys: string | string[]) => {
    setExpandedPanels(Array.isArray(keys) ? keys : [keys]);
  };

  const toggleViewMode = () => {
    if (viewMode === "summary") {
      setExpandedPanels(["detection", "processing", "decision", "comment"]);
      setViewMode("full");
    } else {
      setExpandedPanels([]);
      setViewMode("summary");
    }
  };

  const renderMarkdown = (content: string | null) => {
    if (!content)
      return <Text type="secondary">{t.analysisResult.noContent}</Text>;

    return (
      <div className={styles["markdown-content"]}>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <Title level={3} style={{ marginTop: 16 }}>
                {children}
              </Title>
            ),
            h2: ({ children }) => (
              <Title level={4} style={{ marginTop: 12 }}>
                {children}
              </Title>
            ),
            h3: ({ children }) => (
              <Title level={5} style={{ marginTop: 8 }}>
                {children}
              </Title>
            ),
            p: ({ children }) => (
              <Paragraph style={{ marginBottom: 8 }}>{children}</Paragraph>
            ),
            ul: ({ children }) => (
              <ul style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: 4 }}>{children}</li>
            ),
            code: ({ children }) => (
              <code
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontSize: "0.9em",
                }}
              >
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: 12,
                  borderRadius: 4,
                  overflow: "auto",
                  marginBottom: 8,
                }}
              >
                {children}
              </pre>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            blockquote: ({ children }) => (
              <blockquote
                style={{
                  borderLeft: "4px solid #d9d9d9",
                  paddingLeft: 16,
                  margin: "8px 0",
                  color: "#666",
                }}
              >
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  const renderSummaryPanel = () => (
    <Card
      title={
        <Space>
          <InfoCircleOutlined />
          <span>{t.analysisResult.basicInfo}</span>
        </Space>
      }
      size="small"
      style={{ marginBottom: 16 }}
    >
      <Descriptions column={2} size="small" bordered>
        <Descriptions.Item label={t.analysisResult.id} span={2}>
          {analysisResult.id}
        </Descriptions.Item>
        <Descriptions.Item label={t.analysisResult.thicknessMapUuid} span={2}>
          <Text code copyable>
            {analysisResult.thickness_map_uuid}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label={t.analysisResult.useRag}>
          {analysisResult.use_rag ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {t.analysisResult.yes}
            </Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="default">
              {t.analysisResult.no}
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={t.analysisResult.createdAt}>
          {analysisResult.created_at || "-"}
        </Descriptions.Item>
        <Descriptions.Item label={t.analysisResult.updatedAt} span={2}>
          {analysisResult.updated_at || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );

  const renderAgentResults = () => {
    const items: CollapseProps["items"] = [
      {
        key: "detection",
        label: (
          <Space>
            <InfoCircleOutlined />
            <span>{t.analysisResult.detectionAgentResult}</span>
          </Space>
        ),
        children: renderMarkdown(analysisResult.detection_agent_result),
      },
      {
        key: "processing",
        label: (
          <Space>
            <InfoCircleOutlined />
            <span>{t.analysisResult.processingAgentResult}</span>
          </Space>
        ),
        children: renderMarkdown(analysisResult.processing_agent_result),
      },
      {
        key: "decision",
        label: (
          <Space>
            <InfoCircleOutlined />
            <span>{t.analysisResult.decisionAgentResult}</span>
          </Space>
        ),
        children: renderMarkdown(analysisResult.decision_agent_result),
      },
      {
        key: "comment",
        label: (
          <Space>
            <InfoCircleOutlined />
            <span>{t.analysisResult.comment}</span>
          </Space>
        ),
        children: renderMarkdown(analysisResult.comment),
      },
    ];

    return (
      <Collapse
        activeKey={expandedPanels}
        onChange={handlePanelChange}
        expandIconPosition="end"
        items={items}
        style={{ marginBottom: 16 }}
      />
    );
  };

  return (
    <div className="analysis-result-detail">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          分析结果详情
        </Title>
        <Button
          type="text"
          icon={
            viewMode === "summary" ? <ExpandOutlined /> : <CompressOutlined />
          }
          onClick={toggleViewMode}
        >
          {viewMode === "summary" ? "展开全部" : "收起"}
        </Button>
      </div>

      {renderSummaryPanel()}
      {renderAgentResults()}
    </div>
  );
};

export default AnalysisResultDetail;

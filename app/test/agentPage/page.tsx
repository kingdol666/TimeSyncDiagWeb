"use client";

import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, RobotOutlined } from "@ant-design/icons";
import ImageAnalyzer from "../../../components/AgentChat";

const { Title, Paragraph } = Typography;

export default function AgentPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
              style={{ marginBottom: "16px" }}
            >
              返回
            </Button>
            <Title level={2}>
              <RobotOutlined style={{ marginRight: "8px" }} />
              Qwen-VL 图片分析 Agent
            </Title>
          </div>

          <Card type="inner" title="功能介绍">
            <Paragraph>
              这是一个基于 Qwen-VL 的智能图片分析
              Agent，可以上传两张图片进行分析：
            </Paragraph>
            <ul>
              <li>检测图片：用于识别和检测图片中的目标对象</li>
              <li>处理图片：用于分析和处理图片的细节内容</li>
              <li>Agent 会实时展示分析过程和最终结果</li>
            </ul>
          </Card>

          <Card type="inner" title="Agent 聊天界面">
            <ImageAnalyzer />
          </Card>
        </Space>
      </Card>
    </div>
  );
}

import React, { useEffect } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
  Steps,
  Divider,
  Alert,
  Modal,
} from "antd";
import { RobotOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { useAgentDataStore } from "@/store/agent_data";
import { useThicknessMapStore } from "@/store/tk_map_store";
import { qwenVLAPI } from "@/request/qwen_vl";

const { Title, Text, Paragraph } = Typography;

interface ImageAnalyzerProps {
  thicknessMapUuid?: string;
  autoAnalyze?: boolean;
  detectImage?: string;
  processImage?: string;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  thicknessMapUuid,
  autoAnalyze = false,
  detectImage,
  processImage,
}) => {
  const { disconnect, connect, setAutoReconnect } = useThicknessMapStore();
  const {
    loading,
    streamLog,
    currentStep,
    currentNode,
    finalResult,
    modalVisible,
    modalContent,
    setLoading,
    appendStreamLog,
    setCurrentStep,
    setCurrentNode,
    setFinalResult,
    setModalVisible,
    setModalContent,
    resetAnalysis,
  } = useAgentDataStore();

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    if (autoAnalyze && detectImage && processImage && thicknessMapUuid) {
      const detectFile = base64ToFile(detectImage, "detect.png");
      const processFile = base64ToFile(processImage, "process.png");

      setTimeout(() => {
        handleAnalyze(detectFile, processFile, thicknessMapUuid);
      }, 500);
    }
  }, [autoAnalyze, detectImage, processImage, thicknessMapUuid]);

  const handleAnalyze = async (
    detectFileParam: File,
    processFileParam: File,
    thicknessMapUuid: string
  ) => {
    if (!detectFileParam || !processFileParam) {
      message.warning("图片数据缺失！");
      return;
    }

    setLoading(true);
    resetAnalysis();
    setCurrentNode("初始化...");

    try {
      await qwenVLAPI.analyzeImage(
        {
          imageDetect: detectFileParam,
          imageProcess: processFileParam,
          thickness_map_uuid: thicknessMapUuid,
        },
        {
          onNodeStart: (node) => {
            setCurrentNode(node);
            if (node?.includes("detect")) setCurrentStep(1);
            else if (node?.includes("process")) setCurrentStep(2);
            else if (node?.includes("final") || node?.includes("summary"))
              setCurrentStep(3);
          },
          onStreamContent: (content) => {
            appendStreamLog(content);
          },
          onWorkflowComplete: (result) => {
            setCurrentStep(4);
            setFinalResult(result ?? null);
            message.success("分析完成！");
          },
          onWorkflowTerminated: (msg) => {
            message.warning(msg);
          },
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("分析请求失败，请检查网络或后端服务。");
      appendStreamLog("\n\n**[系统错误]: 请求中断**");
    } finally {
      setLoading(false);
      setCurrentNode("");
      setAutoReconnect(true);
      connect();
    }
  };

  const showFullContent = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        title={
          <>
            <RobotOutlined /> Qwen-VL 图片分析 Agent
          </>
        }
        variant="borderless"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        {(loading || streamLog || finalResult) && (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6}>
              <Steps
                direction="vertical"
                current={currentStep}
                items={[
                  { title: "准备就绪", description: "上传图片" },
                  { title: "检测分析", description: "Agent 正在检测目标" },
                  { title: "处理分析", description: "Agent 正在分析细节" },
                  { title: "整合结果", description: "生成最终报告" },
                  { title: "完成", description: "任务结束" },
                ]}
              />
              {loading && (
                <Alert
                  message="正在运行"
                  description={`当前节点: ${currentNode}`}
                  type="info"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
            </Col>

            <Col xs={24} md={18}>
              <Card
                title="Agent 实时思考与回答"
                variant="outlined"
                style={{ backgroundColor: "#f9f9f9" }}
                styles={{
                  body: {
                    minHeight: "300px",
                    maxHeight: "600px",
                    overflowY: "auto",
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                  },
                }}
              >
                {streamLog ? (
                  <ReactMarkdown>{streamLog}</ReactMarkdown>
                ) : (
                  <Text type="secondary">等待输出...</Text>
                )}
              </Card>

              {finalResult && (
                <Card
                  title="最终整合报告"
                  style={{ marginTop: 16, borderColor: "#52c41a" }}
                  styles={{ header: { backgroundColor: "#f6ffed" } }}
                >
                  <Paragraph>
                    <Text strong>检测结果摘要：</Text>{" "}
                    {finalResult.detect_result.substring(0, 100)}...
                    <Button
                      type="link"
                      size="small"
                      onClick={() =>
                        showFullContent(
                          "完整检测结果",
                          finalResult.detect_result
                        )
                      }
                    >
                      查看完整内容
                    </Button>
                  </Paragraph>
                  <Paragraph>
                    <Text strong>处理结果摘要：</Text>{" "}
                    {finalResult.process_result.substring(0, 100)}...
                    <Button
                      type="link"
                      size="small"
                      onClick={() =>
                        showFullContent(
                          "完整处理结果",
                          finalResult.process_result
                        )
                      }
                    >
                      查看完整内容
                    </Button>
                  </Paragraph>
                  <Divider />
                  <Paragraph>
                    <Text strong>综合结论：</Text>
                    <ReactMarkdown>{finalResult.final_result}</ReactMarkdown>
                  </Paragraph>
                </Card>
              )}
            </Col>
          </Row>
        )}
      </Card>

      <Modal
        title={modalContent.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <ReactMarkdown>{modalContent.content}</ReactMarkdown>
        </div>
      </Modal>
    </div>
  );
};

export default ImageAnalyzer;

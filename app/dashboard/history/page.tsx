"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  Table,
  Tag,
  Image,
  Pagination,
  Spin,
  message,
  Empty,
  Modal,
  Button,
  Descriptions,
  Select,
  Space,
  Input,
  Checkbox,
} from "antd";
import {
  imageAnalysisAPI,
  type ImageAnalysisWithImagesListResponse,
  type ThicknessMapImageResponse,
  type ImageAnalysisResultResponse,
} from "@/request/image_analysis";
import AnalysisResultDetail from "./components/AnalysisResultDetail";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlobalOutlined } from "@ant-design/icons";

const HistoryDiagnostics = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [data, setData] = useState<ImageAnalysisWithImagesListResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsWithImages, setItemsWithImages] = useState<
    (ThicknessMapImageResponse & { combined_image_base64?: string })[]
  >([]);
  const [analysisResult, setAnalysisResult] =
    useState<ImageAnalysisResultResponse | null>(null);
  const [analysisResultLoading, setAnalysisResultLoading] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentUuid, setCommentUuid] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [useRag, setUseRag] = useState(false);
  const [commentSaving, setCommentSaving] = useState(false);

  const fetchData = useCallback(
    async (page: number, size: number, isAbnormal?: boolean) => {
      setLoading(true);
      try {
        const result = await imageAnalysisAPI.getAnalysisResultsPaginated({
          page,
          page_size: size,
          is_abnormal: isAbnormal,
        });
        setData(result);

        const itemsWithImageData = await Promise.all(
          result.items.map(async (item) => {
            try {
              const fullImage = await imageAnalysisAPI.getFullImage(
                item.thickness_map_uuid
              );
              return {
                ...item,
                combined_image_base64: fullImage.combined_image_base64,
              };
            } catch (error) {
              console.error(
                `获取UUID ${item.thickness_map_uuid} 的图片失败:`,
                error
              );
              return {
                ...item,
                combined_image_base64: undefined,
              };
            }
          })
        );

        setItemsWithImages(
          itemsWithImageData.map((item) => ({
            ...item,
            combined_image_base64: item.combined_image_base64 ?? undefined,
          }))
        );
      } catch (error) {
        message.error(t.history.noData);
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(currentPage, pageSize, statusFilter);
  }, [currentPage, pageSize, statusFilter, fetchData]);

  const handlePageChange = useCallback((page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value === "all" ? undefined : value === "abnormal");
    setCurrentPage(1);
  }, []);

  const getStatusValue = useCallback(() => {
    if (statusFilter === undefined) return "all";
    return statusFilter ? "abnormal" : "normal";
  }, [statusFilter]);

  const handleImageClick = useCallback(
    (thicknessMapUuid: string) => {
      const item = itemsWithImages.find(
        (i) => i.thickness_map_uuid === thicknessMapUuid
      );

      if (item && item.combined_image_base64) {
        setPreviewImage(`data:image/png;base64,${item.combined_image_base64}`);
        setIsModalOpen(true);
      } else {
        message.error("图片数据不可用");
      }
    },
    [itemsWithImages]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setPreviewImage(null);
  }, []);

  const handleViewAnalysisResult = useCallback(
    async (thicknessMapUuid: string) => {
      setAnalysisResultLoading(true);
      setIsAnalysisModalOpen(true);
      try {
        const result = await imageAnalysisAPI.getAnalysisResult(
          thicknessMapUuid
        );
        setAnalysisResult(result);
      } catch (error) {
        message.error("获取分析结果失败");
        console.error(error);
        setAnalysisResult(null);
      } finally {
        setAnalysisResultLoading(false);
      }
    },
    []
  );

  const handleAnalysisModalClose = useCallback(() => {
    setIsAnalysisModalOpen(false);
    setAnalysisResult(null);
  }, []);

  const handleOpenCommentModal = useCallback((thicknessMapUuid: string) => {
    setCommentUuid(thicknessMapUuid);
    setCommentText("");
    setUseRag(false);
    setIsCommentModalOpen(true);
  }, []);

  const handleCloseCommentModal = useCallback(() => {
    setIsCommentModalOpen(false);
    setCommentUuid(null);
    setCommentText("");
    setUseRag(false);
  }, []);

  const handleSaveComment = useCallback(async () => {
    if (!commentUuid) {
      message.error("UUID不可用");
      return;
    }

    if (!commentText.trim()) {
      message.error("请输入批注内容");
      return;
    }

    setCommentSaving(true);
    try {
      await imageAnalysisAPI.updateComment({
        thickness_map_uuid: commentUuid,
        comment: commentText,
        use_rag: useRag,
      });
      message.success(t.modal.saveSuccess);
      handleCloseCommentModal();
    } catch (error) {
      message.error(t.modal.saveError);
      console.error(error);
    } finally {
      setCommentSaving(false);
    }
  }, [commentUuid, commentText, useRag]);

  const columns = useMemo(
    () => [
      {
        title: t.table.id,
        dataIndex: "thickness_map_uuid",
        key: "thickness_map_uuid",
        width: 100,
      },
      {
        title: t.table.startTime,
        dataIndex: "start_time",
        key: "start_time",
        width: 180,
        render: (time: string | null) => time || "-",
      },
      {
        title: t.table.endTime,
        dataIndex: "end_time",
        key: "end_time",
        width: 180,
        render: (time: string | null) => time || "-",
      },
      {
        title: t.table.status,
        dataIndex: "is_abnormal",
        key: "is_abnormal",
        width: 100,
        render: (isAbnormal: boolean) => (
          <Tag color={isAbnormal ? "red" : "green"}>
            {isAbnormal ? t.table.statusAbnormal : t.table.statusNormal}
          </Tag>
        ),
      },
      {
        title: t.table.image,
        key: "image",
        width: 150,
        render: (
          _: string,
          record: ThicknessMapImageResponse & { combined_image_base64?: string }
        ) =>
          record.combined_image_base64 ? (
            <img
              src={`data:image/png;base64,${record.combined_image_base64}`}
              alt="膜厚温度云图"
              width={100}
              height={60}
              style={{
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(record.thickness_map_uuid)}
              loading="lazy"
            />
          ) : (
            <span style={{ color: "#999" }}>{t.table.noImage}</span>
          ),
      },
      {
        title: t.table.action,
        key: "action",
        width: 120,
        render: (_: string, record: ThicknessMapImageResponse) => (
          <Button
            type="link"
            onClick={() => handleViewAnalysisResult(record.thickness_map_uuid)}
          >
            {t.table.viewAnalysisResult}
          </Button>
        ),
      },
      {
        title: t.table.addComment,
        key: "add_comment",
        width: 120,
        render: (_: string, record: ThicknessMapImageResponse) => (
          <Button
            type="link"
            onClick={() => handleOpenCommentModal(record.thickness_map_uuid)}
          >
            {t.table.addComment}
          </Button>
        ),
      },
    ],
    [handleImageClick, t, handleOpenCommentModal]
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t.history.title}</h1>
        <Button
          type="default"
          icon={<GlobalOutlined />}
          onClick={toggleLanguage}
        >
          {language === "zh" ? "English" : "中文"}
        </Button>
      </div>

      <Card>
        <Space className="mb-4" style={{ marginBottom: 16 }}>
          <span>{t.history.statusFilter}：</span>
          <Select
            value={getStatusValue()}
            style={{ width: 120 }}
            onChange={handleStatusChange}
            options={[
              { value: "all", label: t.history.statusAll },
              { value: "normal", label: t.history.statusNormal },
              { value: "abnormal", label: t.history.statusAbnormal },
            ]}
          />
        </Space>

        <Spin spinning={loading}>
          {data && data.items.length > 0 ? (
            <>
              <Table
                dataSource={itemsWithImages}
                columns={columns}
                rowKey="thickness_map_id"
                pagination={false}
                scroll={{ x: 800 }}
              />

              <div className="mt-4 flex justify-end">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={data.total}
                  onChange={handlePageChange}
                  showSizeChanger
                  showTotal={(total) => `${t.history.totalRecords} ${total}`}
                  pageSizeOptions={["10", "20", "50", "100"]}
                />
              </div>
            </>
          ) : (
            <Empty description={t.history.noData} />
          )}
        </Spin>
      </Card>

      <Modal
        open={isModalOpen}
        title={t.modal.previewTitle}
        footer={null}
        onCancel={handleModalClose}
        width="95%"
        style={{ maxWidth: 1800 }}
        centered
        styles={{ body: { maxHeight: "90vh", overflow: "auto", padding: 0 } }}
      >
        <Spin spinning={previewLoading}>
          {previewImage ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 400,
              }}
            >
              <img
                src={previewImage}
                alt="膜厚温度云图"
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "50px" }}>
              {t.modal.loading}
            </div>
          )}
        </Spin>
      </Modal>

      <Modal
        open={isAnalysisModalOpen}
        title={t.modal.analysisResultTitle}
        footer={null}
        onCancel={handleAnalysisModalClose}
        width={900}
        centered
        styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      >
        <Spin spinning={analysisResultLoading}>
          {analysisResult ? (
            <AnalysisResultDetail analysisResult={analysisResult} />
          ) : (
            <div style={{ textAlign: "center", padding: "50px" }}>
              {t.modal.loading}
            </div>
          )}
        </Spin>
      </Modal>

      <Modal
        open={isCommentModalOpen}
        title={t.modal.commentTitle}
        onOk={handleSaveComment}
        onCancel={handleCloseCommentModal}
        confirmLoading={commentSaving}
        width={600}
        centered
      >
        <div style={{ marginBottom: 16 }}>
          <Input.TextArea
            rows={6}
            placeholder={t.modal.commentPlaceholder}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={1000}
            showCount
          />
        </div>
        <Checkbox
          checked={useRag}
          onChange={(e) => setUseRag(e.target.checked)}
        >
          {t.modal.useRag}
        </Checkbox>
      </Modal>
    </div>
  );
};

export default HistoryDiagnostics;

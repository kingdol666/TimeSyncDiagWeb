"use client";

import React, { useState, useRef } from "react";
import { Card, Input, Button, Space, Tag, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface TextItem {
  id: string;
  text: string;
  containerId: string;
}

interface DragTextContainerProps {
  containerId: string;
  title: string;
  items: TextItem[];
  onItemsChange: (items: TextItem[]) => void;
  onDragStart: (item: TextItem) => void;
  onDrop: (item: TextItem, targetContainerId: string) => void;
}

const DragTextContainer: React.FC<DragTextContainerProps> = ({
  containerId,
  title,
  items,
  onItemsChange,
  onDragStart,
  onDrop,
}) => {
  const [inputText, setInputText] = useState("");
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleAddText = () => {
    if (!inputText.trim()) {
      message.warning("请输入文字内容");
      return;
    }

    const newItem: TextItem = {
      id: `text-${Date.now()}-${Math.random()}`,
      text: inputText.trim(),
      containerId: containerId,
    };

    onItemsChange([...items, newItem]);
    setInputText("");
    message.success("文字已添加到容器中");
  };

  const handleDeleteText = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    onItemsChange(updatedItems);
    message.success("文字已删除");
  };

  const handleDragStart = (e: React.DragEvent, item: TextItem) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
    onDragStart(item);
    // 添加拖拽时的视觉反馈
    (e.currentTarget as HTMLElement).style.opacity = "0.5";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dropZoneRef.current) {
      dropZoneRef.current.style.backgroundColor = "#f0f8ff";
      dropZoneRef.current.style.borderColor = "#1890ff";
    }
    // 为拖拽目标添加视觉反馈
    const target = e.currentTarget as HTMLElement;
    if (target && target.getAttribute("data-item-id")) {
      target.style.borderColor = "#1890ff";
      target.style.borderWidth = "2px";
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.style.backgroundColor = "";
      dropZoneRef.current.style.borderColor = "";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // 拖拽结束时恢复透明度
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.backgroundColor = "";
      dropZoneRef.current.style.borderColor = "";
    }

    // 重置拖拽目标的样式
    const target = e.currentTarget as HTMLElement;
    if (target && target.getAttribute("data-item-id")) {
      target.style.borderColor = "#d9d9d9";
      target.style.borderWidth = "1px";
    }

    try {
      const draggedData = e.dataTransfer.getData("text/plain");
      const draggedItem: TextItem = JSON.parse(draggedData);

      if (draggedItem.containerId !== containerId) {
        // 从不同容器移动
        onDrop(draggedItem, containerId);
        message.success(`文字已移动到 ${title}`);
      } else {
        // 同一容器内重新排序
        const targetId = e.currentTarget.getAttribute("data-item-id");
        if (targetId && targetId !== draggedItem.id) {
          // 获取当前容器内的所有项目
          const containerItems = items;
          const draggedIndex = containerItems.findIndex(
            (item) => item.id === draggedItem.id
          );
          const targetIndex = containerItems.findIndex(
            (item) => item.id === targetId
          );

          if (draggedIndex !== -1 && targetIndex !== -1) {
            // 重新排序
            const newItems = [...containerItems];
            const [removed] = newItems.splice(draggedIndex, 1);
            newItems.splice(targetIndex, 0, removed);
            onItemsChange(newItems);
            message.success("文字顺序已调整");
          }
        }
      }
    } catch (error) {
      message.error("拖拽操作失败");
    }
  };

  return (
    <Card
      title={title}
      style={{
        minHeight: "300px",
        border: "2px dashed #d9d9d9",
        transition: "all 0.3s ease",
      }}
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <div style={{ display: "flex", gap: "8px" }}>
          <Input
            placeholder="输入要添加的文字"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onPressEnter={handleAddText}
            style={{ flex: 1 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddText}
          >
            添加
          </Button>
        </div>

        <div
          style={{
            minHeight: "200px",
            padding: "16px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            border: "1px solid #f0f0f0",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#999",
                padding: "40px 0",
                fontSize: "14px",
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              容器为空，可以添加文字或拖拽文字到此处
            </div>
          ) : (
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-item-id={item.id}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#fff",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                    cursor: "move",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ flex: 1, fontSize: "14px" }}>{item.text}</span>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={() => handleDeleteText(item.id)}
                  />
                </div>
              ))}
            </Space>
          )}
        </div>
      </Space>
    </Card>
  );
};

export default DragTextContainer;

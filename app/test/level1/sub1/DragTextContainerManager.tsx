"use client";

import React, { useState } from "react";
import { Card, Typography, Row, Col, Divider } from "antd";
import DragTextContainer from "./DragTextContainer";

const { Title, Paragraph } = Typography;

interface TextItem {
  id: string;
  text: string;
  containerId: string;
}

const DragTextContainerManager: React.FC = () => {
  const [allItems, setAllItems] = useState<TextItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<TextItem | null>(null);

  const containers = [
    { id: "container1", title: "容器 A" },
    { id: "container2", title: "容器 B" },
    { id: "container3", title: "容器 C" },
  ];

  const getItemsByContainer = (containerId: string) => {
    return allItems.filter((item) => item.containerId === containerId);
  };

  const handleItemsChange = (containerId: string, items: TextItem[]) => {
    // 更新该容器的项目，同时保留其他容器的项目
    const otherItems = allItems.filter(
      (item) => item.containerId !== containerId
    );
    setAllItems([...otherItems, ...items]);
  };

  const handleDragStart = (item: TextItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (draggedItem: TextItem, targetContainerId: string) => {
    // 更新拖拽项目的容器ID
    const updatedItems = allItems.map((item) =>
      item.id === draggedItem.id
        ? { ...item, containerId: targetContainerId }
        : item
    );
    setAllItems(updatedItems);
    setDraggedItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setAllItems(allItems.filter((item) => item.id !== itemId));
  };

  const totalItems = allItems.length;

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={3} style={{ marginBottom: "16px" }}>
          拖拽文字容器管理器
        </Title>
        <Paragraph type="secondary">
          在下方输入框中添加文字，然后拖拽文字在不同容器之间移动。支持多容器管理和实时拖拽操作。
        </Paragraph>

        <Divider />

        <div style={{ marginBottom: "24px" }}>
          <Paragraph>
            总文字数量: <strong>{totalItems}</strong> 个
          </Paragraph>
          <Paragraph>
            容器数量: <strong>{containers.length}</strong> 个
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {containers.map((container) => (
            <Col xs={24} sm={24} md={12} lg={8} key={container.id}>
              <DragTextContainer
                containerId={container.id}
                title={container.title}
                items={getItemsByContainer(container.id)}
                onItemsChange={(items) =>
                  handleItemsChange(container.id, items)
                }
                onDragStart={handleDragStart}
                onDrop={handleDrop}
              />
            </Col>
          ))}
        </Row>

        <Divider />

        <Card type="inner" title="使用说明">
          <Paragraph>
            <strong>操作步骤：</strong>
          </Paragraph>
          <Paragraph>
            1. 在任意容器的输入框中输入文字，点击&quot;添加&quot;按钮
          </Paragraph>
          <Paragraph>
            2. 拖拽容器中的文字项目到其他容器中（跨容器移动）
          </Paragraph>
          <Paragraph>
            3. 在同一容器内拖拽文字项目到其他文字上方进行排序（容器内排序）
          </Paragraph>
          <Paragraph>
            4. 点击删除按钮可以移除不需要的文字项目
          </Paragraph>
          <Paragraph>
            5. 支持同时管理多个容器，实时查看文字分布情况
          </Paragraph>
          <Divider />
          <Paragraph type="secondary">
            💡 提示：拖拽时会有视觉反馈，拖拽中的项目会变透明，目标位置会高亮显示
          </Paragraph>
        </Card>
      </Card>
    </div>
  );
};

export default DragTextContainerManager;

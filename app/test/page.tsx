"use client";

import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function TestHomePage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(`/test/${path}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2}>测试菜单主页</Title>
        <Paragraph>
          欢迎来到测试菜单区域！这里包含了多级菜单结构的测试页面。
        </Paragraph>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Card type="inner" title="二级菜单" size="small">
            <Space>
              <Button onClick={() => handleNavigation("level2/sub1")}>
                测试页面A
              </Button>
              <Button onClick={() => handleNavigation("level2/sub2")}>
                测试页面B
              </Button>
              <Button onClick={() => handleNavigation("level2/nested/deep1")}>
                深层页面1
              </Button>
              <Button onClick={() => handleNavigation("level2/nested/deep2")}>
                深层页面2
              </Button>
            </Space>
          </Card>

          <Card type="inner" title="其他测试" size="small">
            <Button onClick={() => handleNavigation("agentPage")}>
              Qwen-VL图片分析
            </Button>
          </Card>
        </Space>
      </Card>
    </div>
  );
}

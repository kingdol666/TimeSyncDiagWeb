"use client";

import "@ant-design/v5-patch-for-react-19";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu, Breadcrumb, Button, Avatar } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { menuConfig, quickLinksConfig, MenuConfigItem } from "@/constants/menu";
import { initializeThicknessMapWebSocket } from "@/store/tk_map_store";
import { LanguageProvider } from "@/contexts/LanguageContext";

const { Header, Sider, Content } = Layout;

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    initializeThicknessMapWebSocket();
  }, []);

  // 递归函数来处理多级嵌套菜单
  const convertMenuItems = (items: MenuConfigItem[]): MenuProps["items"] => {
    return items.map((item) => {
      const menuItem: any = {
        key: item.key,
        icon: <UserOutlined />,
        label: item.label,
      };

      // 如果有子菜单，递归处理
      if (item.children && item.children.length > 0) {
        menuItem.children = convertMenuItems(item.children);
      }

      return menuItem;
    });
  };

  // 将配置转换为Antd Menu需要的格式
  const menuItems: MenuProps["items"] = convertMenuItems(menuConfig);

  // 快速链接配置
  const quickLinks = quickLinksConfig.map((link) => ({
    ...link,
    icon: <UserOutlined />,
  }));
  const pathname = usePathname();
  const router = useRouter();

  // 递归函数来查找菜单项的标签
  const findMenuLabel = (
    items: MenuConfigItem[],
    key: string
  ): string | null => {
    for (const item of items) {
      if (item.key === key) {
        return item.label;
      }
      if (item.children) {
        const found = findMenuLabel(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  // 处理面包屑路径
  const getBreadcrumbItems = () => {
    const parts = pathname.split("/").filter(Boolean);
    const items = [{ title: "首页", href: "/" }];

    let currentPath = "";
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      const fullKey = parts.slice(0, index + 1).join("/");
      const label = findMenuLabel(menuConfig, fullKey);
      items.push({
        title: label || part,
        href: currentPath,
      });
    });

    return items;
  };

  // 处理菜单选中状态
  const getSelectedKeys = () => {
    // 支持多级嵌套路径的选中状态
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return [];

    // 返回完整的选中路径，例如 "test/level2/nested/deep1"
    return [parts.join("/")];
  };

  // 处理菜单点击事件
  const handleMenuClick = ({ key }: { key: string }) => {
    // 确保使用绝对路径，以 '/' 开头
    const fullPath = key.startsWith("/") ? key : `/${key}`;
    router.push(fullPath);
  };

  return (
    <AntdRegistry>
      <LanguageProvider>
        <html lang="zh-CN">
          <body className="body-reset">
            <Layout style={{ minHeight: "100vh" }}>
              <Header className="flex items-center justify-between px-4 bg-white shadow-md">
                <div className="flex items-center gap-4">
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    className="mr-2"
                  />
                  <h1 className="text-xl font-bold text-gray-800">
                    TimeSyncDiag
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar icon={<UserOutlined />} />
                </div>
              </Header>
              <Layout>
                <Sider
                  width={250}
                  theme="light"
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                  style={{ backgroundColor: "#fafafa" }}
                >
                  <div className="px-4 py-6">
                    <Menu
                      mode="inline"
                      selectedKeys={getSelectedKeys()}
                      items={menuItems}
                      style={{ height: "100%", borderRight: 0 }}
                      onClick={handleMenuClick}
                    />
                  </div>
                </Sider>
                <Layout className="p-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <Breadcrumb items={getBreadcrumbItems()} />
                  </div>
                  <Content className="bg-white rounded-lg shadow-sm p-6">
                    {children}
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </body>
        </html>
      </LanguageProvider>
    </AntdRegistry>
  );
}

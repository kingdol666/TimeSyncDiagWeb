import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "TimeSyncDiag - 时序对齐图像诊断系统",
  description: "膜厚时序数据采集、热力图云图生成、QwenVL 多模态 AI 视觉诊断",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}

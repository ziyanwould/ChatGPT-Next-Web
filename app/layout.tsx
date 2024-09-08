/*
 * @Author: liujiarong godisljr@163.com
 * @Date: 2024-01-07 17:55:59
 * @LastEditors: Liu Jiarong
 * @LastEditTime: 2024-04-22 22:55:30
 * @FilePath: /ChatGPT-Next-Web/app/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSideConfig } from "./config/server";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
const serverConfig = getServerSideConfig();

export const metadata: Metadata = {
  title: "NextChat",
  description: "Your personal ChatGPT Chat Bot.",
  appleWebApp: {
    title: "NextChat",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
        <script
          async
          src="https://umami.liujiarong.top/script.js"
          data-website-id="ddb42937-a358-488d-bf87-39c31aacfc10"
        ></script>
        <script
          defer
          data-domain="liujiarong.top"
          src="https://analytics.liujiarong.top/js/script.js"
        ></script>
      </head>
      <body>
        {children}
        {serverConfig?.isVercel && (
          <>
            <SpeedInsights />
          </>
        )}
        {serverConfig?.gtmId && (
          <>
            <GoogleTagManager gtmId={serverConfig.gtmId} />
          </>
        )}
        {serverConfig?.gaId && (
          <>
            <GoogleAnalytics gaId={serverConfig.gaId} />
          </>
        )}
      </body>
    </html>
  );
}

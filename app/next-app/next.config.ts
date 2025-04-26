import { NextConfig } from "next";
import withPWA, { runtimeCaching } from "@ducanh2912/next-pwa";
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  sassOptions: {
    // includePaths: [
    //   path.join(process.cwd(), 'app/next-app/styles'),
    //   path.join(process.cwd(), 'app/next-app/styles/*.scss'),
    //   path.join(process.cwd(), 'app/next-app/styles/**/*.scss')
    // ],
    sourceMap: true,
    outputStyle: 'expanded',
    watch: true,
  },
  reactStrictMode: true,
  // swcMinify: true
};

export default nextConfig;

// const pwaConfig = {
//   dest: "public", // PWAファイルの出力先
//   disable: process.env.NODE_ENV === "development", // 開発環境ではPWAを無効化
//   register: true, // Service Workerの自動登録
//   skipWaiting: true, // 新しいService Workerの即時アクティベーション
//   runtimeCaching, // 事前定義されたキャッシュ戦略を使用
//   buildExcludes: [/middleware-manifest.json$/], // App Routerを使用する場合に必要
//   sw: "service-worker.js"
// };

// const config = withPWA({
//   ...nextConfig,
//   ...pwaConfig,
// }) as NextConfig;

// export default config;

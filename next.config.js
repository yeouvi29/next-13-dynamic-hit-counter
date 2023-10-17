const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

module.exports = withBundleAnalyzer(
  withImages(
    withCSS({
      // 여기에 기존의 Next.js 설정을 추가합니다.

      webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, webpack }
      ) => {
        // JSON 파일을 포함시키기 위한 설정
        config.module.rules.push({
          test: /\.json$/,
          type: "javascript/auto",
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/chunks/[hash].[ext]",
              },
            },
          ],
        });

        return config;
      },
    })
  )
);

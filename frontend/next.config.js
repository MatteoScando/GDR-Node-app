const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|avi)$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;

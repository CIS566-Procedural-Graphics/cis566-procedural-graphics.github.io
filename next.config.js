const path = require('path');

const BASE_PATH = process.env.BASE_PATH || '';

module.exports = {
  trailingSlash: true,
  target: 'serverless',
  basePath: BASE_PATH,
  compress: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webm)$/i,
      use: {
        loader: 'file-loader',
        options: {
          esModule: false,
          publicPath: path.join('/', BASE_PATH, '_next/static'),
          outputPath: 'static',
        },
      },
    });

    return config;
  },
}

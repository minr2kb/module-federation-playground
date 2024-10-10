// apps/remote-next/next.config.mjs
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote-next',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './App': './App.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

export default nextConfig;

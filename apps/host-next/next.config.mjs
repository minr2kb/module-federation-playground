/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  //   compiler: {
  //     emotion: true,
  //   },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  webpack(config, { isServer }) {
    //   config.plugins.push(
    //     new NextFederationPlugin({
    //       name: 'host-next',
    //       filename: 'static/chunks/remoteEntry.js',
    //       remotes: {
    //         'remote-weather':
    //           'remote-weather@http://localhost:3001/remoteEntry.js',
    //       },
    //       shared: {
    //         react: {
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //         'react-dom': {
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //         '@chakra-ui/react': {
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //         '@tanstack/react-query': {
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //         '@emotion/react': {
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //       },
    //     })
    //   );
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;

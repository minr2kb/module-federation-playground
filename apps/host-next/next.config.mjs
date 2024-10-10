import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host-next',
        remotes: {
          remoteReact:
            'remoteReact@http://localhost:3001/assets/remoteEntry.js',
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

import { revalidate } from '@module-federation/nextjs-mf/utils';
import Document, { Html, Head, Main, NextScript } from 'next/document';

Document.getInitialProps = async (ctx) => {
  // HMR 활성화 확인
  if (ctx?.pathname && !ctx?.pathname?.endsWith('_error')) {
    await revalidate().then((shouldUpdate) => {
      if (shouldUpdate) {
        console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
      }
    });
  }

  const initialProps = await Document.getInitialProps(ctx);
  return initialProps;
};

export default function MyDocument() {
  return (
    <Html lang="kr" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

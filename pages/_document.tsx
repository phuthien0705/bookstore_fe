import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="manifest" href="/manifest.json" />

          {/* optimize this font calling later */}
          <link rel="shortcut icon" href="/logo.png" />

          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta
            property="og:title"
            content="Doccen.vn | Doctor-centric platform"
          />
          <meta name="title" content="Doccen.vn | Doctor-centric platform" />
          <meta property="og:url" content="bookstore-ecommerse.vercel.app" />
          <meta
            property="og:image"
            content="https://i.pinimg.com/originals/68/3a/0a/683a0afbeedeaae759c5676861a787b9.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

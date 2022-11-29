import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    {/* optimize this font calling later */}
                    <link rel="shortcut icon" href="/logo.png" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                    <meta charSet="UTF-8" />
                    <meta name="theme-color" content="#000000" />

                    <link rel="apple-touch-icon" href="/icon-192x192.png" />
                    <meta property="og:title" content="Doccen.vn | Doctor-centric platform" />
                    <meta name="title" content="Doccen.vn | Doctor-centric platform" />
                    <meta property="og:url" content="bookstore-ecommerse.vercel.app" />
                    <meta property="og:image" content="https://i.pinimg.com/originals/68/3a/0a/683a0afbeedeaae759c5676861a787b9.jpg" />
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

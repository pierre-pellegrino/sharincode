import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta name="viewport" content="initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Work+Sans:ital,wght@0,300;0,400;0,700;1,400&display=swap"       
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
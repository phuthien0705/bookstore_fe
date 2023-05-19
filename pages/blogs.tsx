import Head from 'next/head';
import ProductLayout from '@/layout/ProductLayot';
export default function blogs() {
  return (
    <>
      <Head>
        <title>Bài viết</title>
      </Head>
      <ProductLayout>this is blogs page</ProductLayout>
    </>
  );
}

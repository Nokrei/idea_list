import Head from "next/head";

type Layout = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function Layout({ title, description, children }: Layout) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main className="m-auto px-20 pt-10">{children}</main>
    </>
  );
}

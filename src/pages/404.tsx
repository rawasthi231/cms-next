import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h3 className="text-center text-warning mt-2">
          Well that's not the place you're looking for!
        </h3>
      </main>
    </>
  );
}

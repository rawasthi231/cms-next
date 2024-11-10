// import { useState } from "react";

// import ReactDOMServer from "react-dom/server";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Head from "next/head";

import config from "@/config/index";
import CMSLayout from "@/layouts/CMSlayout";

import { IData } from "@/typings/index";
import { Plugin } from "@/lib/pluginManager";

export default function Posts({
  post,
  plugins,
}: {
  post: IData;
  plugins: Plugin[];
}) {
  const router = useRouter();

  // const [content, setContent] = useState("");
  // const [content2, setContent2] = useState("");

  // // Render content with plugins
  // const renderContentWithPlugins = (content: any) => {
  //   plugins.forEach((plugin) => {
  //     if (plugin.render) {
  //       content = plugin.render(content);
  //     }
  //   });
  //   return content;
  // };

  // To serialize React element to HTML string

  // const serializeContent = (content: any) => {
  //   // Convert the React element (content) into an HTML string
  //   return ReactDOMServer.renderToStaticMarkup(content);
  // };

  // const serializeContentToJSON = (content: any) => {
  //   return {
  //     type: content.type,
  //     props: content.props,
  //   };
  // };

  // const handleSave = () => {
  //   console.log("Content:", content);

  //   const finalContent = renderContentWithPlugins(content);
  //   const serializedContent1 = serializeContent(finalContent); // Serialize content to HTML
  //   console.log("Saving content:", serializedContent1);
  //   setContent2(serializedContent1);
  //   // const serializedContent2 = serializeContentToJSON(finalContent);
  //   // console.log("Saving content:", serializedContent2);
  //   // Save the content to the database or backend here
  // };

  return (
    <>
      <Head>
        <title>Posts | {post.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CMSLayout title={post.title}>
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back
            </button>
            <button
              onClick={() => router.push(`/posts/${post.slug}/edit`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          </div>

          <div
            className="bg-white p-2 rounded mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </CMSLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/api/posts/${params?.slug}`);
    const post = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        post: [],
      },
    };
  }
};

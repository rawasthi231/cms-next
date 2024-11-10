import { useState } from "react";

import ReactDOMServer from "react-dom/server";

import { GetServerSideProps } from "next";

import Head from "next/head";

import config from "@/config/index";

import { IData } from "@/typings/index";
import { Plugin } from "@/lib/pluginManager";

export default function Posts({
  post,
  plugins,
}: {
  post: IData;
  plugins: Plugin[];
}) {
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  // Render content with plugins
  const renderContentWithPlugins = (content: any) => {
    plugins.forEach((plugin) => {
      if (plugin.render) {
        content = plugin.render(content);
      }
    });
    return content;
  };

  // To serialize React element to HTML string

  const serializeContent = (content: any) => {
    // Convert the React element (content) into an HTML string
    return ReactDOMServer.renderToStaticMarkup(content);
  };

  const serializeContentToJSON = (content: any) => {
    return {
      type: content.type,
      props: content.props,
    };
  };

  const handleSave = () => {
    console.log("Content:", content);

    const finalContent = renderContentWithPlugins(content);
    const serializedContent1 = serializeContent(finalContent); // Serialize content to HTML
    console.log("Saving content:", serializedContent1);
    setContent2(serializedContent1);
    // const serializedContent2 = serializeContentToJSON(finalContent);
    // console.log("Saving content:", serializedContent2);
    // Save the content to the database or backend here
  };

  return (
    <>
      <Head>
        <title>Posts | {post.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div dangerouslySetInnerHTML={{ __html: content2 }} />
      </div>
      <hr />
      <br />
      <br />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
        />
        <button onClick={handleSave}>Save Post</button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/api/posts/${params?.id}`);
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

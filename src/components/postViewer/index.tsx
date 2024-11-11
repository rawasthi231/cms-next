import React from "react";

import { getPlugins } from "@lib/pluginManager";

interface PostViewerProps {
  content: any[];
}

const PostViewer = ({ content }: PostViewerProps) => {
  const plugins = getPlugins();

  const renderContent = (content: any) => {
    // Check if a plugin can handle this content type
    const plugin = plugins.find((p) => p.name === content.type);
    if (plugin && plugin.render) {
      return plugin.render(content);
    }
    // Default rendering for non-plugin content
    return <div>{content.text}</div>;
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6 max-w-none">
      <h3 className="text-lg font-bold mb-4">Post Preview</h3>
      {content.map((block, index) => (
        <div key={index}>{renderContent(block)}</div>
      ))}
    </div>
  );
};

export default PostViewer;

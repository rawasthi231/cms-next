import React from "react";

interface PluginComponentProps {
  content: any;
}

export default function PluginComponent({ content }: PluginComponentProps) {
  return <blockquote>{content}</blockquote>;
}

import React from "react";
export interface Plugin {
  name: string; // Unique name for the plugin
  render?: (content: any) => React.ReactNode; // Optional render function
  init?: () => void; // Optional initialization function
}

let plugins: Plugin[] = [];

export function registerPlugin<T extends Plugin>(plugin: T): void {
  plugins.push(plugin);
}

export function getPlugins(): Plugin[] {
  return plugins;
}

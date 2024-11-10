// lib/pluginManager.ts
import React from "react";

export interface Plugin {
  name: string;
  render: (content: any) => JSX.Element;
}

let plugins: Plugin[] = [];

export function registerPlugin<T extends Plugin>(plugin: T): void {
  plugins.push(plugin);
}

export function getPlugins(): Plugin[] {
  return plugins;
}

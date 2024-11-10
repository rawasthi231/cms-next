import { useEffect } from "react";

export function loadPlugins() {
  const requirePlugin = require.context("../plugins", true, /index\.ts$/);
  requirePlugin.keys().forEach((pluginPath: string) => {
    const pluginModule = requirePlugin(pluginPath);
    if (pluginModule && typeof pluginModule.default === "function") {
      pluginModule.default();
    }
  });
}

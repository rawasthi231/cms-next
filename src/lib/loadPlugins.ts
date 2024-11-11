export function loadPlugins() {
  const requirePlugin = (require as any).context(
    "../plugins",
    true,
    /index\.ts$/
  );
  requirePlugin.keys().forEach((pluginPath: string) => {
    const pluginModule = requirePlugin(pluginPath);
    if (pluginModule && typeof pluginModule.default === "function") {
      pluginModule.default();
    }
  });
}

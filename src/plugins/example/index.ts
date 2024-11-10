import { registerPlugin } from "@lib/pluginManager";
import { Plugin } from "@lib/pluginManager";

import PluginComponent from "./components/PluginComponent";

// Registering the plugin with the correct type
const register = () => {
  registerPlugin<Plugin>({
    name: "example",
    render: (content) => {
      return PluginComponent({ content });
    },
  });
};

export default register;

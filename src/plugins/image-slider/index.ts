import Slider from "./components/Slider";

import { registerPlugin } from "@lib/pluginManager";
import { Plugin } from "@lib/pluginManager";

// Registering the plugin with the correct type
const register = () => {
  registerPlugin<Plugin>({
    name: "image-slider",
    render: (content) => Slider({ images: content.images }),
  });
};

export default register;

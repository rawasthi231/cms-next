# CMS-Next

## Getting started

### Local setup

- Run `npm install` to install dependencies
- Install `Docker Desktop` if not already installed
- Run `docker compose up -d` to up the `Postgres DB` container
- Create `.env.local` file
- Add the `DATABASE_URL` key to the `.env.local` file and put the value as `postgres://postgres:password@localhost:5432/postgres
- Set `synchronize` key to `true` in `src/lib/database.ts` file to setup the database tables
- Run `npm run dev` to start development server
- Navigate to `http://localhost:3000` to view the locally running `CMS-Next` application
- Explore the `Posts`/`Pages` functionalities
- Make sure to set `synchronize` key to false once the tables have been added to database.

## Plugin API Documentation

### Plugin Structure

Each plugin should include:

- An `index.ts` file that registers the plugin using `registerPlugin`.
- Any additional components or resources required by the plugin.

### Registering a Plugin

To register a plugin, call `registerPlugin` with the following properties:

- `name` (string): A unique identifier for the plugin.
- `render` (function): A function to render the plugin’s content block.

### Example Plugin

Here’s a simple example plugin that adds an image slider:

```typescript
import Slider from "./components/Slider";

import { registerPlugin } from "@lib/pluginManager";
import { Plugin } from "@lib/pluginManager";

const register = () => {
  registerPlugin<Plugin>({
    name: "image-slider",
    render: (content) => Slider({ images: content.images }),
  });
};

export default register;
```

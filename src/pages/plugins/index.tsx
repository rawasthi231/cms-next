import Head from "next/head";

import CMSLayout from "@/layouts/CMSlayout";

import { Plugin } from "@/lib/pluginManager";

export default function Plugins({ plugins }: { plugins: Plugin[] }) {
  return (
    <>
      <Head>
        <title>Plugins</title>
        <meta name="description" content="Biodata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CMSLayout title="Plugins">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Installed Plugins
            </h1>
          </div>
          <ol>
            {plugins.map((plugin, index) => (
              <li key={index}>{plugin.name}</li>
            ))}
          </ol>
        </div>
      </CMSLayout>
    </>
  );
}

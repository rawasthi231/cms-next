import { useEffect } from "react";
import type { AppProps } from "next/app";

import QueryProvider from "@/pages/queryProvider";
import Sidebar from "@/components/sidebar";

import { loadPlugins } from "@/lib/loadPlugins";
import { getPlugins } from "@/lib/pluginManager";

import "suneditor/dist/css/suneditor.min.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadPlugins();
  }, []);
  return (
    <QueryProvider>
      <div className="flex h-screen">
        <Sidebar />
        <Component {...pageProps} plugins={getPlugins()} />
      </div>
    </QueryProvider>
  );
}

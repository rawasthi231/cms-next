import { ReactNode } from "react";

import Header from "@components/header";

interface CMSLayoutProps {
  children: ReactNode;
  title: string;
}

const CMSLayout = ({ children, title }: CMSLayoutProps) => (
  <div className="flex-1 flex flex-col">
    <Header title={title} />
    <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
  </div>
);

export default CMSLayout;

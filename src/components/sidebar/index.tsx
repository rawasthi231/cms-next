import Link from "next/link";

const Sidebar = () => (
  <div className="bg-gray-800 text-white h-screen w-64 p-5 flex flex-col">
    <h1 className="text-xl font-bold mb-5">CMS Dashboard</h1>
    <nav className="space-y-4">
      <Link href="/posts" className="block px-3 py-2 rounded hover:bg-gray-700">
        Posts
      </Link>
      <Link href="/pages" className="block px-3 py-2 rounded hover:bg-gray-700">
        Pages
      </Link>
      <Link
        href="/plugins"
        className="block px-3 py-2 rounded hover:bg-gray-700"
      >
        Plugins
      </Link>
    </nav>
  </div>
);

export default Sidebar;

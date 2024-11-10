import { FC } from "react";

interface Post {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface DataListProps {
  data: Post[];
  onView: (slug: string) => void;
  onEdit: (slug: string) => void;
  onDelete: (id: number) => void;
  onCreateNew: () => void;
}

const DataList: FC<DataListProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onCreateNew,
}) => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onCreateNew}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create New
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
              Created On
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-600 uppercase tracking-wider">
              Last Update
            </th>
            <th className="py-3 px-6 text-center font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">{post.title}</td>
              <td className="py-4 px-6">
                {new Date(post.createdAt).toDateString()}
              </td>
              <td className="py-4 px-6">
                {new Date(post.updatedAt).toDateString()}
              </td>
              <td className="py-4 px-6 flex justify-center space-x-4">
                <button
                  onClick={() => onView(post.slug)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(post.slug)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataList;

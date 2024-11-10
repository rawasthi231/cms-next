import { useState } from "react";

import DataList from "@/components/dataList";

const PostsPage = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "First Post", slug: "first-post", createdAt: "2024-11-10" },
    {
      id: 2,
      title: "Second Post",
      slug: "second-post",
      createdAt: "2024-11-09",
    },
    { id: 3, title: "Third Post", slug: "third-post", createdAt: "2024-11-08" },
  ]);

  const handleView = (id: number) => {
    console.log(`Viewing post with ID: ${id}`);
    // Redirect or show post details
  };

  const handleEdit = (id: number) => {
    console.log(`Editing post with ID: ${id}`);
    // Redirect to edit page or open edit modal
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting post with ID: ${id}`);
    // Confirm and delete post from state or database
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleCreateNew = () => {
    console.log("Creating a new post");
    // Redirect to create post page or open modal
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <DataList
        posts={posts}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
};

export default PostsPage;

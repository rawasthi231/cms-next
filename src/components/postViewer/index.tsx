interface PostViewerProps {
  content: string;
}

const PostViewer = ({ content }: PostViewerProps) => (
  <div className="bg-white p-6 rounded shadow-md mt-6 max-w-none">
    <h3 className="text-lg font-bold mb-4">Post Preview</h3>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default PostViewer;

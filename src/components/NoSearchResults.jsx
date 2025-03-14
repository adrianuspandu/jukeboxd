export default function NoSearchResults({ query }) {
  return (
    <div className="max-w-xl mx-auto py-10">
      <p className="text-xl text-center text-ellipsis overflow-hidden">
        No Results for <span className="font-bold">"{query}"</span>
      </p>
    </div>
  );
}

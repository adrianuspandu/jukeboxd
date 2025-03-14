import { NavLink } from "react-router";

export default function EmptyDiscover() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <p className="text-xl text-center text-ellipsis overflow-hidden">
        Since you haven’t reviewed or rated an album yet. We can’t recommend you
        any albums.
        <NavLink className="text-inherit/4 underline font-bold block mt-1" to="/">
          Start by discovering your first album!
        </NavLink>
      </p>
    </div>
  );
}

import { NavLink } from "react-router";

export default function EmptyWantToListen() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <p className="text-xl text-center text-ellipsis overflow-hidden">
      You haven’t added any albums to “Want to Listen”.
        <NavLink className="text-inherit/4 underline font-bold block mt-1" to="/">
          Start by discovering your first album!
        </NavLink>
      </p>
    </div>
  );
}

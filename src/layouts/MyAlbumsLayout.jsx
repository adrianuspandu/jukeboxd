import { Outlet, NavLink } from "react-router";
import clsx from "clsx";

export default function MyAlbumsLayout() {
  const navLinkClassName = clsx(
    "nav-link",
    "text-base",
    "font-bold",
    "hover:text-graytext",
    "py-0.5",
    "grow",
    "text-center",
  );

  const activeStyle = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-background)",
  };
  return (
    <>
      <div className="mt-5 w-xl mx-auto">
        <h1 className="text-6xl text-center font-bold mb-1">My Albums</h1>
        <p className="text-center">
          Here, you can find albums you've reviewed in the past, as well as
          albums you've added to "Want to Listen".
        </p>

        <nav className="flex flex-row border border-primary rounded-md justify-around overflow-hidden my-2">
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : {};
            }}
            to=""
            end
            className={navLinkClassName}
          >
            Reviewed Albums
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : {};
            }}
            to="want-to-listen"
            className={navLinkClassName}
          >
            Want to Listen
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </>
  );
}

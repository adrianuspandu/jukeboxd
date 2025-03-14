import { NavLink, Outlet } from "react-router";
import Footer from "../components/Footer";
import clsx from "clsx";

export default function RootLayout() {
  const navLinkClassName = clsx(
    "nav-link",
    "text-2xl",
    "font-normal",
    "hover:text-graytext"
  );
  const activeStyle = {
    backgroundColor: "var(--color-primary)"
  }
  return (
    <>
      <header>
        <nav className="flex flex-row justify-center gap-6 pt-2">
          <NavLink
            className={navLinkClassName}
            to="/"
            style={({ isActive }) => {
              return isActive ? { textDecoration: "underline" } : {};
            }}
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { textDecoration: "underline" } : {};
            }}
            className={navLinkClassName}
            to="new-releases"
          >
            New Releases
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { textDecoration: "underline" } : {};
            }}
            className={navLinkClassName}
            to="my-albums"
          >
            My Albums
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { textDecoration: "underline" } : {};
            }}
            className={navLinkClassName}
            to="about"
          >
            About
          </NavLink>
        </nav>
      </header>
      <main id="main" className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

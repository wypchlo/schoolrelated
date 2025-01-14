import { NavLink } from "react-router";

export function meta() {
  return [
    { title: "Homer" },
  ];
}

export default function Home() {
  return (
    <>
        <h1 className="font"> Home AI </h1>

        <nav>
            <NavLink to="/about"> About </NavLink>
            <NavLink to="/contact"> Contact </NavLink>
        </nav>
    </>
  );
}

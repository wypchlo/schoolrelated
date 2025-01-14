import { NavLink } from "react-router";

export function meta() {
    return [
        { title: "About" }
    ]
}

export default function About() {
    return (
        <>
            <h1> About </h1>

            <nav>
                <NavLink to='/'> Home </NavLink>
                <NavLink to="/contact"> Contact </NavLink>
            </nav>
        </>
    )
}

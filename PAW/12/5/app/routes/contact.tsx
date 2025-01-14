import { NavLink } from "react-router";

export function meta() {
    return [
        { title: "Contact" }
    ]
}

export default function Contact() {
    return (
        <>
            <h1> Contact </h1>

            <nav>
                <NavLink to='/'> Home </NavLink>
                <NavLink to="/about"> About </NavLink>
            </nav>
        </>
    )
}

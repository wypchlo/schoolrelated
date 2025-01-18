import BlockButton from "app/components/BlockButton"
import { NavLink } from "react-router"

export default function NewPost() {
    return (
        <main id="newpost">
            <header> Dodaj nowy wpis </header>

            <form>
                <label> Tytuł <input name="title" type="text"/> </label>
                <label> Opis <input name="description" type="text"/> </label>
                <label> Tresc <input name="content" type="text"/> </label>
            </form>

            <nav>
                <BlockButton> Dodaj nowy wpis </BlockButton>
                <NavLink to="/posts"> <BlockButton> Wróc </BlockButton> </NavLink>
            </nav>
        </main>
    )
}

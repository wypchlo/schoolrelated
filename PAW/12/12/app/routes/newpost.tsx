import BlockButton from "app/components/BlockButton"
import React, { useRef } from "react"
import { NavLink } from "react-router"

export default function NewPost() {
    const formRef = useRef<HTMLFormElement>(null);

    async function addPost(formData: FormData) {
        const title = formData.get("title");
        const description = formData.get("description");
        const content = formData.get("content");
        
        try {
            const response = await fetch('http://localhost:3000/wpis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, content }) 
            });
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    
    return (
        <main id="newpost">
            <header> Dodaj nowy wpis </header>
                
            <section>
                <form ref={formRef} action={addPost}>
                    <label> Tytul <input name="title" type="text" required/> </label>
                    <label> Opis <input name="description" type="text"/> </label>
                    <label> Tresc <input name="content" type="text" required/> </label>
                    <nav>
                        <BlockButton type="submit"> Dodaj nowy wpis </BlockButton>
                        <NavLink to="/posts"> <BlockButton> Wróc </BlockButton> </NavLink>
                    </nav>
                </form>
            </section>
        </main>
    )
}

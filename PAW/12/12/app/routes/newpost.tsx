import BlockButton from "app/components/BlockButton"
import React, { useRef, useState } from "react"
import { NavLink } from "react-router"

export default function NewPost() {
    const formRef = useRef<HTMLFormElement>(null);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    async function addPost(formData: FormData) {
        const nTitle = formData.get("title");
        const nContent = formData.get("content");
        
        if(!nTitle) return setTitleError("Tytuł wpisu jest wymagany");
        if(!nContent) return setContentError("Treść wpisu jest wymagana");

        const title: String = nTitle.toString();
        const content: String = nContent.toString();
    
        if(title.length == 0) return setTitleError("Tytuł wpisu jest wymagany");
        if(content.length == 0) return setContentError("Treść wpisu jest wymagana");

        const description = formData.get("description");

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
                    <label> Tytul <input name="title" type="text"/> {titleError} </label>
                    <label> Opis <input name="description" type="text"/> </label>
                    <label> Tresc <input name="content" type="text"/> {contentError}</label>
                    <nav>
                        <BlockButton type="submit"> Dodaj nowy wpis </BlockButton>
                        <NavLink to="/posts"> <BlockButton> Wróc </BlockButton> </NavLink>
                    </nav>
                </form>
            </section>
        </main>
    )
}

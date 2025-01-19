import BlockButton from "app/components/BlockButton"
import React, { useRef, useState } from "react"
import { NavLink } from "react-router"

export default function NewPost() {
    const formRef = useRef<HTMLFormElement>(null);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    async function addPost(formData: FormData) {
        setTitleError('');
        setContentError('');
        const nTitle = formData.get("title");
        const nContent = formData.get("content");
        
        if(!nTitle) setTitleError("Tytuł wpisu jest wymagany");
        if(!nContent) setContentError("Treść wpisu jest wymagana");
        if(titleError.length != 0 || contentError.length != 0) return;

        const title: String = nTitle!.toString();
        const content: String = nContent!.toString();
    
        if(title.length == 0) setTitleError("Tytuł wpisu jest wymagany");
        if(content.length == 0) setContentError("Treść wpisu jest wymagana");
        if(titleError.length != 0 || contentError.length != 0) return;

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
                    <label> Tytuł <input name="title" type="text"/> <div id="error"> {titleError} </div> </label>
                    <label> Opis <input name="description" type="text"/> </label>
                    <label> Treść <textarea name="content"/> <span/> <div id="error"> {contentError} </div> </label>
                    <nav>
                        <BlockButton type="submit"> Dodaj nowy wpis </BlockButton>
                        <NavLink to="/posts"> <BlockButton> Wróć </BlockButton> </NavLink>
                    </nav>
                </form>
            </section>
        </main>
    )
}

import BlockButton from "app/components/BlockButton"
import React, { useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router"

export default function NewPost() {
    const formRef = useRef<HTMLFormElement>(null);
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const navigate = useNavigate();

    async function addPost(formData: FormData) {
        setContentError('');
        setTitleError('');
        let errors = { title: '', content: '' }
        
        const title: string | null = formData.get("title") ? formData.get('title')!.toString() : null;
        const content: string | null = formData.get("content") ? formData.get('content')!.toString() : null;
        const description: string | null = formData.get("description") ? formData.get('description')!.toString() : null;
        
        if(!title) errors.title = "Tytuł wpisu jest wymagany";
        if(!content) errors.content = "Treść wpisu jest wymagana"; 
        if(errors.title || errors.content) { 
            setContentError(errors.title);
            setTitleError(errors.content)
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/wpis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, content }) 
            });
            if(!response.ok) throw new Error("Failed to add new post");
            navigate("/posts");
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

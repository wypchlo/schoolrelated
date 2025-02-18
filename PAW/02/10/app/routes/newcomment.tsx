import BlockButton from "app/components/BlockButton"
import React, { useRef, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"

function NewComment() {
    const formRef = useRef<HTMLFormElement>(null);
    const [contentError, setContentError] = useState('');
    const navigate = useNavigate();
    const { postId } = useParams();

    async function addComment(formData: FormData) {
        setContentError('');
        let errors = { content: '' }
        const content = formData.get("content") ? formData.get("content")!.toString() : null;
        
        if(!content) errors.content = "Treść jest wymagana";
        if(errors.content) return setContentError(errors.content);

        try {
            const response = await fetch('http://localhost:3000/komentarz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, postId }) 
            });
            if(!response.ok) throw new Error("Failed to add a new comment");
            navigate(`/postdetails/${postId}`);
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    
    return (
        <main id="newcategory">
            <header> Dodaj nowy komentarz </header>
                
            <section>
                <form ref={formRef} action={addComment}>
                    <label> Treść <input name="content" type="text"/> <div id="error"> {contentError} </div> </label>

                    <nav>
                        <BlockButton type="submit"> Dodaj nowy komentarz </BlockButton>
                        <NavLink to={`/postdetails/${postId}`}> <BlockButton> Wróć </BlockButton> </NavLink>
                    </nav>
                </form>
            </section>
        </main>
    )
}

export default NewComment;

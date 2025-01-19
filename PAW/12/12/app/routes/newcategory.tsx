import BlockButton from "app/components/BlockButton"
import React, { useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router"

export default function NewPost() {
    const formRef = useRef<HTMLFormElement>(null);
    const [categoryError, setCategoryError] = useState('');
    const navigate = useNavigate();

    async function addPost(formData: FormData) {
        setCategoryError('');
        const nCategory = formData.get("category");
        
        if(!nCategory) return setCategoryError("Nazwa kategorii jest wymagana");

        const category: String = nCategory!.toString();
    
        if(category.length == 0) return setCategoryError("Nazwa kategorii jest wymagana");

        const description = formData.get("description");

        try {
            const response = await fetch('http://localhost:3000/kategoria', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, description }) 
            });
            if(!response.ok) throw new Error("Failed to add new category");
            navigate("/categories");
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
    
    return (
        <main id="newcategory">
            <header> Dodaj nową kategorie </header>
                
            <section>
                <form ref={formRef} action={addPost}>
                    <label> Kategoria <input name="category" type="text"/> <div id="error"> {categoryError} </div> </label>
                    <label> Opis <input name="description" type="text"/> </label>
                    <nav>
                        <BlockButton type="submit"> Dodaj nową kategorie </BlockButton>
                        <NavLink to="/categories"> <BlockButton> Wróć </BlockButton> </NavLink>
                    </nav>
                </form>
            </section>
        </main>
    )
}

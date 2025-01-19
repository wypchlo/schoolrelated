import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function Categories() {
    const [categories, setCategories] = useState<Array<any>>();
    const [selected, setSelected] = useState<Number | null>(null);

    async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:3000/kategoria");
            if(!response.ok) throw new Error("Failed to fetch categories");

            const data = await response.json();
            setCategories(data);
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    useEffect(() => {
        if(!categories) fetchCategories();
    }, []);

    function Categories() {
        if(!categories) return null;
        if(categories.length == 0) return null;
        return categories.map(category => (
            <button 
                className={`category ${selected ? selected.valueOf() == category.id ? 'selected' : '' : ''}`} 
                key={category.id} 
                onClick={() => setSelected(category.id)}
            >
                <div id="category"> {category.category} </div>
                <div id="description"> {category.description} </div>
            </button>
        ))
    }

    async function deleteCategory() {
        try {
            const response = await fetch(`http://localhost:3000/kategoria/${selected}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if(!response.ok) throw new Error("Failed to delete category");
            setSelected(null);
            fetchCategories();
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    return (
        <main id="categories"> 
            <header> Kategorie </header>
            
            <section>
                <div id="categoryContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding">
                            <Categories/>
                        </div>
                    </Scrollbar>
                </div>
            </section>

            <footer>
                <nav id="options">
                    <a><BlockButton disabled={selected ? false : true} onClick={deleteCategory}> Usuń kategorie </BlockButton></a>
                    <NavLink to="/newcategory"><BlockButton> Dodaj kategorie </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Wróć </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

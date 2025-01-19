import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function PostDetails() {
    const [title, setTitle] = useState<String>('');
    const [description, setDescription] = useState<String>('');
    const [content, setContent] = useState<String>('');
    
    const { id } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/wpis/${id}`);
                if(!response.ok) throw new Error("Failed to fetch posts");

                const { title, description, content } = await response.json();
                setTitle(title);
                if(description) setDescription(description);
                setContent(content);
            }
            catch(error) {
                console.error(`Error: ${error}`);
            }
        }
        fetchPosts();
    }, []);

    return (
        <main id="postdetails"> 
            <header> 
                <div id="title"> {title} </div>
                <div id="description"> {description} </div>
            </header>
             
            <section>
                <div id="postContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding"> {content} </div>
                    </Scrollbar>
                </div>
            </section>

            <footer>
                <nav id="options">
                    <NavLink to="/posts"><BlockButton> Wróć </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

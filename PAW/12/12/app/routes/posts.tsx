import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import FC from "react-dom"
import { NavLink } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function Posts() {
    const [posts, setPosts] = useState<Array<any>>();
    const [selected, setSelected] = useState<Number | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/wpis");
                if(!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setPosts(data);
            }
            catch(error) {
                console.error(`Error: ${error}`);
            }
        }
        if(!posts) fetchPosts();
    }, []);

    function Posts() {
        if(!posts) return null;
        if(posts.length == 0) return null;
        return posts.map(post => (
            <button 
                className={`post ${selected ? selected.valueOf() == post.id ? 'selected' : '' : ''}`} 
                key={post.id} 
                onClick={() => setSelected(post.id)}
            >
                <div id="title"> {post.title} </div>
                <div id="description"> {post.description} </div>
            </button>
        ))
    }

    return (
        <main id="posts"> 
            <header> Wpisy </header>
            
            <section>
                <div id="postContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding">
                            <Posts/>
                        </div>
                    </Scrollbar>
                </div>
            </section>

            <footer>
                <nav id="options">
                    <NavLink to=""><BlockButton disabled={selected ? false : true}> Zobacz wpis </BlockButton></NavLink>
                    <NavLink to="/newpost"><BlockButton> Dodaj wpis </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Wróc </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

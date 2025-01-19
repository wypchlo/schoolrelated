import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function Posts() {
    const [posts, setPosts] = useState<Array<any>>();
    const [selected, setSelected] = useState<Number | null>(null); 
    const navigate = useNavigate();
    
    function handleClick(postId: Number) {
        if(selected == postId) navigate(`/postdetails/${postId}`);
        setSelected(postId);
    }

    async function fetchPosts() {
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

    useEffect(() => {
        if(!posts) fetchPosts();
    }, []);
    
    async function deletePost() {
        try {
            const response = await fetch(`http://localhost:3000/wpis/${selected}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if(!response.ok) throw new Error("Failed to delete post");
            setSelected(null);
            fetchPosts();
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    function Posts() {
        if(!posts) return null;
        if(posts.length == 0) return null;
        return posts.map(post => (
            <button 
                className={`post ${selected ? selected.valueOf() == post.id ? 'selected' : '' : ''}`} 
                key={post.id} 
                onClick={() => handleClick(post.id)}
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
                    <NavLink to={`/postdetails/${selected}`}><BlockButton disabled={selected ? false : true}> Zobacz wpis </BlockButton></NavLink>
                    <NavLink to="/newpost"><BlockButton> Dodaj wpis </BlockButton></NavLink>
                    <a><BlockButton disabled={selected ? false : true} onClick={deletePost}> Usuń wpis </BlockButton></a>
                    <NavLink to="/"><BlockButton> Wróć </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

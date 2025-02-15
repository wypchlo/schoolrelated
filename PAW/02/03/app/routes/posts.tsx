import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";
import { useQuery } from "@tanstack/react-query";

interface Post {
    userId: Number,
    id: Number,
    title: string,
    body: string
}

function Posts() {
    const [selected, setSelected] = useState<Number | null>(null);
    const navigate = useNavigate();

    const { data: posts, error, isPending } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    async function handleClick(postId: Number) {
        if(selected == postId) navigate(`/postdetails/${postId}`);
        setSelected(postId);
    }

    function PostsList() {
        if(isPending) return ( <p className="loadingAnim">Wczytywanie</p> );
        if(error) return ( <p id="progress"> {error.message} </p> );
        return posts.map(post => (
            <button 
                className={`post ${selected ? selected.valueOf() == post.id ? 'selected' : '' : ''}`} 
                onClick={() => handleClick(post.id)}
            >
                <div id="title"> {post.title} </div>
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
                            <PostsList/>
                        </div>
                    </Scrollbar>
                </div>
            </section>

            <footer>
                <nav id="options">
                    <NavLink to={`/postdetails/${selected}`}><BlockButton disabled={selected ? false : true}> Zobacz wpis </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Wróć </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!response.ok) throw new Error("Wystąpił błąd podczas pobierania wpisów");
    return response.json();
}

export default Posts;

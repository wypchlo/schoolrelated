import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function PostDetails() {
    const [title, setTitle] = useState<String>('');
    const [description, setDescription] = useState<String>('');
    const [content, setContent] = useState<String>('');
    const [shown, setShown] = useState<String>('post');

    const [selected, setSelected] = useState<Number | null>(null);
    const [comments, setComments] = useState<Array<any>>([]);

    const { id } = useParams();

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/komentarz/wpis/${id}`);
            if(!response.ok) throw new Error("Failed to fetch comments");

            const data = await response.json();
            setComments(data);
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

   
    const deleteComment = async() => {
        try {
            const response = await fetch(`http://localhost:3000/komentarz/${selected}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if(!response.ok) throw new Error("Failed to delete post");
            setSelected(null);
            fetchComments();
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }         
    }
    
    function Comments() {
        return comments.map(comment => (
            <button 
                className={`post ${selected ? selected.valueOf() == comment.id ? 'selected' : '' : ''}`} 
                key={comment.id} 
                onClick={() => setSelected(comment.id)}
            >
                <div id="title"> {comment.content} </div>
            </button>
        ))   
    }

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
        fetchComments();
    }, []);

    return (
        <main id="postdetails"> 
            <header> 
                <div id="title"> {title} </div>
                <div id="description"> {description} </div>
            </header>
             
            <section className="comments">
                <div id="postContainer" className={shown == "post" ? "shown" : ''}>
                    <Scrollbar id="scrollbar">
                        <div id="padding"> {content}</div>
                    </Scrollbar>
                </div>
                <div id="commentsContainer" className={shown == "comments" ? "shown" : ''}>
                    <Scrollbar id="scrollbar">
                        <div id="padding"> <Comments/> </div>
                    </Scrollbar>
                </div>
                {shown == 'comments' ? (<button id="leftArrow" onClick={() => setShown('post')}/>) : (<> </>)}
                {shown == 'post' ? (<button id="rightArrow" onClick={() => setShown('comments')}/>) : (<> </>)}
            </section>

            <footer>
                <nav id="options">
                    <a><BlockButton disabled={selected ? false : true} onClick={deleteComment}> Usuń komentarz </BlockButton></a>
                    <NavLink to={`/newcomment/${id}`}><BlockButton> Dodaj komentarz </BlockButton></NavLink>
                    <NavLink to="/posts"><BlockButton> Wróć </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

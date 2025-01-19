import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function PostDetails() {
    const [title, setTitle] = useState<String>('');
    const [body, setBody] = useState<String>('');

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const fetchUserDetails = async (userId: Number) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`) 
            if(!response.ok) throw new Error("Failed to fetch user details");

            const { username, name, email } = await response.json();
            setUsername(username);
            setName(name);
            setEmail(email)
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if(!response.ok) throw new Error("Failed to fetch posts");

                const { title, body, userId } = await response.json();
                setTitle(title);
                setBody(body);

                fetchUserDetails(userId);
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
                <div id="stevContainer"> 
                    <img src="/stev.png"/> 
                    <div id="userInfo">
                        <div id="username"> {username} </div>
                        <div id="name"> {name} </div>
                        <div id="email"> {email} </div>
                    </div>
                </div>
            </header>
             
            <section>
                <div id="postContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding"> {body} </div>
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

import BlockButton from "app/components/BlockButton";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function PostDetails() {
    const queryClient = useQueryClient();

    const { id } = useParams();
    const [userId, setUserId] = useState<Number | null>(null);

    const { data: user, isPending: userLoading, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if(!response.ok) throw new Error("Wystąpił błąd");
            return await response.json();
        },
        gcTime: 0,
        enabled: !!userId
    });

    const { data: post, isPending: postPending, error: postError } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            //await new Promise((resolve) => setTimeout(resolve, 100000));
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if(!response.ok) throw new Error("Wystąpił bład podczas pobierania wpisu");
            return await response.json();
        },
        gcTime: 0
    })

    useEffect(() => { if(post) setUserId(post.userId) }, [post]);

    return (
        <main id="postdetails"> 
            <header> 
                <div id="title"> { post ? ( <> {post.title} </> ) : ( <p className="loadingAnim">Wczytywanie</p> )} </div>
                <div id="stevContainer"> 
                    <img src="/stev.png"/> 
                    <div id="userInfo">
                        {user ? (
                            <>
                                <div id="username"> {user.username} </div>
                                <div id="name"> {user.name} </div>
                                <div id="email"> {user.email} </div>
                            </>
                        ) : (
                            <p className="loadingAnim">Wczytywanie</p>
                        )}                    
                    </div>
                </div>
            </header>
             
            <section>
                <div id="postContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding"> 
                            { post ? ( <> {post.body} </>) : ( <p className="loadingAnim">Wczytywanie</p> ) }
                        </div>
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

export default PostDetails;

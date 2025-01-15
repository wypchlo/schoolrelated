import BlockButton from "app/components/BlockButton";
import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function Posts() {
    const postContainerRef = useRef<HTMLDivElement>(null);
    const scrollbarContainerRef = useRef(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    
    const [pressed, setPressed] = useState(false);
    
    function handleMouseDown() {
        setPressed(true)
    }
    function handleMouseUp () {
        setPressed(false);
    }
    
    function handleMouseMove(e: any) {
        if(pressed) {
            scrollbarRef.current!.style.setProperty("top", `${e.clientY}px`);
        }
    }

    function updateScrollbar() {
        if(postContainerRef.current)
        {
            const actualHeight = postContainerRef.current.scrollHeight;
            const visibleHeight = postContainerRef.current.clientHeight;

            scrollbarRef.current!.style.setProperty("height", `${visibleHeight/actualHeight*100}%`);
        }
    }

    useEffect(() => {
        updateScrollbar();
    });

    return (
        <main id="posts"> 
            <header> Wpisy </header>
            
            <section>
                <div id="postContainer" ref={postContainerRef}>
                    <button className="post"> wpis1 </button>
                    <button className="post"> wpis2 </button>
                    <button className="post"> wpis3 </button>
                    <button className="post"> wpis4 </button>
                    <button className="post"> wpis5 </button>
                    <button className="post"> wpis6 </button>
                    <button className="post"> wpis7 </button>
                    <button className="post"> wpis8 </button>
                </div>

                <aside ref={scrollbarContainerRef}> 
                    <div ref={scrollbarRef} 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        id="scrollbar"></div> 
                </aside>
            </section>

            <footer>
                <nav id="options">
                    <NavLink to=""><BlockButton> Zobacz wpis </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Dodaj wpis </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Wróc </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

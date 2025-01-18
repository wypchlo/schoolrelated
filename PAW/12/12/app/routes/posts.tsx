import BlockButton from "app/components/BlockButton";
import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Scrollbar } from "react-scrollbars-custom";

export default function Posts() {
    return (
        <main id="posts"> 
            <header> Wpisy </header>
            
            <section>
                <div id="postContainer">
                    <Scrollbar id="scrollbar">
                        <div id="padding">
                            <button className="post">
                                <div id="title"> Herobrine? </div>
                                <div id="description"> Mysle ze herobrine istnieje to nie zarty </div>
                            </button>
                            <button className="post">
                                <div id="title"> Herobrine? </div>
                                <div id="description"> Mysle ze herobrine istnieje to nie zarty </div>
                            </button>
                            <button className="post">
                                <div id="title"> Herobrine? </div>
                                <div id="description"> Mysle ze herobrine istnieje to nie zarty </div>
                            </button>
                            <button className="post">
                                <div id="title"> Herobrine? </div>
                                <div id="description"> Mysle ze herobrine istnieje to nie zarty </div>
                            </button>
                            <button className="post">
                                <div id="title"> Herobrine? </div>
                                <div id="description"> Mysle ze herobrine istnieje to nie zarty </div>
                            </button>
                        </div>
                    </Scrollbar>
                </div>
            </section>

            <footer>
                <nav id="options">
                    <NavLink to=""><BlockButton> Zobacz wpis </BlockButton></NavLink>
                    <NavLink to="/newpost"><BlockButton> Dodaj wpis </BlockButton></NavLink>
                    <NavLink to="/"><BlockButton> Wróc </BlockButton></NavLink>
                </nav>
            </footer>
        </main>
    )
}

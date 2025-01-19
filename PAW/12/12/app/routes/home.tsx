import logoImage from "/logobest.png";
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router";
import BlockButton from "app/components/BlockButton";

export function meta() {
    return [
        { title: "Minecraft forum" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    function removeCharacterAtIndex(str: String, index: number) {
        if (index < 0 || index >= str.length) return str;
        return str.slice(0, index) + str.slice(index + 1);
    }

    function scrambleString(s: String) {
        s = s.slice(1, s.length - 1);
        let result: String = "";

        while(true) {
            if(s.length == 0) break;
            let index = Math.floor(Math.random() * s.length);
            result += s[index];
            s = removeCharacterAtIndex(s, index);
        }

        return result;
    }

    function scramble() {
        let initial: String = getComputedStyle(document.documentElement).getPropertyValue('--logo-message');
        document.documentElement.style.setProperty('--logo-message', `'${scrambleString(initial)}'`);
    }
    
    const audio = useRef<HTMLAudioElement>(null);

    function toggleMusic() {
        if(!audio.current!.paused) return audio.current!.pause();
        audio.current!.play();
    }
    
    useEffect(() => {
        audio.current = new Audio("/calm1.ogg");
    });

    return (
        <main id="home">
            <div id="routeIndicator"> Forum beta 1.7.3 </div>

            <header>
                <div><img src={logoImage} id="logoImage"/></div>
            </header>
            
            <nav>
                <div id="container">
                    <NavLink to="/posts"><BlockButton> Wpisy </BlockButton></NavLink>
                    <BlockButton> Kategorie </BlockButton>
                    <div id="bonus">
                        <BlockButton onClick={scramble}> Zepsuj </BlockButton>
                        <BlockButton onClick={toggleMusic}> Muzyka </BlockButton>
                    </div>
                </div>
            </nav>
            
            <footer> Copyright Miłosz Wypchło. Do not distribute. </footer>
        </main>
    );
}

import React, { useState } from "react";

export default function BlockButton({onClick, children, type = "button", disabled = false}: any) {
    const playClickSound = () => {
        let clickAudio = new Audio("/click.ogg");
        clickAudio.play();
    }

    const handleClick = (e: any) => {
        playClickSound();
        if(onClick) {
            onClick(e);
        }
    }

    return (
        <button onClick={handleClick} className="blockButton" type={type} disabled={disabled}>
            { children } 
        </button>
    ) 
}

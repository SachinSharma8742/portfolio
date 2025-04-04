"use strict";

window.addEventListener("keydown", (e)=>{
    const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // gives us audio tad with entered key-code


    if(sound == null) return; 
    

    const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
    button.classList.add("running");


    sound.play();
    sound.currentTime = 0; 
    // it sets the time of audio at 0 every time when we pressdown key


    // setTimeout(function(){
    //     button.classList.remove("running");
    // }, 500)


})


const keys = document.querySelectorAll(".key");

for(let key of keys)
{
    key.addEventListener("transitionend", (e)=>{
        // console.log(e);
        if(e.propertyName !== 'transform') return;

        key.classList.remove("running");
    })
}
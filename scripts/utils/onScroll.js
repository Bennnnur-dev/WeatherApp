export function onScroll(reference){
    document.addEventListener("DOMContentLoaded", () => {
        const headerBG = document.querySelector(".background")
        const header = document.querySelector("header")
        const headerY = header.getBoundingClientRect().y
        const coordY = document.querySelector(`${reference}`).getBoundingClientRect().y
        if (coordY - headerY <= -20 ){
            headerBG.classList.add("background-anim")
        } else headerBG.classList.remove("background-anim")
    })
}
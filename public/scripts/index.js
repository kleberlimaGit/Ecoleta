const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closee = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click",()=>{
    modal.classList.remove("hide")
    })

closee.addEventListener("click",()=>{
    modal.classList.add("hide")
})

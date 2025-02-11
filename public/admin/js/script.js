const buttonsStatus = document.querySelectorAll("[button-status]")

let url = new URL(window.location.href)

if(buttonsStatus.length > 0){
    buttonsStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}
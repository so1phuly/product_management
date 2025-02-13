// Button Status
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
//end button status

// Form Search
const formSearch = document.querySelector("#form-search")
// console.log(formSearch)
if(formSearch){
    
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End Form Search

//Phân trang
const buttonsPagination = document.querySelectorAll("[button-paginantion]")
if(buttonsPagination){
    buttonsPagination.forEach(button =>{
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-paginantion")
            let url = new URL(window.location.href)
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
//hết phân trang
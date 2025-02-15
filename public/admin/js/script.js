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

//check box
const checkboxMulti= document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    
    inputCheckAll.addEventListener("click", () =>{
        if(inputCheckAll.checked){
            inputsId.forEach(input =>{
                input.checked = true
            })
        }else{
            inputsId.forEach(input =>{
                input.checked = false
            })
        }
    })

    inputsId.forEach(input =>{
        input.addEventListener("click", ()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true
            }else{
                inputCheckAll.checked = false
            }
        })
    })
}
//end check box

// form submit
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{
        e.preventDefault()
        const checkboxMulti= document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
        if(inputChecked.length > 0){
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputChecked.forEach(input =>{
                const id = input.value
                ids.push(id)
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
        }else{
            alert("vui lòng tích chọn sản phẩm")
        }
    })
}
// end form submit
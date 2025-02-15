//changeStatus
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    // console.log(formChangeStatus)
    const path = formChangeStatus.getAttribute("data-path")
    // console.log(path)
    buttonsChangeStatus.forEach(button =>{
        button.addEventListener("click", ()=>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "inactive" : "active"
            // console.log(statusChange)
            const action = path + `${statusChange}/${id}?_method=PATCH`
            // console.log(action)
            formChangeStatus.action = action
            formChangeStatus.submit()
        })
    })
}
//end changeStatus

//delete item
const buttonsDelete = document.querySelectorAll("[button-delete]")
if(buttonsDelete.length>0){
    const formDelete = document.querySelector("#form-delete-item")
    const path = formDelete.getAttribute("data-path")

    buttonsDelete.forEach(button =>{
    button.addEventListener("click", ()=>{
        const isConfirm = confirm("Bạn có muốn xóa sản phẩm")
        if(isConfirm){
            const id = button.getAttribute("data-id")
            const action = path + `${id}?_method=DELETE`
            formDelete.action = action
            formDelete.submit()
        }
    })
})
}
//end delete item


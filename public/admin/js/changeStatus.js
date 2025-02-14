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
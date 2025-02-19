// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]")

let url = new URL(window.location.href)

if (buttonsStatus.length > 0) {
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status)
            } else {
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
if (formSearch) {

    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End Form Search

//Phân trang
const buttonsPagination = document.querySelectorAll("[button-paginantion]")
if (buttonsPagination) {
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-paginantion")
            let url = new URL(window.location.href)
            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
//hết phân trang

//check box
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })
}
//end check box

// form submit
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeInput = e.target.elements.type.value
        if (typeInput === "default") {
            alert("Vui lòng chọn chức năng")
            return
        }
        if (inputChecked.length > 0) {
            if (typeInput == "delete-all") {
                const isCofirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này?")
                if (!isCofirm) {
                    return
                }
            }
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            inputChecked.forEach(input => {
                const id = input.value
                if (typeInput == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                    console.log(ids)
                } else {
                    ids.push(id)
                }
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
        } else {
            alert("vui lòng tích chọn sản phẩm")
        }
    })
}
// end form submit

//show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]")
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    }, time)
    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden")
    })
}
//end show alert

// upload img
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e)=>{
        const file = e.target.files[0]
        console.log(file)
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// end upload img

//sort
 const sort = document.querySelector("[sort]")
 if(sort){
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")
    let url = new URL(window.location.href)
    sortSelect.addEventListener("change", (e)=>{
        const value = e.target.value
        let [sortKey, sortValue] = value.split("-")
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href
    })
    sortClear.addEventListener("click", ()=>{
        console.log(url)
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href
    })
 }

//end sort

//thêm selected cho option
const sortKey = url.searchParams.get("sortKey")
const sortValue = url.searchParams.get("sortValue")

if(sortKey && sortValue){
    const stringSort = `${sortKey}-${sortValue}`
    const optionSelected = sort.querySelector(`option[value='${stringSort}']`)
    optionSelected.selected = true
}

// end thêm selected cho option
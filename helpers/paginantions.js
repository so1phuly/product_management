module.exports = (objectPagination,query,countProduct) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page)
    }else{
        query.page = `1`
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitedItem
    const totalPage = Math.ceil(countProduct/objectPagination.limitedItem)
    objectPagination.totalPage = totalPage
    return objectPagination
}   
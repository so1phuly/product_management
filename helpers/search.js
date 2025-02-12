module.exports = (query,find)=>{
    let keyword = ""
    if(query.keyword){
        keyword = query.keyword
        const regex = new RegExp(keyword, "i")
        find.title = regex
    }
    return keyword
}
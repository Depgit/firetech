export const postinitialState = []

export const postreducer = (post, action)=>{
    console.log("Post reducer page running .... ", post,action);

    if(action.type==="POSTS"){
        return [...post, action.payload]
    }
    return post
}

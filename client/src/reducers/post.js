export const postinitialState = []

export const postreducer = (post, action)=>{
    if(action.type==="POSTS"){
        return [...post, action.payload]
    }
    return post
}

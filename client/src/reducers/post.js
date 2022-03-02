export const postinitialState = null


export const postreducer = (state, action)=>{
    if(action.type==="POSTS"){
        return action.payload
    }
    if(action.type==="CLEAR"){return null}
    return state
}

export const contestinitialState = []

export const contestreducer = (contest, action)=>{
    if(action.type==="CONTEST"){
        return [...contest, action.payload]
    }
    return contest
}

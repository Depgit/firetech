export const contestinitialState = []

export const contestreducer = (contest, action)=>{
    console.log("contest reducer page running .... ", contest,action);

    if(action.type==="CONTEST"){
        return [...contest, action.payload]
    }
    return contest
}

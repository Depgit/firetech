import React, { useEffect, useContext } from "react";
import Image from "./images/postimg.jpg";
import Like from "../images/like.svg";
import GreenLike from "../images/Greenlike.svg";
import Dislike from "../images/dislike.svg";
import RedDislike from "../images/redDislike.svg";
import Arl from "./images/arl.svg";
import "./postcard.css";
import { UserContext } from "../../App";

const PostCard = (props) => {
    const [data, setData] = React.useState(null);
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        setData({...props.postData});
    }, [props.postData]);

    const onlike = (e) => {
        console.log("like clicked",e);
        fetch('/api/posts/post/like/' + props.postData?._id, {
            method: "put",
            headers: {
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => { 
                if(result.message){
                    let tempData = {...data};
                    tempData.likes.push(state.username);
                    setData(tempData);
                }else{
                    alert(result.error);
                }
            }).catch(err => console.log(err));
    }
    const ondislike = (e) => {
        console.log("dislike clicked",e);
        fetch('/api/posts/post/dislike/' + props.postData?._id, {
            method: "put",
            headers: {
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => { 
                if(result.message){
                    let tempData = {...data};
                    tempData.dislikes.push(state.username);
                    setData(tempData);
                }else{
                    alert(result.error);
                }
            }).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card post-card">
                <img className="card-img-top post-img m-auto" src={data?.meme}></img>
                <div className="card-body">
                    <h6 className="card-title">Card title</h6>
                    <p>JavaScript creates an array by calling a specific
                        function on each element present in the parent array</p>
                    <div className="card-bm">
                        <div>
                            { data && data.likes?.indexOf(state?.username) > -1 ? 
                            <img className="like-img h-50" src={GreenLike}></img> :
                            <img className="like-img h-50" onClick={onlike} src={Like}></img>}
                            { data && data.dislikes?.indexOf(state?.username) > -1 ? 
                            <img className="like-img h-50" src={RedDislike}></img> :
                            <img className="like-img h-50" onClick={ondislike} src={Dislike}></img>}
                        </div>
                        {
                            !(props.comment) && 
                            <div><button className="button" type="submit">
                                <img className='' src={Arl}/>
                                <span className='p-1'>Comment</span>
                            </button></div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
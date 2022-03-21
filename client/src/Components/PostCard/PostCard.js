import React, { useEffect, useContext } from "react";
import Image from "./images/postimg.jpg";
import Like from "../images/like.svg";
import GreenLike from "../images/Greenlike.svg";
import RedDislike from "../images/redDislike.svg";
import Dislike from "../images/dislike.svg";
import Arl from "./images/arl.svg";
import "./postcard.css";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";



const PostCard = (props) => {
    const [data, setData] = React.useState(null);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        setData({ ...props.postData });
    }, [props.postData]);

    const todayTime = (time) =>{
        let date = new Date(time);
        let today = new Date();
        let timeDiff = Math.abs(today.getTime() - date.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let diffHour = Math.ceil(timeDiff/ (1000 * 3600));
        let diffMinute = Math.ceil(timeDiff / (1000* 60));
        if(diffMinute<60){
            return `${diffMinute} minute ago`;
        }else if(diffHour < 24){
            return `${diffHour} hour ago`;
        }else{
            return `${diffDays} days ago`;
        }
    }

    const onlike = (e) => {
        fetch('/api/posts/post/like/' + props.postData?._id, {
            method: "put",
            headers: {
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                if (result.message) {
                    let tempData = { ...data };
                    tempData.likes.push(state.username);
                    setData(tempData);
                } else {
                    alert(result.error);
                }
            }).catch(err => console.log(err));
    }
    const ondislike = (e) => {
        fetch('/api/posts/post/dislike/' + props.postData?._id, {
            method: "put",
            headers: {
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                if (result.message) {
                    let tempData = { ...data };
                    tempData.dislikes.push(state.username);
                    setData(tempData);
                } else {
                    alert(result.error);
                }
            }).catch(err => console.log(err));
    }

    return (
        <>
            <div className="card post-card">
                <img className="card-img-top post-img" src={data?.meme}></img>
                <div className="card-body">
                    {/* <h6 className="card-title">{data?.username}</h6> */}
                    <Link to={"/profile/" + data?.username} className="text-decoration-none text-dark " > <p className='card-title '
                    >{data?.username}</p>
                    </Link>
                    <p>Description to be added</p>
                    <div className="card-bm">
                        <div>
                            {data && data.likes?.indexOf(state?.username) > -1 ?
                                <img className="like-img h-50" src={GreenLike}></img> :
                                <img className="like-img h-50" onClick={onlike} src={Like}></img>}
                            {data && data.likes?.length - data.dislikes?.length}
                            {data && data.dislikes?.indexOf(state?.username) > -1 ?
                                <img className="like-img h-50" src={RedDislike}></img> :
                                <img className="like-img h-50" onClick={ondislike} src={Dislike}></img>}
                        </div>
                        {
                            !(props.comment) &&
                            <div><button className="button" type="submit">
                                <img className='' src={Arl} />
                                <span className='p-1'>Comment</span>
                            </button></div>
                        }
                    </div>
                    <span>{todayTime(data?.date)}</span>
                </div>
            </div>
        </>
    );
}

export default PostCard;
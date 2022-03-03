import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import PostCard from '../PostCard/PostCard';
import Like from "../images/like.svg";
import Dislike from "../images/dislike.svg";
import GreenLike from "../images/Greenlike.svg";
import RedDislike from "../images/redDislike.svg";


export default function Comment(props) {
    const [data, setdata] = React.useState([]);
    const [comment, setcomment] = React.useState('');
    const { state, dispatch } = useContext(UserContext);
    const [postData, setPostData] = React.useState(null);

    
    const postId = useParams();
    
    


    useEffect(() => {
      fetch('/api/posts/postid/' + postId.id, {
        method: "get",
        headers: {
            "x-access-token": localStorage.getItem('jwt')
        }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setPostData(data.posts);
        })
        
        fetch('/api/posts/comment/' + postId.id, {
            method: "get",
            headers: {
                "x-access-token": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => {
                
                setdata(data.comments);
            }
            )


    }, [])

    console.log(data);
    

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            setdata([...data, { username: state?.username, comment: e.target.value }]);
            setcomment('');
            fetch('/api/posts/comment/create/' +postId.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": localStorage.getItem('jwt'),
                },
                body: JSON.stringify({
                    comment: e.target.value,
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log("data", data);
                })
                .catch(err => console.log(err));
        }

    }
    const onlike = (e) => {
        console.log("liked");
    }
    const ondislike = (e) => {
        console.log("disliked");
    }
    return (
        <div style={{ marginTop: "60px" }}>
            <div className="w-50 m-auto" >
                <PostCard postData = {postData} comment={"hello"} />
            </div>
            <div className="row my-4">
                <h3 className='w-75 m-auto'>Comment</h3>
                <input type="text" className="form-control w-75 m-auto" placeholder="Comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    onKeyDown={handleSubmit}
                />
            </div>
            {
                data.map(item => {
                    return (
                        <div className="row w-75 m-auto">
                            {/* <div className='col-2'></div> */}
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title">{item.username}</h5>
                                            <p className="card-text">{item.comment}</p>
                                        </div>
                                        <div>
                                            { data && data.likes?.indexOf(state?.username) > -1 ? 
                                            <img className="like-img h-50" src={GreenLike}></img> :
                                            <img className="like-img h-50" onClick={onlike} src={Like}></img>}
                                            { data && data.dislikes?.indexOf(state?.username) > -1 ? 
                                            <img className="like-img h-50" src={RedDislike}></img> :
                                            <img className="like-img h-50" onClick={ondislike} src={Dislike}></img>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col-2'></div> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

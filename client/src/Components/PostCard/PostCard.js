import React from "react";
import Image from "./images/postimg.jpg";
import Like from "../images/like.svg";
import Dislike from "../images/dislike.svg";
import Arl from "./images/arl.svg";
import "./postcard.css";

const Home = (props) => {
    return (
        <>
            <div className="card post-card">
                <img className="card-img-top post-img m-auto" src={props.image}></img>
                <div className="card-body">
                    <h6 className="card-title">Card title</h6>
                    <p>JavaScript creates an array by calling a specific
                        function on each element present in the parent array</p>
                    <div className="card-bm">
                        <div>
                            <img className="h-50" src={Like} />
                            <img className="h-50" src={Dislike} />
                        </div>
                        <div><button className="button" type="submit">
                            <img className='' src={Arl}/>
                            <span className='p-1'>Comment</span>
                        </button></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
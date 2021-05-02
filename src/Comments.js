import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { allComments } from './settings'


const Comments = () => {

    let location = useLocation();

    let currentID = location.topicProp.topicID;
    let topicName = location.topicProp.topicName;
    let topicDescription = location.topicProp.topicDescription;


    const [filteredComments, setFilteredComments] = useState(null);


    useEffect(() => {
        fetchComments();
    }, [currentID]);


    const fetchComments = () => {
        fetch(allComments)
            .then(res => res.json())
            .then(data => {
                let filter = [];
                data.all.forEach(element => {
                    if (element.topicID === currentID) {
                        filter.push(element)
                    }
                });
                setFilteredComments(filter);
            })
    }


    return (
        <div className="commentPage">

            <div className="commentPage-title">
                <h1>{topicName} </h1>
                <strong>{topicDescription}</strong>
            </div>

            { filteredComments != null ?

                filteredComments.map( (data, index) =>
                    <div className="commentCard" key={index}>
                        <i><span className="comment-username">{data.userName} posted on {data.created}</span></i>
                        <p className="comment-text">{data.userComment}</p>
                        <img className="comment-img" src={data.imageID}></img>
                    </div>
                )
                : <span>fetching</span>
            }
        </div>
    );

}


export default Comments;
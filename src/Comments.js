import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom'

const imgURL = "http://localhost:8080/4SEM_Security/api/comments/4";


const Comments = () => {

    let location = useLocation();
    let currentID = location.topicProp.topicID;


    const [image, setImage] = useState("");
    const fetchImage = () => {
        fetch(imgURL).then(res => res.json()).then(data => {
            setImage(data);
        })
    }

    useEffect(() => {
        fetchImage()
    }, []);


    return (

        <div>
            <h1>Topic ID {currentID} </h1>
            <img height="200px" src={image.imageID}></img>
        </div>

    );
}


export default Comments;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Form, Button, Col } from "react-bootstrap";
import { allComments, deleteAComment, postAComment } from './settings'
import facade from "./apiFacade";
//import imageToBase64 from 'image-to-base64/browser';
// const imageToBase64 = require('image-to-base64');

const Comments = ({ isLoggedIn, isAdmin }) => {

    let location = useLocation();

    let currentID = location.topicProp.topicID;
    let topicName = location.topicProp.topicName;
    let topicDescription = location.topicProp.topicDescription;
    let fileReader;
    let finishedImage;


    function parseJwtName(name) {
        let tokenName = JSON.parse(atob(name.split('.')[1]));
        return tokenName.username;
    }

    const [filteredComments, setFilteredComments] = useState(null);
    const [fileName, setFileName] = useState("Choose image");

    useEffect(() => {
        fetchComments();
    }, [currentID]);


    const fetchComments = () => {
        fetch(allComments, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-access-token": "",
                "origin": "https://dat4semsecurity.surge.sh"
            }
        })
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


    const deleteComment = (id) => {
        let options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(deleteAComment + id, options)
            .then(res => {
                fetchComments();
            });
    }


    const editComment = (evt) => {
        evt.preventDefault();
        let id = evt.target.value;
        console.log(id)
    }


    const submitComment = (evt) => {
        evt.preventDefault();
        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'multipart/form-data',
                //'X-Requested-With': 'XMLHttpRequest',
                "x-access-token": "",
                "origin": "https://dat4semsecurity.surge.sh"
            },
            body: JSON.stringify({
                userComment: document.getElementById("Comment").value,
                topicID: currentID,
                userName: parseJwtName(facade.getToken()),
                imageID: finishedImage
            })
        }

        fetch(postAComment, options)
            .then(res => {
                fetchComments();
                document.getElementById("Comment").value = "";
                document.getElementById("image").value = "";
                setFileName('')
            });
    }


    //Store converted image in "Class" variable
    const handleFileRead = (e) => {
        finishedImage = fileReader.result;
    }
    

    //Onchange function - Begin converting the image as soon as it is uploaoded
    const handleFile = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsDataURL(file);
    }


    return (
        <div className="commentPage">

            <div className="commentPage-title">
                <h1>{topicName} </h1>
                <strong>{topicDescription}</strong>
            </div>

            { filteredComments != null ?

                filteredComments.map((data) =>
                    <div>
                        <div>
                            {(isAdmin) ?
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Are sure want to delete?')) {
                                        deleteComment(data.id)
                                    }
                                }
                                }
                                    variant="danger" type="submit" size="sm" className="mb-2 mr-2">
                                    Delete
                                </Button>
                                : ''}
                            {(isLoggedIn && (isLoggedIn && (data.userEmail === parseJwtName(facade.getToken())))) ?
                                <Button onClick={editComment} value={data.id} variant="warning" type="submit" size="sm" className="mb-2">
                                    edit
                                </Button>
                                : ''}
                        </div>
                        <div className="commentCard" key={data.id}>
                            <i><span className="comment-username">{data.userName} posted on {data.created}</span></i>
                            <p className="comment-text">{data.userComment}</p>
                            <img className="comment-img" src={data.imageID} alt=""></img>
                        </div>

                    </div>
                )
                : <span>fetching</span>
            }
            <div>
                {filteredComments && filteredComments.length === 0 ?
                    <div className="commentCard">
                        <p className="comment-text">No comments yet</p>
                        <p className="comment-text">Be the first to comment</p>
                    </div>
                    : ''}
            </div>


            <div>
                {(isLoggedIn) ? (

                    <div className="commentCard">
                        <Form label="" encType="multipart/form-data">
                            <textarea
                                className="form-control"
                                rows="5"
                                type="text"
                                id="Comment"
                                placeholder="Write a comment"
                            />
                            <Form.Row>
                                <Col xs="auto">
                                    <Button onClick={submitComment} variant="primary" type="submit" className="mt-2">
                                        Submit your comment
                                    </Button>
                                </Col>
                                <Col>
                                    <div className="input-group mt-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">
                                                Upload
                                            </span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="image"
                                                accept=".jpeg, .png, .jpg"
                                                aria-describedby="inputGroupFileAddon01"
                                                onInput={(e) => setFileName(e.target.files[0].name)}
                                                onChange={e => handleFile(e.target.files[0])}
                                            />
                                            <label className="custom-file-label" htmlFor="image">
                                                {fileName}
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                ) : (
                    <div>
                        Please login to comment
                    </div>
                )}
            </div>
        </div>
    );

}


export default Comments;
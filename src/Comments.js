import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Form, Button, Col } from "react-bootstrap";
import { allComments, deleteAComment, postAComment } from './settings'
import facade from "./apiFacade";
import imageToBase64 from 'image-to-base64/browser';
// const imageToBase64 = require('image-to-base64');

const Comments = ({ isLoggedIn, isAdmin }) => {

    let location = useLocation();

    let currentID = location.topicProp.topicID;
    let topicName = location.topicProp.topicName;
    let topicDescription = location.topicProp.topicDescription;

    console.log("islogC: " + isLoggedIn);
    console.log("isadmC: " + isAdmin);

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
                "origin": "http://localhost:3000"
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
        let imagePath = document.getElementById("image").value;
        //let imageFile = "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";
        let imageFile = "";

        // imageToBase64(imagePath) // Path to the image
        //     .then(
        //         (response) => {
        //             console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        //             imageFile = response
        //             // console.log(imageFile)
        //         }
        //     )
        //     .catch(
        //         (error) => {
        //             console.log(error); // Logs an error if there was one
        //         }
        //     )

        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Content-Type': 'multipart/form-data',
                //'X-Requested-With': 'XMLHttpRequest',
                "x-access-token": "",
                "origin": "http://localhost:3000"
            },
            body: JSON.stringify({
                userComment: document.getElementById("Comment").value,
                topicID: currentID,
                userName: parseJwtName(facade.getToken()),
                imageID: imageFile
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


    //console.log(parseJwtName(facade.getToken()))
    return (
        <div className="commentPage">

            <div className="commentPage-title">
                <h1>{topicName} </h1>
                <strong>{topicDescription}</strong>
            </div>

            { filteredComments != null ?

                filteredComments.map((data, index) =>
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
                        <div className="commentCard" key={index}>
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
                                                onChange={(e) => setFileName(e.target.files[0].name)}
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
// onChange={(e) => setFileName(e.target.files[0].name)}

export default Comments;
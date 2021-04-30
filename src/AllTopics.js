import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";


const imgURL = "http://localhost:8080/4SEM_Security/api/comments/4";

const AllTopics = () => {

    return (
        <div>
            <div className="topicContainer">
                <Navbar id="listbar">

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 1 }
                        }}>
                        Topic 1
                </NavLink>
                    <span>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow </span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 2 }
                        }}>
                        Topic 2
                </NavLink>
                    <span>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow </span>
                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 3 }
                        }}>
                        Topic 3
                </NavLink>
                    <span>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow </span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 4 }
                        }}>
                        Topic 4
                </NavLink>
                    <span>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow </span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 5 }
                        }}>
                        Topic 5
                </NavLink>
                    <span>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow </span>

                </Navbar>
            </div>
        </div>

    );
}


export default AllTopics;
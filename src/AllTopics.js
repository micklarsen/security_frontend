import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";


const imgURL = "http://localhost:8080/4SEM_Security/api/comments/4";




const AllTopics = () => {

    return (
        <div>
            <div className="topicContainer">

                <h1>Let's talk!</h1>

                <Navbar id="listbar">

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 1, topicName : "Politics", topicDescription: "A place to discuss politics! No fake news or the likes will be tolerated"  }
                        }}>
                        Topic 1: Politics
                </NavLink>
                    <span>A place to discuss politics! No fake news or the likes will be tolerated </span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 2, topicName: "Movies", topicDescription: "What's your favorite movie? This is the place to rate and discuss movies. " }
                        }}>
                        Topic 2: Movies
                </NavLink>
                    <span>What's your favorite movie? This is the place to rate and discuss movies. </span>
                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 3, topicName: "Games",  topicDescription: "Gamer eh? Here you can discuss games, new and old. No \"PC Masterrace\" in here - Everyone is welcome"  }
                        }}>
                        Topic 3: Games
                </NavLink>
                    <span>Gamer eh? Here you can discuss games, new and old. No "PC Masterrace" in here - Everyone is welcome </span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 4, topicName: "Animals", topicDescription: "Know an interesting fact about an animal? Maybe you just wanna post a picture of your buddy? This is the place" }
                        }}>
                        Topic 4: Animals
                </NavLink>
                    <span>Know an interesting fact about an animal? Maybe you just wanna post a picture of your buddy? This is the place</span>

                    <NavLink className="nav-link"
                        to={{
                            pathname: "/Comments",
                            topicProp: { topicID: 5, topicName: "Cars and Motorcycles", topicDescription: "This is the place to reminisce about the smell of burnt rubber. One, two (Three - Looking at you Reliant Robin) or four wheels - this is the place" }
                        }}>
                        Topic 5: Cars and motorcycles
                </NavLink>
                    <span>This is the place to reminisce about the smell of burnt rubber. Anywhere from one to four wheels - this is the place</span>

                </Navbar>
            </div>
        </div>

    );
}


export default AllTopics;
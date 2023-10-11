import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

// import {
//     Route,
//     useParams,
//     Routes,
//     BrowserRouter
// } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const sendText = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [sendTerm, setSendTerm] = useState('');
    const [hasChats, setHasChats] = useState(false);
    const [hasSessions, setHasSessions] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionId, setSessionId] = useState(1);
    const [userId, setUserId] = useState(localStorage.getItem('uid'));
    const [userImage, setUserImage] = useState("../../Images/TestingLogo.png");

    const [sessionDateTime, setSessionDateTime] = useState('');

    const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/user/${userId}`)
            .then((response) => {
                console.log('response: ', response);
                setUserImage(response.data.data[0].picture);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const fetchSessions = () => {
        axios
            .get(`${baseUrl}/api/user/${userId}/sessions?dateTime=${sessionDateTime}`)
            .then((response) => {
                console.log('response: ', response);
                setSessions(response.data.data);
                setHasSessions(true);
                console.log('sessions: ', sessions);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // get sessions 
    useEffect(() => {
        console.log('sessionDateTime: ', sessionDateTime)
        fetchSessions();
    }, [sessionDateTime]);

    useEffect(() => {
        setSessions(sessions);
        console.log('sessions in useEffect: ', sessions);
    }, [sessions]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSessionDateTime(e.target.value);
    }

    const fetchChats = () => {
        axios
            .get(`${baseUrl}/api/user/${userId}/${sessionId}/chats`)
            .then((response) => {
                console.log('response: ', response);
                setMessages(response.data.data);
                setHasChats(true);
                console.log('messages: ', messages);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // get chats by session

    useEffect(() => {
        setMessages(messages);
        console.log('messages in useEffect: ', messages);
    }, [messages]);

    useEffect(() => {
        fetchChats();
    }, [sessionId]);

    const handleSessionChange = (sid) => {
        setSessionId(sid)
        console.log('sessionId: ', sessionId);
    }

    useEffect(() => {
        setSessionId(sessionId);
        console.log('sessionId in useEffect: ', sessionId)
    })

    // send text by user 
    const handleSend = async (event) => {
        console.log('send button is clicked!');
        event.preventDefault();
        const requestBody = {
            sid: sessionId,
            chatText: sendTerm,
            by_user: 1
        };
        console.log(requestBody);
        axios
            .post(`${baseUrl}/api/user/${userId}/${sessionId}/chat`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                setSendTerm('');
                fetchChats();
            });
    }

    // create new session
    const handleNewSession = async (event) => {
        console.log('submit button is clicked!');
        event.preventDefault();
        const requestBody = {
            userId
        };
        console.log(requestBody);
        axios
            .post(`${baseUrl}/api/user/${userId}/sessions`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                fetchSessions();
            });
    }


    const handleSendChange = (e) => {
        setSendTerm(e.target.value);
    }

    const handleSendSubmit = () => {
        const newMessage = sendTerm;

        if (newMessage) {
            const isYellow = messages.length % 2 === 0;
            setMessages([...messages, { text: newMessage, isYellow }]);
            setSendTerm('');
        }
    }

    //the css of the smallest column 
    const smallestColumn = {
        backgroundColor: '#FAF7FF', // Set the background color to #E1D0FC
        minHeight: '100vh', // Match the screen height
    };

    const buttonWrapperStyle = {
        marginTop: '10px',
        position: 'relative',
        paddingBottom: '100%',  // Create a square shape (height equals width)
    };

    const LogobuttonStyle = {
        backgroundColor: '#9356F6', // Set the background color
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',  // Make the button width 100% of the wrapper
    };

    const ChatbuttonStyle = {
        backgroundColor: '#9356F6', // Set the background color
        position: 'absolute',
        top: '10%',              // Adjust vertical position as needed
        left: '10%',             // Adjust horizontal position as needed
        width: '80%',            // Make the button larger by reducing the width
        height: '80%',           // Maintain the button as a square
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const ProfilebuttonStyle = {
        backgroundColor: 'transparent', // Set the background color
        position: 'absolute',
        borderColor: '#9356F6',
        borderRadius: '50%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',  // Make the button width 100% of the wrapper
    };

    const bottomDiv = {
        position: 'absolute',
        bottom: 90,
        left: 15,
        width: '3.5%',
    };

    const bottomDivProfile = {
        position: 'absolute',
        bottom: 15,
        left: 15,
        width: '3.5%',
    };

    //css of second column
    const SummarizeChatsColumn = {
        backgroundColor: '#ECE1FF', // Set the background color to #E1D0FC
        minHeight: '100vh', // Match the screen height
        padding: '10px'
    };

    const searchComponent = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%', // Full width based on the column width
        marginTop: '15px'
    };

    const inputStyle = {
        flex: 1, // Let the input expand to take available space
        borderRadius: '15px', // Rounded corners
        padding: '4px', // Add padding for better styling
    };

    const searchButton = {
        backgroundColor: '#AC79FF',
        padding: '0px 10px',
        margin: '0px 10px',
        borderRadius: '5px'
    }

    const randomBarStyle = {
        backgroundColor: '#D0B2FF', // Set the background color to yellow
        height: '3px', // Define the height of the bar
        width: '100%', // Full width
        marginTop: '15px'
    };

    const NewChatButton = {
        backgroundColor: '#AC79FF',
        borderRadius: '10px',
        width: '100%',
        marginTop: '15px',
        padding: '10px'
    }

    const scrollViewSession = {
        overflowY: 'scroll', // Enable vertical scrolling
        maxHeight: '515px', // Set a maximum height for the scrollable area
        flex: 1,
        width: '100%',
        padding: '5px',
        marginTop: '15px'
    }

    const ExistingSession = {
        backgroundColor: '#FAF7FF',
        padding: '7px',
        borderRadius: '7px',
        margin: '20px 0px'
    }

    //css of the third (biggest) column 
    const projectNameDiv = {
        width: '100%',
        backgroundColor: '#C1A5EE',
        textAlign: 'center',
        padding: '8px 0px 3px 0px'
    }

    const bottomBarDivStyle = {
        height: '60px',
        width: '100%',
        border: '2px solid #B4B4B4'
    };

    const writeComponent = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%', // Full width based on the column width
        marginTop: '10px'
    };

    const scrollViewStyle = {
        overflowY: 'scroll', // Enable vertical scrolling
        maxHeight: '600px', // Set a maximum height for the scrollable area
        flex: 1,
        width: '100%',
        padding: '20px',

    }

    const contentStyle = {
        width: '100%',
        textAlign: 'right',
    };

    const grayContentStyle = {
        width: '100%',
        textAlign: 'left',
    };

    const messageStyle = {
        padding: '5px',
        margin: '5px 0', // Add vertical margin to separate messages
    };

    const aichatStyle = {
        marginTop: '15px',
        marginBottom: '15px',
        marginRight: 'auto',
        textAlign: 'justify',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#A9C8E8'
    };

    const userchatStyle = {
        marginTop: '15px',
        marginBottom: '15px',
        marginLeft: 'auto',
        textAlign: 'justify',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#FCE1A4'
    };


    const yellowBackgroundStyle = {
        backgroundColor: 'yellow', // Yellow background for each message's text length
        display: 'inline-block',
        padding: '10px',
        borderRadius: '10px',
        marginLeft: '125px',
        textAlign: 'left'
    };

    const grayBackgroundStyle = {
        backgroundColor: 'gray', // Yellow background for each message's text length
        display: 'inline-block',
        padding: '10px',
        borderRadius: '10px',
        marginRight: '125px',
        textAlign: 'left',
    };

    const messagesAreaStyle = {
        height: '100%',
        backgroundColor: '#E1D0FC',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '0', // Remove default margin
        padding: '0', // Remove default padding
    };


    const textInputStyle = {
        flex: 1, // Let the input expand to take available space
        borderRadius: '5px', // Rounded corners
        padding: '7px', // Add padding for better styling
        marginLeft: '15px',
        overflowY: 'scroll'
    };

    const sendButton = {
        backgroundColor: '#AC79FF',
        padding: '0px 10px',
        margin: '0px 10px',
        borderRadius: '5px'
    }

    return (
        <div id="homepage">
            <div className='frame container-fluid'>
                <div className='row'>
                    <div className='col-lg-4'>
                        <div className='row'>
                            <div className='col-lg-2' style={smallestColumn}>
                                <div style={buttonWrapperStyle}>
                                    <Button variant="primary" style={LogobuttonStyle}>
                                        <Image src={require("../../Images/TestingLogo.png")} fluid />
                                    </Button>
                                </div>

                                <div style={buttonWrapperStyle}>
                                    <Button variant="primary" style={ChatbuttonStyle}>
                                        <Image src={require("../../Images/TestingLogo.png")} fluid />
                                    </Button>
                                </div>

                                <div style={bottomDivProfile}>
                                    <div style={buttonWrapperStyle}>
                                        <Button variant="primary" style={ChatbuttonStyle}>
                                            <Image src={require("../../Images/TestingLogo.png")} fluid />
                                        </Button>
                                    </div>
                                    <div style={buttonWrapperStyle}>
                                        <Button variant="primary" style={ProfilebuttonStyle}>
                                            <Image src={userImage} fluid />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-10' style={SummarizeChatsColumn}>
                                <h3>Chats</h3>
                                <div className='searchComponent' style={searchComponent}>
                                    <input
                                        type="text"
                                        placeholder="Search by date..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={randomBarStyle}></div>
                                <button style={NewChatButton} onClick={handleNewSession}>+ New Chat</button>
                                <div style={scrollViewSession}>
                                    {sessions.map((session) => {
                                        let formatDate = new Date(session.startTime);
                                        return (
                                            <div className='bg-white m-2 p-2' key={session.sid} onClick={() => handleSessionChange(session.sid)}>
                                                <p>ID: {session.sid}</p>
                                                <p>Name: {formatDate.getDate() + "-" + (formatDate.getMonth() + 1) + "-" + formatDate.getFullYear() + " " + formatDate.getHours() + ":" + formatDate.getMinutes() + ":" + formatDate.getSeconds()}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8' style={messagesAreaStyle}>
                        <div className='messagePopUpArea' style={scrollViewStyle}>
                            <div style={messages.length % 2 === 0 ? grayContentStyle : contentStyle}>
                                {messages.map((message) => {
                                    let isUser = message.byUser;
                                    let width = (message.message.length < 150) ? '35%' : '75%';
                                    return (
                                        <div key={message.mid} style={messageStyle}>
                                            <div style={{ ...(isUser == 1) ? userchatStyle : aichatStyle, width: width }}>
                                                {message.message}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='bottomBarDiv' style={bottomBarDivStyle}>
                            <div className='searchComponent' style={writeComponent}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={sendTerm}
                                    onChange={handleSendChange}
                                    style={textInputStyle}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault(); // Prevent the default form submission
                                            event.stopPropagation(); // Stop the event from propagating up the DOM tree
                                            sendText.current.click(); // Trigger the click event on the sendText button
                                        }
                                    }}
                                />
                                <button ref={sendText} onClick={handleSend} style={sendButton}>
                                    Send
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default App; 
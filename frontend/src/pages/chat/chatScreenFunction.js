import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import '../../css/Loadingtext.css';

// import {
//     Route,
//     useParams,
//     Routes,
//     BrowserRouter
// } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const sendText = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(0);
    const [temporaryMessage, setTemporaryMessage] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sendTerm, setSendTerm] = useState('');
    const [hasChats, setHasChats] = useState(false);
    const [hasSessions, setHasSessions] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionId, setSessionId] = useState();
    const [messageId, setMessageId] = useState();
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

    useEffect(() => {
        fetchChats(sessionId);
    }, [sessionId]);

    useEffect(() => {
        console.log("messages: ", messages);
    }, [messages])

    useEffect(() => {
        console.log("is Loading: ", isLoading);
    }, [isLoading]);

    // get sessions 
    useEffect(() => {
        console.log('sessionDateTime: ', sessionDateTime)
        fetchSessions();
    }, [sessionDateTime]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSessionDateTime(e.target.value);
    }

    const fetchChats = (sid) => {
        axios
            .get(`${baseUrl}/api/user/${userId}/${(sessionId == undefined) ? sid : sessionId}/chats`)
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

    const handleSessionChange = (sid) => {
        setIsSelected(sid);
        setSessionId(sid);
        setSendTerm('');
        console.log('sessionId: ', sessionId);
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
                console.log("kfdasjkfjsdakfjsadkfjsdak");
                console.log(response);
                setSessionId(response.data.data);
                setIsSelected(response.data.data);
                fetchSessions();
                handleSend(event, response.data.data);
            });
    }

    const handleNewSessionOnChat = async (event) => {
        console.log('send button is clicked!');
        console.log('sessionId: ', sessionId);

        if (!sessionId) {
            handleNewSession(event);
        }
        else {
            handleSend(event, undefined);
        }
        handleSessionChange(sessionId);
        console.log('sessionId in handleSend: ', sessionId);
    }

    // send text by user 
    const handleSend = async (event, sid) => {
        console.log('send button is clicked!');
        setTemporaryMessage([...messages, { sid: ((sessionId == undefined) ? sid : sessionId), message: sendTerm, byUser: 1 }, { sid: ((sessionId == undefined) ? sid : sessionId), message: "animated", byUser: 0 }]);
        setSendTerm('');
        setIsLoading(true);
        event.preventDefault();
        const userRequestBody = {
            sid: (sessionId == undefined) ? sid : sessionId,
            chatText: sendTerm,
        };
        console.log(sessionId);
        console.log(messages);

        console.log("User Body: ", userRequestBody);
        axios
            .post(`${baseUrl}/api/user/${userId}/${(sessionId == undefined) ? sid : sessionId}/chat`, userRequestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                setMessageId(response.data);
                console.log('messageId: ', messageId)
                setSendTerm('');
                fetchChats(sid);
            });

        const aiRequestBody = {
            sid: sessionId,
            chatText: sendTerm,
            messageId: messageId
        };
        console.log(aiRequestBody);
        axios
            .post(`${baseUrl}/api/user/${userId}/${(sessionId == undefined) ? sid : sessionId}/chat/ai`, aiRequestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setIsLoading(false);
                console.log(response);
                setSendTerm('');
                fetchChats(sid);
            });
    }

    const handleNewSessionAndSendChat = (event) => {
        handleNewSessionOnChat(event);
    }

    const handleSendChange = (e) => {
        setSendTerm(e.target.value);
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
        backgroundColor: 'transparent', // Set the background color
        position: 'absolute',
        border: 'none',
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

    const SettingbuttonStyle = {
        backgroundColor: '#9356F6', // Set the background color
        position: 'absolute',
        top: '10%',              // Adjust vertical position as needed
        left: '10%',             // Adjust horizontal position as needed
        width: '80%',            // Make the button larger by reducing the width
        height: '80%',           // Maintain the button as a square
        display: 'flex',
        justifyContent: 'center',
        fontSize: '25px',
        border: 'none',
        alignItems: 'center'
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
        borderRadius: '10px', // Rounded corners
        padding: '4px', // Add padding for better styling
        fontSize: '14px',
        textIndent: '5px'
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
        backgroundColor: 'transparent',
        borderRadius: '10px',
        width: '100%',
        marginTop: '15px',
        padding: '10px',
        borderColor: '#AC79FF',
        borderWidth: 2
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

    const sessionStyle = {
        textAlign: 'left',
        padding: '10px',
        textIndent: '5px',
        cursor: 'pointer',
        borderRadius: '7px',
        marginBottom: '10px'
    };

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
                                        <i style={{ fontSize: '25px' }} className="fa-solid fa-message"></i>
                                    </Button>
                                </div>

                                <div style={bottomDivProfile}>
                                    <div style={buttonWrapperStyle}>
                                        <Button variant="primary" style={SettingbuttonStyle}>
                                            <i className="fa-solid fa-gear"></i>
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
                                <h3 style={{ marginLeft: '5px' }}>Chats</h3>
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
                                        let backgroundColor = (session.sid == isSelected) ? 'rgba(100,100,100,0.1)' : '';
                                        return (
                                            <div style={{ ...sessionStyle, backgroundColor: backgroundColor }} key={session.sid} onClick={() => handleSessionChange(session.sid)}>
                                                <p style={{ margin: 0 }}>
                                                    <i style={{ fontSize: '16px', verticalAlign: 'middle' }} className="fa-regular fa-message"></i>
                                                    &ensp;&nbsp;Session {session.sid}&ensp;({formatDate.getDate() + "-" + (formatDate.getMonth() + 1) + "-" + formatDate.getFullYear() + " " + formatDate.getHours() + ":" + formatDate.getMinutes() + ":" + formatDate.getSeconds()})
                                                </p>
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
                                {
                                    isLoading ?
                                        (temporaryMessage.map((message) => {
                                            let isUser = message.byUser;
                                            let messageLength = message.message.length;
                                            let customWidth = 0;
                                            if (messageLength < 10) {
                                                customWidth = 12;
                                            }
                                            else if (messageLength < 15) {
                                                customWidth = 15;
                                            }
                                            else {
                                                customWidth = (messageLength * 75) / 120;
                                                if (customWidth > 75) {
                                                    customWidth = 75;
                                                }
                                            }

                                            let width = customWidth + "%";
                                            let messageText = message.message;
                                            return (
                                                <div key={message.mid} style={messageStyle}>
                                                    <div style={{ ...(isUser == 1) ? userchatStyle : aichatStyle, width: width }}>
                                                        {(messageText == "animated") ?
                                                            (
                                                                <div className='loading-text'>
                                                                    <span style={{ fontSize: '50px' }} className="dot">.</span>
                                                                    <span style={{ fontSize: '50px' }} className="dot">.</span>
                                                                    <span style={{ fontSize: '50px' }} className="dot">.</span>
                                                                </div>
                                                            ) : messageText}
                                                    </div>
                                                </div>
                                            )
                                        }))
                                        : (messages.map((message) => {
                                            let isUser = message.byUser;
                                            let messageLength = message.message.length;
                                            let customWidth = 0;
                                            if (messageLength < 10) {
                                                customWidth = 12;
                                            }
                                            else if (messageLength < 15) {
                                                customWidth = 15;
                                            }
                                            else {
                                                customWidth = (messageLength * 75) / 120;
                                                if (customWidth > 75) {
                                                    customWidth = 75;
                                                }
                                            }

                                            let width = customWidth + "%";
                                            let messageText = message.message;
                                            return (
                                                <div key={message.mid} style={messageStyle}>
                                                    <div style={{ ...(isUser == 1) ? userchatStyle : aichatStyle, width: width }}>
                                                        {messageText}
                                                    </div>
                                                </div>
                                            )
                                        }))
                                }
                            </div>

                        </div>
                        <div className='bottomBarDiv' style={bottomBarDivStyle}>
                            <div className='searchComponent' style={writeComponent}>
                                <input
                                    type="text"
                                    placeholder="Send a message"
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
                                <button ref={sendText} onClick={handleNewSessionAndSendChat} style={sendButton}>
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
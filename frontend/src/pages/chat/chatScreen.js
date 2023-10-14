import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import '../../css/chatscreenstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sessionFunc from '../../functions/sessionFunctions.js';
import messageFunc from '../../functions/messageFunctions.js';

export default function ChatScreen(props) {

    const navigate = useNavigate();

    const chatDivRef = useRef(null);
    const chatTextRef = useRef(null);
    const chatIcon = useRef(null);
    const chatInput = useRef(null);
    const chatSend = useRef(null);
    const chatCount = useRef(null);

    const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userImage, setUserImage] = useState('');
    const [isSelected, setIsSelected] = useState(-1);
    const [session, setSession] = useState([]);
    const [message, setMessage] = useState([]);
    const [sendTerm, setSendTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [chatRightOffset, setChatRightOffset] = useState(0);
    const [isSessionEnd, setIsSessionEnd] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSessions = async () => {
        try {
            const data = await sessionFunc.getSessions(baseURL, token, searchTerm);
            console.log("session data: ", data);
            setSession(data.data);
        }
        catch (error) {
            console.error(error);
            alert("Error in getting sessions!");
        }
    };

    const fetchMessages = async () => {
        try {
            const data = await messageFunc.getMessages(baseURL, token, session[isSelected].sid);
            console.log("message data: ", data);
            setMessage(data.data);
        }
        catch (error) {
            console.error(error);
            alert("Error in getting chats!");
        }
    }

    useEffect(() => {
        axios
            .get(`${baseURL}/api/user`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                console.log('user profile response: ', response);
                setUserImage(response.data.data[0].picture);
                fetchSessions();
            })
            .catch(error => {
                console.error(error);
                if (error.response.data.message === "unauthorized access") {
                    alert("Please Sign In First!");
                    navigate('/signin', { replace: true });
                    window.location.pathname = "/signin";
                }
            });
    }, []);

    useEffect(() => {
        if (chatTextRef.current) {
            chatTextRef.current.scrollTop = chatTextRef.current.scrollHeight;
        }
    }, [message]);

    useEffect(() => {
        if (chatDivRef.current) {
            setChatRightOffset((chatDivRef.current.offsetWidth - 700) / 2);
        }
    }, [chatDivRef]);

    useEffect(() => {
        if (isSelected >= 0) {
            fetchMessages();

            const date = new Date();
            const sessionEndDate = new Date(session[isSelected].endTime);
            if ((sessionEndDate - date) < 0) {
                setIsSessionEnd(true);
            }
            else {
                setIsSessionEnd(false);
            }
        }
        else {
            fetchSessions();
        }
        console.log("isSelected: ", isSelected);
    }, [isSelected]);

    useEffect(() => {
        setIsSelected(previous => previous - 1);
        setMessage([]);
        setIsSessionEnd(true);
        fetchSessions();
    }, [searchTerm]);

    return (
        <div className="body">
            <div className='nav-div'>
                <div className='top-nav'>
                    <div className='logo-div'>
                        <Button style={logoButtonStyle}>
                            <Image src={require("../../Images/TestingLogo.png")} fluid />
                        </Button>
                    </div>
                    <div className='icon-div'>
                        <Button style={chaticonButtonStyle}>
                            <i className="fa-solid fa-message fa-flip-horizontal"></i>
                        </Button>
                    </div>
                </div>
                <div className='bottom-nav'>
                    <div className='icon-div'>
                        <Button style={chaticonButtonStyle}>
                            <i className="fa-solid fa-gear"></i>
                        </Button>
                    </div>
                    <div className='profile-div'>
                        <Button style={logoButtonStyle}>
                            <Image style={{ borderRadius: '15px' }} src={userImage} fluid />
                        </Button>
                    </div>
                </div>
            </div>
            <div className='session-div'>
                <div className='session-top-div'>
                    <h4 style={chatHeaderStyle}>Chats</h4>
                    <input type="text" style={chatSearchInputStyle}
                        placeholder='Search by date...'
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                    <hr style={barStyle} />
                    <Button style={newChatButtonStyle}
                        onClick={async () => {
                            const result = await sessionFunc.createNewSession(baseURL, token);
                            console.log("session create result: ", result);
                            if (result.ok == true && result.statusCode == 200) {
                                setIsSelected(previous => previous - 1);
                                setIsSessionEnd(true);
                            }
                        }}
                    >+ New Session</Button>
                </div>
                <div className='session-list-div'>
                    {
                        session.map((ses, index) => {

                            console.log("session map: ", ses);
                            let formatDate = new Date(ses.startTime);

                            let activeBackgroundStyle = "";
                            if (isSelected >= 0) {
                                activeBackgroundStyle = (ses.sid == session[isSelected].sid) ? "rgb(216, 205, 235)" : "";
                            }

                            return (
                                <div className='session-list' style={{ backgroundColor: activeBackgroundStyle }} key={ses.sid} onClick={() => { setIsSelected(index) }}>
                                    <i style={{ verticalAlign: 'middle' }} className="fa-regular fa-message"></i>
                                    <label style={{ marginLeft: '8px' }}>Session {session.length - index} ({sessionFunc.formatSessionDate(formatDate)})</label>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div ref={chatDivRef} className='chat-div'>
                <div className='chat-text' ref={chatTextRef}>
                    {
                        message.map((message) => {

                            let styleName = (message.byUser == 1) ? 'chat-bubble right' : 'chat-bubble left';
                            let animatedStyle = {
                                width: '90px'
                            }
                            return (
                                <div className={styleName} style={(message.message == "animated" && message.byUser == 0) ? animatedStyle : {}} key={message.mid}>
                                    {
                                        (message.message == "animated" && message.byUser == 0)
                                            ? <div className="dot-flashing"></div>
                                            : <label>{message.message}</label>
                                    }
                                </div>
                            );
                        })
                    }
                    {
                        (isSessionEnd && isSelected >= 0) ?
                            (
                                <label>Session ended at {sessionFunc.formatSessionDate(session[isSelected].endTime)}</label>
                            )
                            : ""
                    }
                </div>
                {(isSessionEnd == false) ?
                    (<div ref={chatSend} className='chat-send'
                        style={{ right: chatRightOffset }}>
                        <textarea maxLength={1000} ref={chatInput} className='chat-input' value={sendTerm} disabled={isLoading}
                            onChange={(event) => {

                                let text = event.target.value;
                                let textLength = text.trim().length;
                                setSendTerm(text);
                                console.log(textLength);

                                if (chatInput.current && chatSend.current && chatCount.current) {
                                    chatInput.current.style.height = "0";
                                    chatInput.current.style.height = chatInput.current.scrollHeight + "px";
                                    chatInput.current.scrollTop = chatInput.current.scrollHeight;
                                    chatSend.current.style.height = chatInput.current.style.height;
                                    if (chatInput.current.scrollHeight < 55) {
                                        chatCount.current.style.visibility = "hidden";
                                    }
                                    else {
                                        chatCount.current.style.visibility = "visible";
                                    }
                                    chatCount.current.innerHTML = textLength + "/" + 1000;
                                }

                                if (textLength > 0) {
                                    chatIcon.current.style.color = "rgba(0, 0, 0, 1)";
                                }
                                else {
                                    chatIcon.current.style.color = "rgba(0, 0, 0, 0.2)";
                                }
                            }}
                            placeholder='Rant something'
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    chatIcon.current.click();
                                }
                            }}
                        ></textarea>
                        <i ref={chatIcon}
                            onClick={async () => {
                                let mid = message.length;
                                if (mid > 0) {
                                    mid = message[message.length - 1].mid;
                                }
                                mid += 1;
                                setMessage([...message, { message: sendTerm, mid: mid, byUser: 1, sid: session[isSelected].sid }, { message: "animated", mid: mid + 1, byUser: 0, sid: session[isSelected].sid }]);

                                let text = sendTerm.trim();
                                setIsLoading(true);
                                setSendTerm('');
                                chatCount.current.style.visibility = "hidden";
                                chatCount.current.innerHTML = "0/1000";
                                chatIcon.current.style.color = "rgba(0, 0, 0, 0.2)";
                                chatInput.current.style.height = "50px";
                                chatInput.current.scrollTop = 50;
                                chatSend.current.style.height = chatInput.current.style.height;

                                let result = await messageFunc.sendMessages(baseURL, token, text, session[isSelected].sid);
                                if (result.ok == true && result.statusCode == 200) {
                                    result = await messageFunc.getAIMessage(baseURL, token, text, result.data, session[isSelected].sid);
                                }
                                setIsLoading(false);
                                fetchMessages();
                            }}
                            className="fa-solid fa-arrow-right-to-bracket chat-icon"></i>
                        <label ref={chatCount} className='chat-count'>0/1000</label>
                    </div>)
                    : ""}
            </div>
        </div >
    );
}

const logoButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%'
};

const chaticonButtonStyle = {
    backgroundColor: '#9356F6',
    border: 'none',
    width: '100%',
    textAlign: 'center'
}

const chatHeaderStyle = {
    marginLeft: '10px',
    marginTop: '10px',
    fontSize: '26px',
    letterSpacing: '0.9px',
    marginBottom: '15px'
}

const chatSearchInputStyle = {
    height: '30px',
    fontSize: '14px',
    padding: '7px',
    width: '95%',
    margin: '0 auto',
    borderRadius: '9px',
    outline: 'none',
    marginBottom: '10px'
}

const barStyle = {
    backgroundColor: 'rgb(128, 98, 175)',
    height: '4px',
    width: '95%',
    margin: '0 auto',
    border: 'none'
};

const newChatButtonStyle = {
    textAlign: 'center',
    margin: '10px auto',
    fontSize: '15px',
    backgroundColor: 'transparent',
    borderColor: '#AC79FF',
    borderWidth: 2,
    width: '95%',
    borderRadius: '10px',
    color: 'black'
}
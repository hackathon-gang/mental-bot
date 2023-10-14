import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import '../../index.css';
import axios from 'axios';

export default function SigninScreen(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/chat');
        }
    }, []);

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log("This is profile");
                        console.log(res.data);
                        axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user`, { ...res.data, method: "google" })
                            .then((response) => {
                                console.log(response);
                                localStorage.setItem('token', response.data.token);
                                navigate('/chat');
                            })
                            .catch((error) => {
                                console.log(error);
                                alert('Sign In failed!');
                            });

                    })
                    .catch((err) => { console.log(err); console.log(user); console.log("This is an error") });
            }
        },
        [user]
    );

    return (
        <div class="flex items-center justify-center h-screen bg-[#f0f9ff]">
            <div class="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                <div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div class="rounded-xl bg-white shadow-xl">
                        <div class="p-6 sm:p-16">
                            <div class="space-y-4">
                                <img src={require("../../Images/TestingLogo.png")} loading="lazy" class="w-10" alt="Logo" />
                                <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Sign in to start using <br /> Mooodify!</h2>
                            </div>
                            <div class="mt-16 grid space-y-3">
                                <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                            hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100" onClick={() => login()}>
                                    <div class="relative flex items-center space-x-4 justify-center">
                                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo" />
                                        <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                    </div>
                                </button>
                            </div>
                            <div class="mt-16 space-y-3 text-gray-600 text-center sm:-mb-8">
                                <p class="text-xs">By proceeding, you agree to our <a href="#" class="underline">Terms of Use</a> and confirm you have read our <a href="#" class="underline">Privacy and Cookie Statement</a>.</p>
                                <p class="text-xs">This site is protected by reCAPTCHA and the <a href="#" class="underline">Google Privacy Policy</a> and <a href="#" class="underline">Terms of Service</a> apply.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
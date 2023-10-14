import React from 'react';
import {
  Route,
  useParams,
  Routes,
  BrowserRouter
} from "react-router-dom";

import HomeScreen from './pages/home/homeScreen';
import ChatScreen from './pages/chat/chatScreen';
import SigninScreen from './pages/user/signinScreen';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>

            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



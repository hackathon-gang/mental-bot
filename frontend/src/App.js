import React from 'react';
import {
  Route,
  useParams,
  Routes,
  BrowserRouter
} from "react-router-dom";

import HomeScreen from './pages/home/homeScreen';
import ChatScreenFunction from './pages/chat/chatScreenFunction';
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

            <Route exact path="/" element={<SigninScreen />} />
            <Route path="/chat" element={<ChatScreenFunction />} />
            {/* <Route path="/signin" element={<SigninScreen />} /> */}
            <Route path="*" element={<SigninScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



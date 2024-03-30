import "./App.css";
import FindPw from "./pages/start/FindPw";
import Login from "./pages/start/Login";
import LoginNext from "./pages/start/LoginNext";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/start/Signup";
import Main from "./pages/main/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/email/login" element={<LoginNext />} />
                    <Route path="/email/signup" element={<Signup />} />
                    <Route path="/email/findPw" element={<FindPw />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

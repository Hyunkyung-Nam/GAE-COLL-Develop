import { Routes, Route, BrowserRouter } from "react-router-dom";

import FindPw from "./pages/start/FindPw";
import Login from "./pages/start/Login";
import LoginNext from "./pages/start/LoginNext";
import Signup from "./pages/start/Signup";
import Main from "./pages/main/Main";
import LoginBox from "./pages/start/LoginBox";

import "./App.css";
import Header from "./components/common/Header";
import CreateProject from "./pages/main/CreateProject";
import BoardMainBox from "./pages/project/BoardMainBox";
import { useSelector } from "react-redux";
import { rooteState } from "./store";

function App() {
    const { selectedProject } = useSelector((state: rooteState) => {
        return state;
    });
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <>
                                    <Header />
                                    <Main />
                                </>
                            }
                        />

                        <Route path="/start" element={<LoginBox />}>
                            <Route index element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<LoginNext />} />
                            <Route path="findPW" element={<FindPw />} />
                        </Route>
                        <Route
                            path="/createProject"
                            element={
                                <>
                                    <Header title="프로젝트생성" /> <CreateProject />
                                </>
                            }
                        />
                        <Route
                            path="/board"
                            element={
                                <>
                                    <Header project={selectedProject} /> <BoardMainBox />
                                </>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

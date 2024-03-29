import React, { useEffect, useState } from "react";
import "../../style/common.scss";
import "../../style/login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState("");
    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputId(e.target.value);
        return;
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter") {
            handleLogin();
        }
        return;
    };
    const handleLogin = () => {
        console.log("hi");
        navigate("/email/signup");
        return;
    };
    return (
        <main>
            <div className="app-title">
                <span className="app-title-large">개</span>
                린이
                <span className="app-title-large">콜</span>라보
            </div>
            <div>
                <div className="email-login">
                    <label htmlFor="input-email">이메일</label>
                    <input
                        id="input-email"
                        type="text"
                        placeholder="이메일을 입력하세요"
                        value={inputId}
                        onChange={(e) => handleInputText(e)}
                        onKeyDown={(e) => handleEnter(e)}
                        onBlur={handleLogin}
                    />
                    <br />
                    <button onClick={handleLogin}>개콜 시작하기</button>
                </div>{" "}
            </div>
            <div className="social-login">
                <div className="google-login">
                    <img src="/img/google-login.png" alt="구글 로그인" />
                </div>
                <div className="kakao-login">
                    <img src="/img/kakao-login.png" alt="카카오 로그인" />
                </div>
            </div>
        </main>
    );
}

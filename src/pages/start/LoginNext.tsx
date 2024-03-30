import React, { useEffect, useRef, useState } from "react";
import "../../style/common.scss";
import "../../style/login.module.scss";
import { Link } from "react-router-dom";

export default function LoginNext() {
    const [inputId, setInputId] = useState("");
    const pwInput = useRef<HTMLInputElement>(null);
    useEffect(() => {
        pwInput.current?.focus();
    });
    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputId(e.target.value);
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    const handleLogin = () => {
        console.log("hi");
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
                    <div className="main-title">로그인</div>

                    <label htmlFor="input-email">비밀번호</label>
                    <input
                        ref={pwInput}
                        id="input-email"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={inputId}
                        onChange={(e) => handleInputText(e)}
                        onKeyDown={(e) => handleEnter(e)}
                        onBlur={handleLogin}
                    />
                    <br />
                    <button onClick={handleLogin}>로그인</button>
                    <Link to="/email/findPw">
                        <span className="find-pw">비밀번호를 잊으셨나요?</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}

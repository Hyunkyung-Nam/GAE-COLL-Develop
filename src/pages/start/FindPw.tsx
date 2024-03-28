import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../../style/common.scss";
import "../../style/login.scss";

export default function FindPw() {
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
            <div className="bottom-box">
                <div className="main-title">비밀번호 찾기</div>
                <div className="find-email">
                    <div>
                        <label htmlFor="find-email">이메일</label>
                        <br />
                        <input
                            ref={pwInput}
                            id="find-email"
                            type="password"
                            placeholder="이메일을 입력하세요"
                            value={inputId}
                            onChange={(e) => handleInputText(e)}
                            onKeyDown={(e) => handleEnter(e)}
                            onBlur={handleLogin}
                        />
                        <button onClick={handleLogin}>메일확인</button>
                    </div>
                    <div>
                        <label htmlFor="check-auth-num">인증번호</label>
                        <br />

                        <input
                            ref={pwInput}
                            id="check-auth-num"
                            type="number"
                            placeholder="인증번호를 입력하세요"
                            value={inputId}
                            onChange={(e) => handleInputText(e)}
                            onKeyDown={(e) => handleEnter(e)}
                            onBlur={handleLogin}
                        />
                        <button onClick={handleLogin} className="disable">
                            인증확인
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

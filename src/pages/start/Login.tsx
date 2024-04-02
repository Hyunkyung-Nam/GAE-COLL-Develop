import React, { useEffect, useState } from "react";
import "../../style/common.scss";
import styles from "../../style/login.module.scss";
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
        navigate("/start/login");
        return;
    };
    return (
        <div>
            <div className={styles.emailLogin}>
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
            </div>
            <div className={styles.socialLogin}>
                <div className={styles.googleLogin}>
                    <img src="/img/google-login.png" alt="구글 로그인" />
                </div>
                <div className={styles.kakaoLogin}>
                    <img src="/img/kakao-login.png" alt="카카오 로그인" />
                </div>
            </div>
        </div>
    );
}

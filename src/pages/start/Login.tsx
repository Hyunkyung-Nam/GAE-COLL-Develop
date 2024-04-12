import React, { useEffect, useRef, useState } from "react";
import "../../style/common.scss";
import styles from "../../style/login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
interface props {
    setInputId: React.Dispatch<React.SetStateAction<string>>;
    inputId: string;
    inputRef: React.RefObject<HTMLInputElement>;
}

export default function Login() {
    const chatLogProps: props = useOutletContext();
    const navigate = useNavigate();

    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        chatLogProps.setInputId(e.target.value);
        return;
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (chatLogProps.inputId.length === 0) {
            chatLogProps.inputRef.current?.focus();
            return;
        }
        if (e.key === "Enter") {
            handleLogin();
        }
        return;
    };
    const handleLogin = async () => {
        if (chatLogProps.inputId.length === 0) {
            chatLogProps.inputRef.current?.focus();
            return;
        }
        const checkUserEmail = await axios({
            method: "post",
            url: `${process.env.REACT_APP_ADDRESS}/api/user/check`,
            data: {
                email: chatLogProps.inputId,
            },
        });
        checkUserEmail.data.success ? navigate("/start/login") : navigate("/start/signup");

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
                    value={chatLogProps.inputId}
                    onChange={(e) => handleInputText(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    // onBlur={handleLogin}
                    ref={chatLogProps.inputRef}
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

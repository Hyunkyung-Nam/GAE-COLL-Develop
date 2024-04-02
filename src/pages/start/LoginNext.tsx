import React, { useEffect, useRef, useState } from "react";
import "../../style/common.scss";
import styles from "../../style/login.module.scss";
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
        <div>
            <div className={styles.emailLogin}>
                <div className={styles.mainTitle}>로그인</div>

                <label htmlFor="input-password">비밀번호</label>
                <input
                    ref={pwInput}
                    id="input-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={inputId}
                    onChange={(e) => handleInputText(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    onBlur={handleLogin}
                />
                <br />
                <button onClick={handleLogin}>로그인</button>
                <Link to="/start/findPw">
                    <span className={styles.findPw}>비밀번호를 잊으셨나요?</span>
                </Link>
            </div>
        </div>
    );
}

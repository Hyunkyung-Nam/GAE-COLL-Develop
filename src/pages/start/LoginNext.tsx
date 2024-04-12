import React, { useEffect, useRef, useState } from "react";
import "../../style/common.scss";
import styles from "../../style/login.module.scss";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToken } from "../../store/tokenReducer";

interface props {
    inputId: string;
}

export default function LoginNext() {
    const [inputPw, setInputPw] = useState("");
    const pwInput = useRef<HTMLInputElement>(null);
    const chatLogProps: props = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        pwInput.current?.focus();
    });
    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPw(e.target.value);
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    const handleLogin = async () => {
        if (inputPw === "") {
            return;
        }
        const loginRes = await axios({
            method: "post",
            url: `${process.env.REACT_APP_ADDRESS}/api/user/login/email`,
            data: {
                email: chatLogProps.inputId,
                password: inputPw,
            },
        });
        if (loginRes.data.success) {
            dispatch({ ...updateToken(loginRes.data.token) });

            navigate("/");
        } else {
            alert("비밀번호가 올바르지 않습니다");
        }

        return;
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
                    value={inputPw}
                    onChange={(e) => handleInputText(e)}
                    onKeyDown={(e) => handleEnter(e)}
                    // onBlur={handleLogin}
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

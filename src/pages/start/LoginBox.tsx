import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../../style/login.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateToken } from "../../store/tokenReducer";

export default function LoginBox() {
    const [inputId, setInputId] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginTestUser = async () => {
        const loginRes = await axios({
            method: "post",
            url: `${process.env.REACT_APP_ADDRESS}/api/user/login/email`,
            data: {
                email: "test1",
                password: "1234",
            },
        });
        if (loginRes.data.success) {
            dispatch({ ...updateToken(loginRes.data.token) });

            navigate("/");
        }
    };
    return (
        <main>
            <button onClick={loginTestUser}>테스트유저로그인!</button>
            <br />
            <div className={styles.appTitle}>
                <span className={styles.appTitleLarge}>개</span>
                린이
                <span className={styles.appTitleLarge}>콜</span>라보
            </div>

            <Outlet context={{ inputId, setInputId, inputRef }} />
        </main>
    );
}

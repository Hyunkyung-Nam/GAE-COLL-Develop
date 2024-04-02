import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../../style/login.module.scss";
import Login from "./Login";

export default function LoginBox() {
    return (
        <main>
            <div className={styles.appTitle}>
                <span className={styles.appTitleLarge}>개</span>
                린이
                <span className={styles.appTitleLarge}>콜</span>라보
            </div>
            <Outlet />
        </main>
    );
}

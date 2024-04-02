import React from "react";
import { today } from "../../variable/variable";
import styles from "../../style/header.module.scss";

export default function Header() {
    return (
        <div className={styles.header}>
            <div></div>
            <div>{today}</div>
            <div>
                <img src="./img/user.svg" alt="이미지" />
            </div>
        </div>
    );
}

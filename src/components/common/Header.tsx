import React from "react";
import { todayString } from "../../variable/variable";
import styles from "../../style/header.module.scss";

export default function Header(props: any) {
    return (
        <div className={styles.header}>
            <div className={styles.headerFirstLine}>
                <div></div>
                <div>{todayString}</div>
                <div className={styles.imgBox}>
                    <img src="./img/user.svg" alt="이미지" />
                </div>
            </div>
            {props.title && <div className={styles.headerSecoundLine}>{props.title}</div>}
        </div>
    );
}

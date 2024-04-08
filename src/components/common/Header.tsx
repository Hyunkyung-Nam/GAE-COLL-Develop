import React from "react";
import { todayString } from "../../variable/variable";
import styles from "../../style/header.module.scss";
import MiniProfile from "./MiniProfile";

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
            {props.project && (
                <div className={styles.headerProjectLine}>
                    <div className={[styles.projectContentBox, styles.hundred].join()}>
                        <MiniProfile data={props.project} />
                    </div>
                    <div className={styles.projectDdayBox}>
                        D - {Math.floor((props.project.endDate - props.project.startDate) / (1000 * 60 * 60 * 24))}
                    </div>
                </div>
            )}
        </div>
    );
}

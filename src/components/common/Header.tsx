import React from "react";
import { todayString } from "../../variable/variable";
import styles from "../../style/header.module.scss";
import MiniProfile from "./MiniProfile";

export default function Header(props: any) {
    // const { end_date } = props.project;

    // const endDate = new Date(end_date);
    // const today = new Date();

    let dDay = 0;

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
                        <span style={{ display: "none" }}>
                            {
                                (dDay = Math.floor(
                                    (Number(new Date(props.project.end_date)) - Number(new Date())) /
                                        (1000 * 60 * 60 * 24)
                                ))
                            }
                        </span>
                        {dDay > 0 ? <span>D - {dDay}</span> : <span>D + {Math.abs(dDay)}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}

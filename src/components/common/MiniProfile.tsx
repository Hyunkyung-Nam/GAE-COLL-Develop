import React from "react";
import styles from "../../style/miniProfile.module.scss";

export default function MiniProfile(props: any) {
    const { imgSrc, title, status } = props.data;
    return (
        <>
            <div className={styles.miniProfileBox}>
                <div className={styles.miniProfileImg}>
                    <img src={imgSrc} alt="" />
                </div>
                <div className={styles.miniProfileContent}>
                    <div>{title}</div>
                    <div>{status}</div>
                </div>
            </div>
        </>
    );
}

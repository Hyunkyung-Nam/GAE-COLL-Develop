import React from "react";
import styles from "../../style/miniProfile.module.scss";

export default function MiniProfile(props: any) {
    const { project_name, status, project_img } = props.data;
    return (
        <>
            <div className={styles.miniProfileBox}>
                <div className={styles.miniProfileImg}>
                    <img src={project_img} alt="" />
                </div>
                <div className={styles.miniProfileContent}>
                    <div>{project_name}</div>
                    <div>{status}</div>
                </div>
            </div>
        </>
    );
}

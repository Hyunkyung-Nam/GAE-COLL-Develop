import React from "react";
import styles from "../../style/miniProfile.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject(props: any) {
    return (
        <>
            <div style={{ width: props.width }} className={styles.addProjectDiv} onClick={props.onClick}>
                <div className={styles.addProjectButton}>+</div>
                {props.data && (
                    <div className={styles.addProjectContent}>
                        <div>{props.data}</div>
                    </div>
                )}
            </div>
        </>
    );
}

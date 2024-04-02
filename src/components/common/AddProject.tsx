import React from "react";
import styles from "../../style/miniProfile.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.addProjectDiv} onClick={() => navigate("/createProject")}>
                <div className={styles.addProjectButton}>+</div>
                <div className={styles.addProjectContent}>
                    <div>프로젝트 생성</div>
                </div>
            </div>
        </>
    );
}

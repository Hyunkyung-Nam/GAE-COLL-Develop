import React from "react";
import styles from "../../style/ContentBox.module.scss";
import MiniProfile from "./MiniProfile";
import BaordContentTable from "../board/BaordContentTable";
import TableContent from "./TableContent";
import AddProject from "./AddProject";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ContentBox(props: any) {
    const navigate = useNavigate();

    return (
        <>
            {props.projectData && (
                <div className={styles.contentBox}>
                    <AddProject data="프로젝트 생성" onClick={() => navigate("/createProject")} />

                    {props.projectData.projectResult.map((value: any) => {
                        return <MiniProfile key={value.title} data={value} />;
                    })}
                </div>
            )}
            {props.myJob &&
                (props.myJob.length === 0 ? (
                    <div className={styles.nonContent}>
                        <div>작업이 없습니다.</div>
                    </div>
                ) : (
                    <div className={styles.contentBox}>
                        <BaordContentTable data={props.myJob} />
                    </div>
                ))}
            {props.teamData &&
                (props.teamData.length === 0 ? (
                    <div className={styles.nonContent}>
                        <div>팀 활동내역이 없습니다.</div>
                    </div>
                ) : (
                    <div className={styles.contentBox}>
                        <TableContent data={props.teamData} />
                    </div>
                ))}
        </>
    );
}

import React from "react";
import styles from "../../style/ContentBox.module.scss";
import MiniProfile from "./MiniProfile";
import BaordContentTable from "../board/BaordContentTable";
import TableContent from "./TableContent";
import AddProject from "./AddProject";
import { Link } from "react-router-dom";

export default function ContentBox(props: any) {
    return (
        <>
            {/* 데이터가 한개도없을때 보여주는거랑 +할 데이터 넣는거.. ㅎ 정말 힘들다.. ㅠ */}
            {props.projectData && (
                <div className={styles.contentBox}>
                    <AddProject />

                    {props.projectData.map((value: any) => {
                        return <MiniProfile key={value.title} data={value} />;
                    })}
                </div>
            )}
            {props.myJob &&
                (props.myJob.length === 0 ? (
                    <div className={styles.contentBox}>
                        <div>작업이 없습니다.</div>
                    </div>
                ) : (
                    <div className={styles.contentBox}>
                        <BaordContentTable data={props.myJob} />
                    </div>
                ))}
            {props.teamData &&
                (props.teamData.length === 0 ? (
                    <div className={styles.contentBox}>
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

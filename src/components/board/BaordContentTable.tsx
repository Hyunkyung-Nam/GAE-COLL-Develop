import React from "react";
import BoardContentMain from "./BoardContentMain";
import styles from "../../style/boardContentTable.module.scss";

export default function BaordContentTable(props: any) {
    return (
        <div className={styles.boardContentTableBox}>
            <table border={1}>
                <thead>
                    <tr>
                        <th>작업명</th>
                        <th>마감일</th>
                        <th>프로젝트명</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((value: any, index: number) => {
                        return <BoardContentMain key={index} data={value} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

import React from "react";
import styles from "../../style/boardJob.module.scss";

export default function BoardJob({ board }: { board: any }) {
    return (
        <div className={styles.boardJobMain}>
            <div>{board.title}</div>
            <div>마감일 : {board.deadline}</div>
        </div>
    );
}

import React from "react";
import styles from "../../style/boardContentBox.module.scss";
import TableContent from "../common/TableContent";
import AddBoardJob from "./AddBoardJob";
import BoardJob from "./BoardJob";

export default function BoardContentBox(props: any) {
    return (
        <>
            {props.board && (
                <div className={styles.contentBox}>
                    <AddBoardJob />
                    {props.board.length !== 0 &&
                        props.board.map((value: object) => {
                            return <BoardJob board={value} />;
                        })}
                </div>
            )}
        </>
    );
}

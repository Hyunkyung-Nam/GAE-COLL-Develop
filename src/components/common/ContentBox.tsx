import React from "react";
import styles from "../../style/ContentBox.module.scss";
import MiniProfile from "./MiniProfile";

export default function ContentBox(props: any) {
    return (
        <div className={styles.contentBox}>
            {props.teamData.map((value: any) => {
                return <MiniProfile data={value} />;
            })}
        </div>
    );
}

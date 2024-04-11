import React from "react";
import TeamLog from "./TeamLog";
import styles from "../../style/boardContentTable.module.scss";

export default function TableContent(props: any) {
    return (
        <div className={styles.teamLogTable}>
            <table border={1}>
                <tbody>
                    {props.data.teamlog &&
                        props.data.teamlog.map((value: any) => {
                            return <TeamLog key={value.id} data={value} />;
                        })}
                </tbody>
            </table>
        </div>
    );
}

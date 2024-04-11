import React from "react";
import { switchStatus } from "../../variable/variable";
import styles from "../../style/boardContentTable.module.scss";

export default function TeamLog(props: any) {
    const { deadline, description, id, projectId, project_img, project_name, status, title, user_name, userId } =
        props.data;
    return (
        <tr>
            <td width={"20%"} className={styles.td}>
                <div>
                    <img src="" alt="" />
                    <span>{project_name}</span>
                </div>
            </td>
            <td className={styles.td}>
                <div>
                    <span>
                        {user_name}님이 {title}을 {switchStatus(status).changedStatus}로 변경하였습니다
                    </span>
                </div>
            </td>
        </tr>
    );
}

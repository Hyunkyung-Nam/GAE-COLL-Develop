import React from "react";
import { switchStatus } from "../../variable/variable";
import styles from "../../style/boardContentTable.module.scss";

export default function BoardContentMain(props: any) {
    const { title, deadline, project, status } = props.data;
    return (
        <tr>
            <td>{title}</td>
            <td>{deadline}</td>
            <td>{project.project_name}</td>
            <td>{switchStatus(status).changedStatus}</td>
        </tr>
    );
}

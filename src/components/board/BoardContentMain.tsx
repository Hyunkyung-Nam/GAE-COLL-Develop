import React from "react";

export default function BoardContentMain(props: any) {
    const { title, deadline, team } = props.data;
    return (
        <tr>
            <td>{title}</td>
            <td>{deadline}</td>
            <td>{team}</td>
        </tr>
    );
}

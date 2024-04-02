import React from "react";
import TeamLog from "./TeamLog";

export default function TableContent(props: any) {
    return (
        <table border={1}>
            <tbody>
                {props.data.map((value: any, index: number) => {
                    return <TeamLog key={index} data={value} />;
                })}
            </tbody>
        </table>
    );
}

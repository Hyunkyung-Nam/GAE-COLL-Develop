import React from "react";
import BoardContentMain from "./BoardContentMain";

export default function BaordContentTable(props: any) {
    return (
        <table border={1}>
            <tbody>
                {props.data.map((value: any, index: number) => {
                    return <BoardContentMain key={index} data={value} />;
                })}
            </tbody>
        </table>
    );
}

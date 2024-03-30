import React from "react";
import ContentBox from "../../components/common/ContentBox";
import MiniProfile from "../../components/common/MiniProfile";

export default function Main() {
    const teamData = [
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
    ];
    return (
        <>
            {/* Header */}
            <ContentBox teamData={teamData} />
        </>
    );
}

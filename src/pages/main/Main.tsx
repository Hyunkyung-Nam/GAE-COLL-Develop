import React from "react";
import ContentBox from "../../components/common/ContentBox";
import styles from "../../style/main.module.scss";

export default function Main() {
    const projectData: object[] = [
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
        { imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" },
        {
            imgSrc: "./img/google-login.png",
            title: "개콜",
            status: "finish",
        },
        { imgSrc: "./img/google-login.png", title: "개콜 디벨롭", status: "progress" },
    ];
    const teamData: object[] = [
        { img: "", content: "야야야ㅑ야" },
        { img: "", content: "키키키" },
    ];
    const myJob: object[] = [
        { title: "레이아웃을짜야합니다요", deadline: "2024-02-01", team: "개콜" },
        { title: "레이아웃을짜야합니다요", deadline: "2024-02-01", team: "개콜" },
        { title: "레이아웃을짜야합니다요", deadline: "2024-02-01", team: "개콜" },
    ];
    return (
        <div style={{ paddingTop: "60px" }}>
            <div className={styles.mainTopConetent}>
                <div className={styles.topDiv}>
                    안녕하세요 <span className={styles.name}>남현경</span>님
                </div>
                <div className={styles.bottomDiv}>
                    <div>
                        <img src="./img/github.svg" alt="깃헙이미지" />
                    </div>
                    <div>
                        <span>blog</span>
                    </div>
                </div>
            </div>
            <div className={styles.mainTitle}>내 프로젝트</div>
            <ContentBox projectData={projectData} />
            <div className={styles.mainTitle}>내작업</div>
            <ContentBox myJob={myJob} />
            <div className={styles.mainTitle}>팀활동</div>
            <ContentBox teamData={teamData} />
        </div>
    );
}

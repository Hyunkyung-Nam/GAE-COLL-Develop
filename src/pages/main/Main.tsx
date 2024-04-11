import React, { useEffect } from "react";
import ContentBox from "../../components/common/ContentBox";
import styles from "../../style/main.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProeject } from "../../store/projectReducer";
import { rooteState } from "../../store";
import { updateMyBoard } from "../../store/myBoardReducer";
import { useReducer } from "react";
const initState = {};
const reducer = (prevState: any, action: any) => {
    switch (action.type) {
        case "UPDATETEAMLOG":
            return { ...prevState, teamlog: action.value };
    }
};

export default function Main() {
    const dispatch = useDispatch();
    const [teamLogState, dispatchTeamLog] = useReducer(reducer, initState);
    const { project, myBoard } = useSelector((state: rooteState) => {
        return state;
    });

    useEffect(() => {
        const getMyProjectResult = async () => {
            const res = await axios({
                method: "post",
                url: "http://localhost:8080/api/project/mine",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicHJvamVjdElkIjozLCJpYXQiOjE3MTI4MTg2NzIsImV4cCI6MTcxMjkwNTA3Mn0.EuaMTxi8KlwKyzJv88aZWJDo7fpmzBcoENwODvts240`,
                },
            });
            const { success, result } = res.data;
            if (success) {
                dispatch({ ...updateProeject(result) });
            }
        };
        getMyProjectResult();
        const getMyJobResultResult = async () => {
            const res = await axios({
                method: "POST",
                url: "http://localhost:8080/api/project/board/mine",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicHJvamVjdElkIjozLCJpYXQiOjE3MTI4MTg2NzIsImV4cCI6MTcxMjkwNTA3Mn0.EuaMTxi8KlwKyzJv88aZWJDo7fpmzBcoENwODvts240`,
                },
            });
            const { success, result } = res.data;
            if (success) {
                dispatch({ ...updateMyBoard(result) });
            }
        };

        getMyJobResultResult();
        const getTeamLogResultResult = async () => {
            const res = await axios({
                method: "POST",
                url: "http://localhost:8080/api/project/teamboard",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicHJvamVjdElkIjozLCJpYXQiOjE3MTI4MTg2NzIsImV4cCI6MTcxMjkwNTA3Mn0.EuaMTxi8KlwKyzJv88aZWJDo7fpmzBcoENwODvts240`,
                },
            });
            const { success, result } = res.data;
            console.log("result", result);
            if (success) {
                dispatchTeamLog({ type: "UPDATETEAMLOG", value: result });
                //  dispatch({ ...updateMyBoard(result) });
            }
        };

        getTeamLogResultResult();
    }, []);

    // const projectData: object[] = [{ imgSrc: "./img/google-login.png", title: "궁석궁석", status: " finish" }];
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
        <div className={styles.mainContent}>
            <div className={styles.mainTopConetent}>
                <div className={styles.topDiv}>
                    안녕하세요{" "}
                    <span className={styles.name}>{project.myProject[0] && project.myProject[0].user_name}</span>님
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
            <ContentBox projectData={project.myProject[0]} />
            <div className={styles.mainTitle}>내작업</div>
            <ContentBox myJob={myBoard.myBoard[0]} />
            <div className={styles.mainTitle}>팀활동</div>
            <ContentBox teamData={teamLogState} />
        </div>
    );
}

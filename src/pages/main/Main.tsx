import React, { useEffect } from "react";
import ContentBox from "../../components/common/ContentBox";
import styles from "../../style/main.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProeject } from "../../store/projectReducer";
import { rooteState } from "../../store";
import { updateMyBoard } from "../../store/myBoardReducer";
import { useReducer } from "react";
import { Link } from "react-router-dom";
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
    const {
        project,
        myBoard,
        token: storedToken,
    } = useSelector((state: rooteState) => {
        return state;
    });

    useEffect(() => {
        const getMyProjectResult = async () => {
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_ADDRESS}/api/project/mine`,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
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
                url: `${process.env.REACT_APP_ADDRESS}/api/project/board/mine`,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
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
                url: `${process.env.REACT_APP_ADDRESS}/api/project/teamboard`,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            const { success, result } = res.data;
            if (success) {
                dispatchTeamLog({ type: "UPDATETEAMLOG", value: result });
            }
        };

        getTeamLogResultResult();
    }, []);

    const noLink = (LinkName: string): void => {
        alert(`${LinkName} 링크를 작성해주세요`);
    };
    return (
        <div className={styles.mainContent}>
            <div className={styles.mainTopConetent}>
                <div className={styles.topDiv}>
                    안녕하세요{" "}
                    <span className={styles.name}>{project.myProject[0] && project.myProject[0].user_name}</span>님
                </div>
                <div className={styles.bottomDiv}>
                    <div>
                        {project.myProject[0] && project.myProject[0].github ? (
                            <Link to={project.myProject[0].github}>
                                <img src="./img/github.svg" alt="깃헙이미지" />{" "}
                            </Link>
                        ) : (
                            <img src="./img/github.svg" alt="깃헙이미지" onClick={() => noLink("github")} />
                        )}
                    </div>
                    <div>
                        {project.myProject[0] && project.myProject[0].blog ? (
                            <Link to={project.myProject[0].blog}>
                                <span>blog</span>
                            </Link>
                        ) : (
                            <span onClick={() => noLink("blog")}>blog</span>
                        )}
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

import { useDispatch, useSelector } from "react-redux";
import BoardContentBox from "../../components/board/BoardContentBox";
import styles from "../../style/boardMainBox.module.scss";
import { rooteState } from "../../store";
import { useEffect } from "react";
import axios from "axios";
import { updateProjectBoard } from "../../store/projectBoardReducer";
interface board {
    deadline: string;
    description: string;
    id: number;
    projectId: number;
    status: string;
    title: string;
    updatedAt: string;
    userId: number;
    user_name: string;
}

export default function BoardMainBox() {
    const { projectBoard, token: storedToken } = useSelector((state: rooteState) => {
        return state;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const getBoardData = async () => {
            const updateTokenRes = await axios({
                method: "get",
                url: `${process.env.REACT_APP_ADDRESS}/api/project/board/get`,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            const { success, result } = updateTokenRes.data;
            if (success) {
                dispatch({ ...updateProjectBoard(result) });
            }
        };

        getBoardData();
    }, [storedToken]);
    console.log(projectBoard);

    const fiteringAndSorting = (boards: board[] | null, status: string): board[] | null => {
        return projectBoard
            ? projectBoard
                  .filter((value: board) => {
                      if (value.status === status) {
                          return value;
                      }
                  })
                  .sort((a, b) => {
                      if (a.deadline > b.deadline) return -1;
                      if (a.deadline < b.deadline) return 1;
                      return 0;
                  })
            : null;
    };
    return (
        <div className={styles.main}>
            <div className={styles.oneBoardContainer}>
                <span>계획중</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "planning")} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>진행중</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "progress")} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>피드백 요청</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "needFeedback")} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>피드백 완료</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "finishFeedback")} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>중단됨</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "suspend")} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>완료</span>
                <BoardContentBox board={fiteringAndSorting(projectBoard, "finish")} />
            </div>
        </div>
    );
}

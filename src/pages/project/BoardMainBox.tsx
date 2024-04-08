import BoardContentBox from "../../components/board/BoardContentBox";
import styles from "../../style/boardMainBox.module.scss";

export default function BoardMainBox() {
    const board: object[] = [
        {
            id: 1,
            title: "일을해야합니다1",
            status: "planning",
            deadline: "2024-05-06",
            description: "",
            projectId: "1",
            userId: "1",
        },
        {
            id: 2,
            title: "일을해야합니다2",
            status: "planning",
            deadline: "2024-05-07",
            description: "",
            projectId: "1",
            userId: "1",
        },
        {
            id: 3,
            title: "일을해야합니다3",
            status: "planning",
            deadline: "2024-05-06",
            description: "",
            projectId: "1",
            userId: "1",
        },
        {
            id: 4,
            title: "일을해야합니다4",
            status: "planning",
            deadline: "2024-05-07",
            description: "",
            projectId: "1",
            userId: "1",
        },
        {
            id: 5,
            title: "일을해야합니다5",
            status: "planning",
            deadline: "2024-05-06",
            description: "",
            projectId: "1",
            userId: "1",
        },
        {
            id: 6,
            title: "일을해야합니다6",
            status: "planning",
            deadline: "2024-05-07",
            description: "",
            projectId: "1",
            userId: "1",
        },
    ];
    return (
        <div className={styles.main}>
            <div className={styles.oneBoardContainer}>
                <span>계획중</span>
                <BoardContentBox board={board} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>진행중</span>
                <BoardContentBox board={board} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>피드백 요청</span>
                <BoardContentBox board={board} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>피드백 완료</span>
                <BoardContentBox board={board} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>중단됨</span>
                <BoardContentBox board={board} />
            </div>
            <div className={styles.oneBoardContainer}>
                <span>완료</span>
                <BoardContentBox board={board} />
            </div>
        </div>
    );
}

import styles from "../../style/boardJob.module.scss";

export default function BoardJob({ board }: { board: any }) {
    const deadline = new Date(board.deadline);
    const now = new Date();
    //현재시간으로 만들면 기존시간보다 크기 때문에 00시 00분 00초로 새로 만들어줌
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const caculatedDay = Number(deadline) - Number(today);

    return (
        <>
            {
                <div className={caculatedDay < 0 ? styles.boardJobMainOpacity : styles.boardJobMain}>
                    <div>{board.title}</div>
                    <div>마감일 : {board.deadline}</div>
                </div>
            }
        </>
    );
}

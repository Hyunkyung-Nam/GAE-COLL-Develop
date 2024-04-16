import styles from "../../style/userCircle.module.scss";

export default function UserCircle(props: any) {
    return (
        <div className={styles.userCircleBox}>
            <img src={props.imgPath} alt="유저이미지" />
        </div>
    );
}

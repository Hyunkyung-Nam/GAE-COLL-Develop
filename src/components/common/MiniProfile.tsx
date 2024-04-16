import { useDispatch, useSelector } from "react-redux";
import styles from "../../style/miniProfile.module.scss";
import axios from "axios";
import { updateToken } from "../../store/tokenReducer";
import { rooteState } from "../../store";
import { useNavigate } from "react-router-dom";
import { updateSeletedProject } from "../../store/selectedProjectReducer";
import { switchStatus } from "../../variable/variable";

export default function MiniProfile(props: any) {
    const { project_name, status, project_img, id } = props.data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token: storedToken } = useSelector((state: rooteState) => {
        return state;
    });

    const goProjectBoard = async () => {
        const updateTokenRes = await axios({
            method: "post",
            url: `${process.env.REACT_APP_ADDRESS}/api/project/update/token`,
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
            data: {
                projectId: Number(id),
            },
        });
        const { success, token } = updateTokenRes.data;
        if (success) {
            dispatch({ ...updateToken(token) });
            dispatch({ ...updateSeletedProject(props.data) });
            navigate("/board");
        }
    };
    return (
        <div onClick={goProjectBoard}>
            <div className={styles.miniProfileBox}>
                <div className={styles.miniProfileImg}>
                    <img src={project_img} alt="" />
                </div>
                <div className={styles.miniProfileContent}>
                    <div>{project_name}</div>
                    <div>{switchStatus(status).changedStatus}</div>
                </div>
            </div>
        </div>
    );
}

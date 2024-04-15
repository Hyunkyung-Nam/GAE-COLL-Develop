import { NavLink } from "react-router-dom";
import styles from "../../style/projectNavigation.module.scss";
export default function ProjectNavigation() {
    return (
        <nav className={styles.nav}>
            <NavLink
                to={"/home"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                홈
            </NavLink>
            <NavLink
                to={"/board"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                보드
            </NavLink>
            <NavLink
                to={"/calender"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                캘린더
            </NavLink>
            <NavLink
                to={"/issue"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                이슈
            </NavLink>
            <NavLink
                to={"/setting"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                    };
                }}
            >
                프로젝트 관리
            </NavLink>
        </nav>
    );
}

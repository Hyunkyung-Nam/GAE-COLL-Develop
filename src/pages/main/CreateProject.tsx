import styles from "../../style/createProject.module.scss";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { todayDate } from "../../variable/variable";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import AddProject from "../../components/common/AddProject";
import UserCircle from "../../components/common/UserCircle";

interface addedUser {
    userName: string;
    userId: number;
    imgPath: string;
}

interface ProjectAddForm {
    projectName: string;
    userId: string[];
    projectPeriod: Date[];
}
export default function CreateProject() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<ProjectAddForm>({ mode: "onChange" });

    const [dateRange, setDateRange] = useState<Date[]>([todayDate, todayDate]);
    const [startDate, endDate] = dateRange;
    const [addedProjectMember, setAddedProjectMember] = useState<addedUser[]>([]);

    const modal = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        //새로고침시에도 적용되게 하려면 레이아웃 그려질 때마다 넣어줘야한다
        modal.current?.addEventListener("click", (e) => {
            //이방법은 자기자신누르면 open이 켜지고 그 외 영역누르면 close
            if (e.target === e.currentTarget) modal.current?.close();
        });
    });

    const openModal = (): void => {
        modal.current?.showModal();
    };
    const addProjectMember = (): void => {
        //디비에서 검색해서 가져오기
        //있으면 모달창닫고 아니면 모달창 열어두고 alert이나 문구띄워주기
        modal.current?.close();
    };
    const closeModal = (): void => {
        modal.current?.close();
    };
    const onSubmit = (data: ProjectAddForm) => {
        console.log(data);
        console.log(changeDateFormat(startDate), changeDateFormat(endDate));
    };
    const changeDateFormat = (date: Date): string => {
        const day: string = date.getDay() > 9 ? date.getDay().toString() : "0" + date.getDay();
        const month: string =
            date.getMonth() + 1 > 9 ? Number(date.getMonth() + 1).toString() : "0" + Number(date.getMonth() + 1);
        const year: string = date.getFullYear().toString();
        return year + "-" + month + "-" + day;
    };
    return (
        <div className={styles.createProjectMain}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="project-name">프로젝트 이름</label>
                    <br />
                    <input
                        type="text"
                        id="project-name"
                        placeholder="프로젝트 이름을 입력하세요"
                        {...register("projectName", { required: "프로젝트 이름을 입력하세요" })}
                    />
                    <br />
                    {errors.projectName && <span className={styles.errorMessage}>{errors.projectName?.message}</span>}
                </div>
                <div>
                    <div>프로젝트 기간</div>
                    <br />
                    <DatePicker
                        className={styles.datePicker}
                        showIcon
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                                <mask id="ipSApplication0">
                                    <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                        <path
                                            fill="#fff"
                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                        ></path>
                                    </g>
                                </mask>
                                <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSApplication0)"></path>
                            </svg>
                        }
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update: Date[]) => {
                            setDateRange(update);
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="프로젝트 기간을 선택해주세요"
                        showMonthDropdown
                        useShortMonthInDropdown
                        showPopperArrow={false}
                    />
                </div>
                <div>
                    <div>프로젝트 이미지</div>
                    <br />
                    <label htmlFor="project-img">
                        이미지 선택
                        <input type="file" id="project-img" accept="image/*" />
                    </label>
                </div>
                <div>
                    <div>프로젝트 멤버 추가</div>
                    <div className={styles.addProjectMemberBox}>
                        <AddProject onClick={openModal} width="fit-content" />
                        {addedProjectMember.map((value) => {
                            return <UserCircle key={value.userId} imgPath={value.imgPath} />;
                        })}
                    </div>
                </div>
                <div>
                    <button>프로젝트 생성</button>
                </div>
            </form>
            <dialog ref={modal}>
                <div className={styles.modalContainer}>
                    <div>
                        <h3>프로젝트 멤버 추가</h3>
                    </div>
                    <div>
                        <label htmlFor="findMemberEmail">이메일</label>
                        <br />
                        <br />
                        <input type="email" id="findMemberEmail" />
                    </div>
                    <div>
                        <button onClick={addProjectMember}>추가</button>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

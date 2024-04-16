import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    addDays,
    isSameDay,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import styles from "../../style/calenderMainbox.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { rooteState } from "../../store";
interface board {
    deadline: string;
    id: number;
    is_mine: boolean;
    status: string;
    title: string;
}

export default function CalenderMainBox() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [job, setjob] = useState<board[]>([]);
    const { token: storedToken } = useSelector((state: rooteState) => {
        return state;
    });

    useEffect(() => {
        const getBoardMonth = async () => {
            const this_year = currentMonth.getFullYear();
            const this_month = currentMonth.getMonth();
            let yearMonth = ""; //이번 년도 + 달
            if (this_month < 9) {
                yearMonth = `${String(this_year)}-0${String(this_month + 1)}-`;
            } else {
                yearMonth = `${String(this_year)}-${String(this_month + 1)}-`;
            }
            const getBoardMonthRes = await axios({
                method: "get",
                url: `${process.env.REACT_APP_ADDRESS}/api/project/board/get/month`,
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
                params: {
                    YYYYMM: yearMonth,
                },
            });
            const { success, result } = getBoardMonthRes.data;
            if (success) {
                setjob(
                    result.sort((a: board, b: board) => {
                        if (a.deadline > b.deadline) return -1;
                        if (a.deadline < b.deadline) return 1;
                        return 0;
                    })
                );
            }
        };

        getBoardMonth();
    }, [currentMonth]);
    const prevMonth = (): void => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = (): void => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day: Date) => {
        setSelectedDate(day);
    };
    const setBoard = (date: string): any[] => {
        const datas: object[] = [];
        const matchData = job.filter((e) => {
            if (e.deadline.slice(8, 10) === date) {
                return e;
            }
        });
        matchData.map((e) => datas.push(<div className={styles.CalenderboardContenct}>{e.title}</div>));
        console.log(typeof datas[0], datas[0]);
        return datas;
    };
    const setSelectedBoard = (): any[] => {
        const matchData = job.filter((e) => {
            if (e.deadline.slice(8, 10) === selectedDate.getDate().toString()) {
                return e;
            }
        });
        return matchData;
    };
    return (
        <div className={styles.calenerMain}>
            <div className={styles.calenderSection}>
                <CalenderTitle currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
                <CalenderHeader />
                <CalenderBody
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    setBoard={setBoard}
                />
            </div>
            <div className={styles.selectedJobSection}>
                {selectedDate && (
                    <div style={{ textAlign: "start", fontSize: "14px" }}>{`${
                        selectedDate.getMonth() + 1
                    }월 ${selectedDate.getDate()}일 마감`}</div>
                )}

                {setSelectedBoard().length === 0 && (
                    <div style={{ textAlign: "center", opacity: "0.5", fontSize: "12px" }}>작업없음</div>
                )}
                {setSelectedBoard().map((e) => {
                    return <div style={{ marginTop: "5px" }}>* {e.title}</div>;
                })}
            </div>
        </div>
    );
}

const CalenderTitle = ({
    currentMonth,
    prevMonth,
    nextMonth,
}: {
    currentMonth: Date;
    prevMonth: () => void;
    nextMonth: () => void;
}) => {
    return (
        <div className={styles.calenderTitle}>
            <div>
                <span>
                    {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
                </span>
            </div>
            <div>
                <div onClick={prevMonth}>{"<"}</div>
                <div onClick={nextMonth}>{">"}</div>
            </div>
        </div>
    );
};
const CalenderHeader = () => {
    const days = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];
    for (let i = 0; i < 7; i++) {
        days.push(<div key={i}>{date[i]}</div>);
    }
    return <div className={styles.calenderHeader}>{days}</div>;
};

const CalenderBody = ({
    currentMonth,
    selectedDate,
    onDateClick,
    setBoard,
}: {
    currentMonth: Date;
    selectedDate: Date;
    onDateClick: (day: Date) => void;
    setBoard: (date: string) => any[];
}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day: Date = startDate;
    let formatteDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formatteDate = format(day, "d");
            const cloneDay = day;
            days.push(
                <div
                    className={`${
                        !isSameMonth(day, monthStart)
                            ? styles.disalbed
                            : isSameDay(day, selectedDate)
                            ? styles.selected
                            : format(currentMonth, "M") !== format(day, "M")
                            ? styles.notValid
                            : styles.valid
                    }`}
                    key={formatteDate}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className={format(currentMonth, "M") !== format(day, "M") ? styles.notValid : ""}>
                        {formatteDate}
                        {setBoard(formatteDate).length !== 0 ? setBoard(formatteDate) : ""}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(<div key={formatteDate}>{days}</div>);
        days = [];
    }
    return <div className={styles.calenderBody}>{rows}</div>;
};

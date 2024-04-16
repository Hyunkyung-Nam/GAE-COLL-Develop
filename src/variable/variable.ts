export const newDate = new Date();
export const todayString = `${newDate.getMonth() + 1}월  ${newDate.getDate()}일`;
interface data {
    color: string;
    changedStatus: string;
}

export const todayDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

export function switchStatus(status: string): data {
    let data: data = { color: "", changedStatus: "" };

    switch (status) {
        case "planning":
            data.color = "blue";
            data.changedStatus = "계획중";
            break;
        case "progress":
            data.color = "yellow";
            data.changedStatus = "진행중";
            break;
        case "suspend":
            data.color = "purple";
            data.changedStatus = "중단됨";
            break;
        case "finish":
            data.color = "green";
            data.changedStatus = "완료";
            break;
        case "needFeedback":
            data.color = "red";
            data.changedStatus = "피드백 요청";
            break;
        case "finishFeedback":
            data.color = "black";
            data.changedStatus = "피드백 완료";
            break;
    }
    return data;
}

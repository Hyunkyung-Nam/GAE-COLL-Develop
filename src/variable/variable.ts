export const newDate = new Date();
export const todayString = `${newDate.getMonth() + 1}월  ${newDate.getDate()}일`;

export const todayDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

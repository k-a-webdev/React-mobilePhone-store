const dateNow = new Date();
dateNow.setMonth(dateNow.getMonth() + 1);
export const fullDate = {
    date: `${
        String(dateNow.getDate()).length === 1
            ? "0" + dateNow.getDate()
            : dateNow.getDate()
    }-${
        String(dateNow.getMonth()).length === 1
            ? "0" + dateNow.getMonth()
            : dateNow.getMonth()
    }-${dateNow.getFullYear()}`,
    time: `${
        String(dateNow.getHours()).length === 1
            ? "0" + dateNow.getHours()
            : dateNow.getHours()
    }:${
        String(dateNow.getMinutes()).length === 1
            ? "0" + dateNow.getMinutes()
            : dateNow.getMinutes()
    }`,
};

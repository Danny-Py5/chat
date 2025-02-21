export function getId() {
    const stringsId = "1234567890-abcdefghijklmnopqrstuvwxyz";
    let id = "";
    while (id.length < 30) {
        const randomIndex = Math.floor(Math.random() * stringsId.length);
        id += stringsId[randomIndex];
    }

    return id;
}

export function _createElement(type) {
    return document.createElement(`${type}`);
}
export function formatDate(isosString) {
    const dateString = new Date(isosString);
    const hours = {
        13: "01",
        14: "02",
        15: "03",
        16: "04",
        17: "05",
        18: "06",
        19: "07",
        20: "08",
        21: "09",
        22: "10",
        23: "11",
        0: "12",
    };
    let hoursIn12;
    if (dateString.getHours() > 12) {
        hoursIn12 = hours[`${dateString.getHours()}`];
    } else {
        hoursIn12 = dateString.getHours();
        if (String(hoursIn12).length < 2) {
            hoursIn12 = "0" + hoursIn12;
        }
    }
    let minutes = dateString.getMinutes();
    minutes = String(minutes).length < 2 ? "0" + minutes : minutes;
    return `${hoursIn12}:${minutes} ${dateString
        .toLocaleTimeString()
        .slice(8)}`;
}

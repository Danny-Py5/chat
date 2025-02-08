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

class Chats {
    constructor() {
        this.allChats = JSON.parse(localStorage.getItem("chats")) || [
            {
                sent: "hello there",
                timeStramp: new Date().getDate(),
                isSent: true,
                id: "023832-27922972",
            },
            {
                sent: "hello there",
                timeStramp: new Date().getDate(),
                isSent: true,
                id: "0823892-238732",
            },
            {
                receive: "hello there",
                timeStramp: new Date().getDate(),
                isSent: false,
                id: "0823891-238932",
            },
        ];
    }

    #saveToLocalStorage() {
        const chatsStringify = JSON.stringify(this.allChats);
        localStorage.setItem("chats", chatsStringify);
    }

    getChats() {
        let chatHTML = "";
        this.allChats.forEach((message) => {
            if (message.isSent) {
                chatHTML += `
                <div class="message-container message-${message.id} sent-message-container">
                    <button class="three-dots-button three-dots-button-${message.id}">
                        <div></div> <div></div><div></div>
                    </button>
                    <div class="message  js-message sent-message-body" data-id="${message.id}">
                        ${message.sent}
                    </div>
                </div>
                `;
            } else {
                chatHTML += `
                <div class="message-container message-${message.id} received-message-container">
                    <button class="three-dots-button three-dots-button-${message.id}">
                        <div></div> <div></div><div></div>
                    </button>
                    <div class="message  js-message received-message-body" data-id="${message.id}">
                        ${message.receive}
                    </div>
                </div>`;
            }
        });
        return chatHTML;
    }

    addMessage(message) {
        this.allChats.push(message);
        this.#saveToLocalStorage();
    }
}

export const chats = new Chats();

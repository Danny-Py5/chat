class Chats {
    constructor() {
        this.allChats = JSON.parse(localStorage.getItem("chats")) || [
            {
                sent: "hello there",
                timeStramp: new Date().getDate(),
                isSent: true,
            },
            {
                sent: "hello there",
                timeStramp: new Date().getDate(),
                isSent: true,
            },
            {
                receive: "hello there",
                timeStramp: new Date().getDate(),
                isSent: false,
            },
        ];
    }

    #saveToLocalStorage() {
        const chatsStringify = JSON.stringify(this.allChats);
        localStorage.setItem("chats", chatsStringify);
    }

    getChats() {
        let chatHTML = "";
        this.allChats.forEach((chat) => {
            if (chat.isSent) {
                chatHTML += `
                    <div class="sent-message-body">${chat.sent}</div>
                `;
            } else {
                chatHTML += `
                    <div class="received-message-body">${chat.receive}</div>
                `;
            }
        });
        return chatHTML;
    }

    addChat(chat) {
        this.allChats.push(chat);
        this.#saveToLocalStorage();
    }
}

export const chats = new Chats();

// for (let a = 0; a <= 5; ++a) {
//     chats.addChat({
//         sent: "hello there",
//         timeStramp: new Date().getDate(),
//         isSent: true,
//     });
// }

import { getId } from "../utils/chat-util.js";
import { _createElement } from "../utils/chat-util.js";

class Chats {
    constructor() {
        this.allChats = JSON.parse(localStorage.getItem("chats")) || [
            {
                sent: "hello \nthere",
                timeStramp: new Date().getDate(),
                isSent: true,
                id: "023832-27922972",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
            },
            {
                sent: "hello \nthere\nHappy new Sunday.\nWhish you good day ahead of you!",
                timeStramp: new Date().getDate(),
                isSent: true,
                id: "023832-27902972",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
            },
            {
                sent: "hello there",
                timeStramp: new Date().getDate(),
                isSent: true,
                id: "0823892-238732",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
            },
            {
                receive: "hello there",
                timeStramp: new Date().getDate(),
                isSent: false,
                id: "0823891-238932",
                containerClass: "received-message-container",
                messageClassName: "received-message-body",
            },
        ];
    }

    #saveToLocalStorage() {
        const chatsStringify = JSON.stringify(this.allChats);
        localStorage.setItem("chats", chatsStringify);
    }
    #getPreviousRefinedSentMessage(message) {
        const { newSendingMessageElem: prevMessageElem } =
            chats.#createMessageContainerElement(message.containerClass, {
                id: message.id,
            });
        prevMessageElem.innerHTML = `
        <button class="three-dots-button three-dots-button-${message.id} ">
            ${this.#getThreeDotsContainerContent()}
        </button>
        <div class="message js-message ${message.messageClassName}" data-id="${
            message.id
        }">
            
        </div>`;
        const messsageBodyPreElem = _createElement("pre");
        messsageBodyPreElem.textContent = message.sent;

        prevMessageElem
            .querySelector(".message")
            .appendChild(messsageBodyPreElem);

        return prevMessageElem;
    }
    #getPreviousRefinedRecievedMessage(message) {
        const { newSendingMessageElem: prevMessageElem } =
            chats.#createMessageContainerElement(message.containerClass, {
                id: message.id,
            });
        prevMessageElem.innerHTML = `
        <button class="three-dots-button three-dots-button-${message.id} ">
            ${this.#getThreeDotsContainerContent()}
        </button>
        <div class="message js-message ${message.messageClassName}" data-id="${
            message.id
        }">
            
        </div>`;
        const messsageBodyPreElem = _createElement("pre");
        messsageBodyPreElem.textContent = message.receive;

        prevMessageElem
            .querySelector(".message")
            .appendChild(messsageBodyPreElem);

        return prevMessageElem;
    }
    #getThreeDotsContainerContent() {
        return `
            <div class="dots-icon-cont">
                <div></div> <div></div><div></div>
            </div>
            <ul>
                <li>Delete</li>
                <li>Star</li>
                <li>Like</li>
                <li>Dislike</li>
            </ul>
        `;
    }
    getChats() {
        this.allChats.forEach((message) => {
            if (message.isSent) {
                // console.log(this.#getPreviousRefinedSentMessage(message));
                document
                    .querySelector(".chats")
                    .appendChild(this.#getPreviousRefinedSentMessage(message));
            } else {
                // console.log(this.#getPreviousRefinedRecievedMessage(message));
                document
                    .querySelector(".chats")
                    .appendChild(
                        this.#getPreviousRefinedRecievedMessage(message)
                    );
            }
        });
    }

    addMessage(message) {
        this.allChats.push(message);
        this.#saveToLocalStorage();
    }

    #createMessageContainerElement(
        uniqueContainerClassName,
        { id = undefined } = {}
    ) {
        /* when this function is called without seting the id param, 
        that means it is called in used for newly generating send or 
        receive message container otherwise, it  is for generating
        message contaniner element for previous messages */
        const newMessageId = getId();
        const newSendingMessageElem = _createElement("div");
        newSendingMessageElem.setAttribute(
            "data-message-container-id",
            id || newMessageId
        );
        newSendingMessageElem.classList.add(
            `message-container`,
            `message-container-${id || newMessageId}`,
            `${uniqueContainerClassName}`
            // "received-message-body"
            // `sent-message-container`
        );
        return { newSendingMessageElem, newMessageId };
    }

    getrefinedMessage(
        typedMessage,
        {
            uniqueContainerClassName = undefined,
            uniqueMessageClassName = undefined,
        } = {}
    ) {
        const { newSendingMessageElem, newMessageId } =
            chats.#createMessageContainerElement(uniqueContainerClassName);
        newSendingMessageElem.innerHTML = `
        <button class="three-dots-button three-dots-button-${newMessageId} ">
            ${this.#getThreeDotsContainerContent()}
        </button>
        <div class="message js-message ${uniqueMessageClassName}" data-id="${newMessageId}">
            
        </div>`;
        const messsageBodyPreElem = _createElement("pre");
        messsageBodyPreElem.textContent = typedMessage;

        newSendingMessageElem
            .querySelector(".message")
            .appendChild(messsageBodyPreElem);

        this.addMessage({
            sent: typedMessage,
            timeStramp: new Date().getDate(),
            isSent: true,
            id: newMessageId,
            containerClass: uniqueContainerClassName,
            messageClassName: uniqueMessageClassName,
        });
        return newSendingMessageElem;
    }

    deleteMessage(id) {
        this.allChats.map((message) => {
            if (message.id !== id) {
                return message;
            }
        });
        console.log(message);
    }
}

export const chats = new Chats();

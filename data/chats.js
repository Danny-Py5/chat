import { getId, formatDate } from "../utils/chat-util.js";
import { _createElement } from "../utils/chat-util.js";

class Chats {
    constructor() {
        this.allChats = JSON.parse(localStorage.getItem("chats")) || [
            {
                sent: "hello \nthere",
                timeStramp: new Date().toISOString(),
                isSent: true,
                id: "023832-27922972",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
                edited: false,
            },
            {
                sent: "hello \nthere\nHappy new Sunday.\nWhish you good day ahead of you!",
                timeStramp: new Date().toISOString(),
                isSent: true,
                id: "023832-27902972",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
                edited: false,
            },
            {
                sent: "hello there",
                timeStramp: new Date().toISOString(),
                isSent: true,
                id: "0823892-238732",
                containerClass: "sent-message-container",
                messageClassName: "sent-message-body",
                edited: false,
            },
            {
                receive: "hello there",
                timeStramp: new Date().toISOString(),
                isSent: false,
                id: "0823891-238932",
                containerClass: "received-message-container",
                messageClassName: "received-message-body",
                edited: false,
            },
        ];
    }

    #saveToLocalStorage() {
        const chatsStringify = JSON.stringify(this.allChats);
        localStorage.setItem("chats", chatsStringify);
    }
    #getMessageBody(
        message,
        id,
        { isReceived = false, isSent = false, isNewMessage = false } = {}
    ) {
        const messsageBodyPreElem = _createElement("pre");
        messsageBodyPreElem.setAttribute("data-id", message.id || id);
        messsageBodyPreElem.classList.add(
            "message-text",
            `message-text-${message.id || id}`
        );
        if (isReceived) {
            messsageBodyPreElem.textContent = message.receive;
        } else if (isSent) {
            messsageBodyPreElem.textContent = message.sent;
        } else if (isNewMessage) {
            messsageBodyPreElem.textContent = message;
        }
        return messsageBodyPreElem;
    }

    #setDate(messageElement, messageData) {
        const dateElement = _createElement("div");
        dateElement.setAttribute("data-id", messageData.id);

        dateElement.classList.add("date");
        dateElement.innerHTML = formatDate(messageData.timeStramp);
        messageElement.querySelector(".message").appendChild(dateElement);
    }
    #getPreviousRefinedSentMessage(message) {
        const { newSendingMessageElem: prevMessageElem } =
            chats.#createMessageContainerElement(message.containerClass, {
                id: message.id,
            });
        prevMessageElem.innerHTML = `
        <div class="three-dots-button three-dots-button-${
            message.id
        } "  data-id="${message.id}">
            ${this.#getThreeDotsContainerContent(message.id)}
        </div>
        <div class="message js-message ${message.messageClassName} message-${
            message.id
        }" data-id="${message.id}">
            
        </div>`;

        prevMessageElem
            .querySelector(".message")
            .appendChild(
                this.#getMessageBody(message, message.id, { isSent: true })
            );
        this.#setDate(prevMessageElem, message);

        return prevMessageElem;
    }
    #getPreviousRefinedRecievedMessage(message) {
        const { newSendingMessageElem: prevMessageElem } =
            chats.#createMessageContainerElement(message.containerClass, {
                id: message.id,
            });
        prevMessageElem.innerHTML = `
        <div class="three-dots-button three-dots-button-${
            message.id
        } " data-id="${message.id}">
            ${this.#getThreeDotsContainerContent(message.id)}
        </div>
        <div class="message js-message ${message.messageClassName} message-${
            message.id
        }" data-id="${message.id}">
            
        </div>`;
        prevMessageElem
            .querySelector(".message")
            .appendChild(
                this.#getMessageBody(message, message.id, { isReceived: true })
            );
        this.#setDate(prevMessageElem, message);

        return prevMessageElem;
    }
    #getThreeDotsContainerContent(id) {
        return `
            <div data-id=${id} class="dots-icon-cont">
                <div data-id=${id}></div> 
                <div data-id=${id}></div>
                <div data-id=${id}></div>
            </div>
            <ul data-id=${id}>
                <li data-id=${id}>
                    <button class="delete delete-${id}" data-id="${id}">Delete</button>
                </li>
                <li data-id=${id}>
                    <button class="edit edit-${id}" data-id="${id}">Edit</button>
                </li>
                <li data-id=${id}>
                    <button class="star star-${id}" data-id="${id}">Star</button>
                </li>
                <li data-id=${id}>
                    <button class="like like-${id}" data-id="${id}">Like</button>
                </li>
                <li data-id=${id}>
                    <button class="dislike dislike-${id}" data-id="${id}">Dislike</button>
                </li>
                <li data-id=${id}>
                    <button class="select-many select-many-${id}" data-id="${id}">Select Many</button>
                </li>
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
        newSendingMessageElem.setAttribute("data-id", id || newMessageId);
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
        <div class="three-dots-button three-dots-button-${newMessageId}" data-id="${newMessageId}">
            ${this.#getThreeDotsContainerContent(newMessageId)}
        </div>
        <div class="message js-message ${uniqueMessageClassName} message-${newMessageId}" data-id="${newMessageId} ">
            
        </div>`;
        let newMessageData = undefined;
        if (uniqueMessageClassName.includes("sent")) {
            newMessageData = {
                sent: typedMessage,
                timeStramp: new Date().toISOString(),
                isSent: true,
                id: newMessageId,
                containerClass: uniqueContainerClassName,
                messageClassName: uniqueMessageClassName,
                edited: false,
            };
            this.addMessage(newMessageData);
        } else {
            newMessageData = {
                receive: typedMessage,
                timeStramp: new Date().toISOString(),
                isSent: false,
                id: newMessageId,
                containerClass: uniqueContainerClassName,
                messageClassName: uniqueMessageClassName,
                edited: false,
            };
            this.addMessage(newMessageData);
        }

        newSendingMessageElem.querySelector(".message").appendChild(
            this.#getMessageBody(typedMessage, newMessageId, {
                isNewMessage: true,
            })
        );
        this.#setDate(newSendingMessageElem, newMessageData);

        return newSendingMessageElem;
    }

    deleteMessage(id) {
        console.log(this.allChats);
        this.allChats = this.allChats.filter((message) => {
            return message.id !== id;
        });
        console.log(this.allChats);
        this.#saveToLocalStorage();
    }

    update(id, value) {
        const matchingIndex = this.allChats.findIndex(
            (message) => message.id === id
        );

        if (matchingIndex !== -1) {
            // Ensure the message exists
            this.allChats[matchingIndex].sent = value;
            this.#saveToLocalStorage();
        }
    }
}

export const chats = new Chats();

import { chats } from "./data/chats.js";
import { getId } from "./utils/chat-util.js";

const chatSection = document.querySelector(".chat-section");
const cancelChat = document.querySelector(".cancel-chat");
const chatCont = document.querySelector(".chat-cont");
const messageTexarea = document.getElementById("message");
const userTypedMessgeElem = document.getElementById("message");

// get previous charts
getPreviousChats();

// hovered messages
document.querySelectorAll(".js-message").forEach((msg) => {
    msg.addEventListener("mouseover", () => {
        const { id: messageId } = msg.dataset;
        console.log(messageId);
        const hoveredMessage = document.querySelector(
            `.three-dots-button-${messageId}`
        );
        hoveredMessage.classList.add("show");
    });
});
const randomResponses = [
    "Hello, how are you doing",
    "Am fine and you?",
    "How was your day",
    "I am the best. doing great, you are good always",
];

chatSection.addEventListener("click", (event) => {
    chatSection.classList.add("open");
    chatSection.classList.remove("close");
});

cancelChat.addEventListener("click", (event) => {
    event.stopPropagation();
    chatSection.classList.remove("open");
    chatSection.classList.add("close");
});

const sendButton = document.querySelector(".send");
sendButton.addEventListener("click", sendMessage);

messageTexarea.addEventListener("keydown", function (event) {
    if (event.key == "Backspace") {
        this.style.height = "auto";
    } else {
        if (this.scrollHeight < 70) {
            this.style.height = this.scrollHeight + "px";
            // console.log(event);
        }
    }
});

function getPreviousChats() {
    document.querySelector(".chats").innerHTML = chats.getChats();
    scrollDownChats();
}

function respond() {
    let newResponseMassageElem = document.createElement("div");
    let responseBodyPElem = document.createElement("p");

    const responseIndex = Math.floor(Math.random() * randomResponses.length);
    const response = randomResponses[responseIndex];
    responseBodyPElem.textContent = response;

    console.log(response);

    chats.addMessage({
        receive: response,
        timeStramp: new Date().getDate(),
        isSent: false,
        id: getId(),
    });
    console.log(chats.allChats);

    newResponseMassageElem.appendChild(responseBodyPElem);
    newResponseMassageElem.classList.add("received-message-body");
    document.querySelector(".chats").appendChild(newResponseMassageElem);
}

function scrollDownChats() {
    chatCont.scrollTo({
        top: chatCont.scrollHeight,
        left: 0,
        behavior: "smooth",
    });
}

function emptyMessageTextarea() {
    userTypedMessgeElem.value = "";
}

function callRespond() {
    setTimeout(() => {
        respond();
        scrollDownChats();
    }, 500);
}

function _createElement(type) {
    return document.createElement(`${type}`);
}

function sendMessage() {
    const newMessageId = getId();
    let newSentMessageElement = _createElement("div");
    newSentMessageElement.classList.add(
        `message-container`,
        `message-${newMessageId}`,
        `sent-message-container`
    );
    // console.log(newSentMessageElement);

    let messsageBodyPreElem = document.createElement("pre");
    const typedMessage = userTypedMessgeElem.value;
    if (typedMessage.trim()) {
        newSentMessageElement.innerHTML = `
        <button class="three-dots-button three-dots-button-${newMessageId}">
            <div></div> <div></div><div></div>
        </button>
        <div class="message  js-message sent-message-body" data-id="${newMessageId}">
            <pre>
                ${typedMessage}
            </pre>
        </div>`;

        chats.addMessage({
            sent: userTypedMessgeElem.value,
            timeStramp: new Date().getDate(),
            isSent: true,
            id: newMessageId,
        });
        document.querySelector(".chats").appendChild(newSentMessageElement);

        userTypedMessgeElem.focus();
        scrollDownChats();
        // clear the message elem
        emptyMessageTextarea();

        callRespond();
        messageTexarea.style.height = "auto";
        getChats();
    }
}

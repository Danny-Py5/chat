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

function listenOnHovered(message) {
    message.addEventListener("mouseover", () => {
        const { id: messageId } = msg.dataset;
        console.log(messageId);
        const hoveredMessage = document.querySelector(
            `.three-dots-button-${messageId}`
        );
        hoveredMessage.classList.add("show");
    });
}

function getPreviousChats() {
    chats.getChats();
    scrollDownChats();
}

function respond() {
    const responseIndex = Math.floor(Math.random() * randomResponses.length);
    const response = randomResponses[responseIndex];

    const refinedMessage = chats.getrefinedMessage(response, {
        uniqueContainerClassName: "received-message-container",
        uniqueMessageClassName: "received-message-body",
    });
    // console.log(chats.allChats);

    // ewResponseMassageElem.appendChild(responseBodyPElem);
    // newResponseMassageElem.classList.add("received-message-body");
    document.querySelector(".chats").appendChild(refinedMessage);

    scrollDownChats();
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

function sendMessage() {
    // console.log(newSentMessageElement);
    const typedMessage = userTypedMessgeElem.value;
    if (typedMessage.trim()) {
        const refinedMessage = chats.getrefinedMessage(typedMessage, {
            uniqueContainerClassName: "sent-message-container",
            uniqueMessageClassName: "sent-message-body",
        });

        // refinedMessage.addEventListener('mouseover', () => {
        //     listenOnHovered
        // })
        document.querySelector(".chats").appendChild(refinedMessage);
        console.log(refinedMessage);

        userTypedMessgeElem.focus();
        scrollDownChats();
        // clear the message elem
        emptyMessageTextarea();

        callRespond();
        messageTexarea.style.height = "auto";
    }
}

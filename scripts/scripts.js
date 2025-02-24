/*
if this file name must be changed, in the styles.css, the file name (script.js) must also be changed to the name this current file(scripts.js) is changed to inside the .three-dots-button.fade-out class.
*/
import { chats } from "../data/chats.js";
import {
    activateActionsOnPreviousMessages,
    activateActionsOnNewMessage,
} from "./chat-options.js";

export const chatSection = document.querySelector(".chat-section");
const cancelChat = document.querySelector(".cancel-chat");
const chatCont = document.querySelector(".chat-cont");
const messageTexarea = document.getElementById("message");
const userTypedMessgeElem = document.getElementById("message");

// get previous charts
loadChats();
activateActionsOnPreviousMessages();

// hovered messages
export const hoveredEventWeakMap = new WeakMap();

document.querySelectorAll(".message-container").forEach((messageCont) => {
    listenWhenHovered(messageCont);
});

export let currentThreeDotButtonElem = undefined;
const threeDotsButtonElements = document.querySelectorAll(".three-dots-button");

threeDotsButtonElements.forEach((button) => {
    button.addEventListener("click", (event) => {
        // [...threeDotsButtonElements].map((button) => {
        //     if (button.classList.contains("expanded")) {
        //         button.classList.remove("expanded");
        //     }
        // });
        showMessageActions(button, event);
        currentThreeDotButtonElem = button;
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
    // removeShownThreeDotsButtons();

    if (currentThreeDotButtonElem) {
        if (!currentThreeDotButtonElem.contains(event.target)) {
            currentThreeDotButtonElem.classList.remove("expanded");
            hideThreeDotsButtonOvertime(currentThreeDotButtonElem);
            currentThreeDotButtonElem = undefined;
        }
    }
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

export function loadChats() {
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

    refinedMessage.addEventListener("mousemove", () => {
        listenWhenHovered(refinedMessage);
    });
    newMessageThreeDotsButtonClickEvent(
        refinedMessage.querySelector(".three-dots-button")
    );
    activateActionsOnNewMessage(refinedMessage);
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
function callRespond() {
    setTimeout(() => {
        respond();
        scrollDownChats();
    }, 500);
}
function emptyMessageTextarea() {
    userTypedMessgeElem.value = "";
}
export function restCurrentThreeDotButtonElem() {
    currentThreeDotButtonElem = undefined;
}

function sendMessage() {
    // console.log(newSentMessageElement);
    const typedMessage = userTypedMessgeElem.value;
    if (typedMessage.trim()) {
        const refinedMessage = chats.getrefinedMessage(typedMessage, {
            uniqueContainerClassName: "sent-message-container",
            uniqueMessageClassName: "sent-message-body",
        });
        refinedMessage.addEventListener("mouseover", () => {
            listenWhenHovered(refinedMessage);
        });
        newMessageThreeDotsButtonClickEvent(
            refinedMessage.querySelector(".three-dots-button")
        );
        activateActionsOnNewMessage(refinedMessage);

        document.querySelector(".chats").appendChild(refinedMessage);
        userTypedMessgeElem.focus();
        scrollDownChats();
        emptyMessageTextarea();
        callRespond();
        messageTexarea.style.height = "auto";
    }
}

export function listenWhenHovered(messageCont) {
    const moveHandler = () => {
        if (!currentThreeDotButtonElem) {
            removeShownThreeDotsButtons();
            const { messageContainerId } = messageCont.dataset;
            const hoveredMessageThreeDotsButton = document.querySelector(
                `.three-dots-button-${messageContainerId}`
            );

            hoveredMessageThreeDotsButton.classList.add("show");
            hideThreeDotsButtonOvertime(hoveredMessageThreeDotsButton);
        }
    };

    messageCont.addEventListener("mouseover", moveHandler);
    hoveredEventWeakMap.set(messageCont, moveHandler);
}

let timeOut = undefined;
async function hideThreeDotsButtonOvertime(hoveredMessageThreeDotsButton) {
    if (timeOut) clearTimeout(timeOut);

    try {
        await new Promise((resolve, reject) => {
            timeOut = setTimeout(() => {
                if (
                    !hoveredMessageThreeDotsButton.classList.contains(
                        "expanded"
                    )
                ) {
                    hoveredMessageThreeDotsButton.classList.add("fade-out");
                    resolve();
                }
                return reject("Not completed!");
            }, 3000);
        });
        setTimeout(() => {
            hoveredMessageThreeDotsButton.classList.remove("fade-out");
            hoveredMessageThreeDotsButton.classList.remove("show");
        }, 500);
    } catch (error) {}
}
export function removeShownThreeDotsButtons() {
    const allMessagesContainer =
        document.querySelectorAll(".message-container");
    [...allMessagesContainer].map((container) => {
        const threeDotsElem = container.querySelector(".three-dots-button");
        if (threeDotsElem.classList.contains("show")) {
            threeDotsElem.classList.remove("show");
        }
    });
}

function showMessageActions(button) {
    button.classList.add("expanded");
    currentThreeDotButtonElem = undefined;
}

function newMessageThreeDotsButtonClickEvent(threeDotsButtonElem) {
    threeDotsButtonElem.addEventListener("click", () => {
        if (threeDotsButtonElem.classList.contains("expanded")) {
            threeDotsButtonElem.classList.remove("expanded");
        }
        showMessageActions(threeDotsButtonElem);
        currentThreeDotButtonElem = threeDotsButtonElem;
    });
}

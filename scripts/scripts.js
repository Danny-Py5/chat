/*
if this file name must be changed, in the styles.css, the file name (script.js) must also be changed to the name this current file(scripts.js) is changed to inside the .three-dots-button.fade-out class.
*/
import { chats } from "../data/chats.js";
import { activateActionsOnPreviousMessages } from "./chat-options.js";

export const chatSection = document.querySelector(".chat-section");
const cancelChat = document.querySelector(".cancel-chat");
const chatCont = document.querySelector(".chat-cont");
export const messageTextarea = document.getElementById("message");
const userTypedMessgeElem = document.getElementById("message");

// get previous charts
loadChats();
activateActionsOnPreviousMessages();

// hovered messages
// export const hoveredEventWeakMap = new WeakMap();

export let currentThreeDotButtonElem = undefined;

document.querySelectorAll(".message-container").forEach((messageCont) => {
    listenWhenHovered(messageCont);
});

const threeDotsButtonElements = document.querySelectorAll(".three-dots-button");

threeDotsButtonElements.forEach((button) => {
    button.addEventListener("click", (event) => {
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
    // console.log("cliked the chat section ");
});

cancelChat.addEventListener("click", (event) => {
    event.stopPropagation();
    chatSection.classList.remove("open");
    chatSection.classList.add("close");
});

export const sendButton = document.querySelector(".send");
sendButton.addEventListener("click", sendMessage);

messageTextarea.addEventListener("input", function (event) {
    // Reset height to prevent unnecessary growing
    this.style.height = "auto";

    // Adjust height based on content
    this.style.height = Math.max(this.scrollHeight, 30) + "px";

    // If deleting, ensure height adjusts properly
    if (event.inputType === "deleteContentBackward") {
        this.style.height = Math.max(this.scrollHeight, 30) + "px";
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
export function emptyMessageTextarea() {
    userTypedMessgeElem.value = "";
}
export function restCurrentThreeDotButtonElem() {
    currentThreeDotButtonElem = undefined;
}

export function sendMessage() {
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
        document.querySelector(".chats").appendChild(refinedMessage);
        userTypedMessgeElem.focus();
        scrollDownChats();
        emptyMessageTextarea();
        callRespond();
        messageTextarea.style.height = "auto";
    }
}

export function listenWhenHovered(messageCont, event) {
    messageCont.addEventListener("mouseover", () => {
        if (!currentThreeDotButtonElem) {
            removeShownThreeDotsButtons();
            const { messageContainerId } = messageCont.dataset;
            const hoveredMessageThreeDotsButton = document.querySelector(
                `.three-dots-button-${messageContainerId}`
            );

            hoveredMessageThreeDotsButton.classList.add("show");
            hideThreeDotsButtonOvertime(hoveredMessageThreeDotsButton);
        }
    });
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

chatCont.addEventListener("scroll", () => {
    if (chatCont.scrollTop < -50) {
        // If pulled down too much
        chatCont.scrollTop = 0; // Bounce back
    }
});

function showMessageActions(button) {
    const buttonRect = button.getBoundingClientRect();
    const scroll = (by) => {
        chatCont.scrollTo({
            top: chatCont.scrollTop - by,
            behavior: "smooth",
        });
    };
    console.log(buttonRect);
    if (buttonRect.top < 130) {
        scroll(150);
    } else if (buttonRect.top < 170) {
        scroll(100);
    } else if (buttonRect.top < 205) {
        scroll(30);
    }
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

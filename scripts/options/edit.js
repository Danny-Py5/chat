import { sendButton, sendMessage, messageTextarea } from "../scripts.js";
import { chats } from "../../data/chats.js";
import {
    hideChatHeadOptions,
    showChatHeadOptions,
    hideThreeDotsButton,
    unhideThreeDotsButton,
} from "./general.js";

const chatHead = document.querySelector(".chat-head");
const chatCont = document.querySelector(".chat-cont");

export function moveEdit(id) {
    sendButton.removeEventListener("click", sendMessage);
    messageTextarea.focus();

    hideThisThreeDotsButtons(id);
    activateEditing();

    const mouseDownhandler = () => {
        updateMessageText(id);
    };

    const editingMessage = document.querySelector(`.editing__message-cont`);
    editingMessage.innerHTML = chatCont.querySelector(
        `.message-container-${id}`
    ).outerHTML;

    messageTextarea.value = getEditingMessageText(editingMessage);
    messageTextarea.style.height = messageTextarea.scrollHeight + "px";

    sendButton.addEventListener("mousedown", mouseDownhandler);
    const removeEventsAfterMouseUp = () => {
        sendButton.removeEventListener("mousedown", mouseDownhandler);
        sendButton.addEventListener("click", sendMessage);

        setTimeout(() => {
            sendButton.removeEventListener("mouseup", removeEventsAfterMouseUp);
            deActivateEditing();
            unhideThreeDotsButton(
                chatCont.querySelector(`.three-dots-button-${id}`)
            );

            console.log("executed");
        }, 100);
    };
    sendButton.addEventListener("mouseup", removeEventsAfterMouseUp);
}

function updateMessageText(id) {
    if (messageTextarea.value) {
        chats.update(id, messageTextarea.value);
        chatCont.querySelector(`.message-text-${id}`).innerText =
            messageTextarea.value.trim();
    }
}

function getEditingMessageText(editingMessage) {
    return editingMessage.querySelector("pre").textContent;
}

function activateEditing() {
    chatCont.classList.add("editing");
    chatHead.classList.add("editing");
    showChatHeadOptions();
}

function deActivateEditing() {
    chatCont.classList.remove("editing");
    chatHead.classList.remove("editing");
    hideChatHeadOptions();
}

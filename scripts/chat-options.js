import { chats } from "../data/chats.js";
import { sendButton, messageTextarea } from "./scripts.js";
import { _createElement } from "../utils/chat-util.js";

const chatHead = document.querySelector(".chat-head");
const chatHeadOptionsElem = document.querySelector(".options");
const chatHeadBackButon = document.querySelector(".back-options");
const chatHeadDeleteButon = document.querySelector(".options_delete");
const chatCont = document.querySelector(".chat-cont");

const selectedMessagesId = [];
const removedThreeDotsButtons = [];

const back = () => {
    selectedMessagesId.forEach((id) => {
        const selectedMessage = document.querySelector(
            `.message-container-${id}`
        );
        selectedMessage.classList.remove("selected");
        cancleSelection();
    });
};
chatHeadBackButon.addEventListener("click", back);

export function activateActionsOnPreviousMessages() {
    chatCont.addEventListener("click", (event) => {
        // event.stopPropagation();

        if (event.target.innerText == "Delete") {
            const { id } = event.target.dataset;
            deleteHandler(id);
        } else if (event.target.innerText == "Select Many") {
            selectManyHandler(event.target.dataset.id);
        } else if (event.target.innerText == "Edit") {
            moveEdit(event.target.dataset.id);
        }
    });
}
function deleteHandler(id) {
    const thisButtonMessageContainer = chatCont.querySelector(
        `.message-container-${id}`
    );
    chats.deleteMessage(id);
    thisButtonMessageContainer.remove();
}

function moveEdit(id) {
    hideThreeDotsButton(chatCont.querySelector(`.three-dots-button-${id}`));
    activateEditing();

    const editingMessage = document.querySelector(`.editing__message-cont`);
    editingMessage.innerHTML = chatCont.querySelector(
        `.message-container-${id}`
    ).outerHTML;
    messageTextarea.value = getEditingMessageText(editingMessage);
}

function getEditingMessageText(editingMessage) {
    return editingMessage.querySelector("pre").textContent;
}

function activateEditing() {
    chatCont.classList.add("editing");
    chatHead.classList.add("editing");
    showChatHeadOptions();
}

const selectManyWeakMap = new WeakMap();
function selectManyHandler(id) {
    addSelected(chatCont.querySelector(`.message-container-${id}`));
    const hoverHandler = (event) => {
        const { id: targetedElementId } = event.target.dataset;
        const targetedElement = chatCont.querySelector(
            `.three-dots-button-${targetedElementId}`
        );
        if (targetedElement) {
            hideThreeDotsButton(targetedElement);
        }
    };
    chatCont.addEventListener("mouseover", hoverHandler);

    const mouseUpHandler = (event) => {
        // console.log("clicked the chatcont ");
        const selectedMessage = chatCont.querySelector(
            `.message-container-${event.target.dataset.id}`
        );
        if (selectedMessage) {
            addSelected(selectedMessage);
        }
    };
    chatCont.addEventListener("mouseup", mouseUpHandler);

    // set in weakMap
    selectManyWeakMap.set(chatCont, [hoverHandler, mouseUpHandler]);
    showChatHeadOptions();
}
function cancleSelection() {
    if (selectedMessagesId.length <= 0) {
        hideChatHeadOptions();

        const handler = selectManyWeakMap.get(chatCont);
        // console.log(handler);
        if (handler) {
            chatCont.removeEventListener("mouseover", handler[0]);
            chatCont.removeEventListener("mouseup", handler[1]);
            selectManyWeakMap.delete(chatCont);
        }
        unhideThreeDotsButtons();
    }
}
function showChatHeadOptions() {
    chatHeadOptionsElem.classList.remove("hide");
    chatHeadOptionsElem.classList.add("show");
}
function hideChatHeadOptions() {
    chatHeadOptionsElem.classList.remove("show");
    chatHeadOptionsElem.classList.add("hide");
}

function hideThreeDotsButton(button) {
    if (!button.classList.contains("hide")) {
        button.classList.add("hide");
        removedThreeDotsButtons.push(button);
    }
}
function unhideThreeDotsButtons() {
    removedThreeDotsButtons.forEach((button) => {
        button.classList.remove("hide");
    });
    removedThreeDotsButtons.splice(0);
    // console.log(removedThreeDotsButtons)
}

function addSelected(message) {
    const { messageContainerId: id } = message.dataset;
    if (
        !selectedMessagesId.includes(id) &&
        !message.classList.contains("selected")
    ) {
        selectedMessagesId.push(id);
        message.classList.add("selected");
    } else {
        selectedMessagesId.splice(selectedMessagesId.indexOf(id), 1);
        message.classList.remove("selected");
    }
    cancleSelection();
    // console.log(selectedMessagesId);
}

import { chats } from "../data/chats.js";
import {} from "./scripts.js";

const chatHeadOptionsElem = document.querySelector(".options");
const chatHeadBackButon = document.querySelector(".back-options");
const chatHeadDeleteButon = document.querySelector(".options_delete");

const selectedMessagesId = [];

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
    const allDeleteButtons = document.querySelectorAll(".delete");
    const allSelectManyButtons = document.querySelectorAll(".select-many");

    allDeleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteHandler(button);
        });
    });
    allSelectManyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectManyHandler(button);
        });
    });
}
export function activateActionsOnNewMessage(refinedMessage) {
    const deleteButton = refinedMessage.querySelector(".delete");
    const selectManyButton = refinedMessage.querySelector(".select-many");

    deleteButton.addEventListener("click", function () {
        deleteHandler(deleteButton);
    });
    selectManyButton.addEventListener("click", () => {
        selectManyHandler(selectManyButton);
    });
}

function deleteHandler(button) {
    const { id } = button.dataset;
    chats.deleteMessage(id);

    const thisButtonMessageContainer = document.querySelector(
        `.message-container-${id}`
    );
    thisButtonMessageContainer.remove();
}

const selectManyWeakMap = new WeakMap();
function selectManyHandler(button) {
    const { id } = button.dataset;
    clearFirstSelectedThreeDotsButtons(id);

    const allMessageContainers =
        document.querySelectorAll(".message-container");

    document.querySelectorAll(".message-container").forEach((messageCont) => {
        hideThreeDotsButtons();

        const handler = () => {
            const selectedMessageElement = document.querySelector(
                `.message-container-${newlySelectedMsgId}`
            );
            addSelected(selectedMessageElement);
        };
        const { messageContainerId: newlySelectedMsgId } = messageCont.dataset;

        messageCont.addEventListener("click", handler);
        selectManyWeakMap.set(messageCont, handler);
    });
    showChatHeadOptions();
}
function cancleSelection() {
    if (selectedMessagesId.length <= 0) {
        hideChatHeadOptions();

        const allMessageContainers =
            document.querySelectorAll(".message-container");
        allMessageContainers.forEach((messageCont) => {
            const handler = selectManyWeakMap.get(messageCont);
            messageCont.removeEventListener("click", handler);
            selectManyWeakMap.delete(handler);
        });

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

function clearFirstSelectedThreeDotsButtons(id) {
    console.log("asdfasd");
    const threeDotButton = document.querySelector(`.three-dots-button-${id}`);
    threeDotButton.classList.remove("show");
    threeDotButton.classList.remove("expanded");
}

function hideThreeDotsButtons() {
    document.querySelectorAll(".three-dots-button").forEach((button) => {
        button.classList.add("hide");
    });
}
function unhideThreeDotsButtons() {
    document.querySelectorAll(".three-dots-button").forEach((button) => {
        button.classList.remove("hide");
    });
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
    console.log(selectedMessagesId);
}

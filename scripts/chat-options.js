import { chats } from "../data/chats.js";
import {
    currentThreeDotButtonElem,
    removeShownThreeDotsButtons,
    listenWhenHovered,
    restCurrentThreeDotButtonElem,
    hoveredEventWeakMap,
} from "./scripts.js";

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

function selectManyHandler(button) {
    const { id } = button.dataset;

    clearFirstSelectedThreeDotsButtons(id);

    document.querySelectorAll(".message-container").forEach((messageCont) => {
        let { messageContainerId: newlySelectedMsgId } = messageCont.dataset;
        const selectedMessageElement = document.querySelector(
            `.message-container-${newlySelectedMsgId}`
        );
        messageCont.addEventListener("click", () => {
            addSelectClass(selectedMessageElement);
        });
        removeHoveredEvent(messageCont);
    });
}

function clearFirstSelectedThreeDotsButtons(id) {
    const threeDotButton = document.querySelector(`.three-dots-button-${id}`);
    threeDotButton.classList.remove("show");
    threeDotButton.classList.remove("expanded");
}

function removeHoveredEvent(messageCont) {
    const handler = hoveredEventWeakMap.get(messageCont);
    console.log(handler);
    if (handler) {
        messageCont.removeEventListener("mouseover", handler);
        hoveredEventWeakMap.delete(messageCont);
    }
}

function addSelectClass(message) {
    console.log(message);
    if (!message.classList.contains("selected")) {
        message.classList.add("selected");
    } else {
        message.classList.remove("selected");
    }
}

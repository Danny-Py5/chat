import {
    showChatHeadOptions,
    hideThreeDotsButton,
    hideChatHeadOptions,
    unhideThreeDotsButtons,
} from "./general.js";
import { chatCont } from "../scripts.js";

const selectedMessagesId = [];

export const back = () => {
    selectedMessagesId.forEach((id) => {
        const selectedMessage = document.querySelector(
            `.message-container-${id}`
        );
        selectedMessage.classList.remove("selected");
        cancleSelection();
    });
};

const selectManyWeakMap = new WeakMap();

export function selectManyHandler(id) {
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

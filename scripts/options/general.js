import { chatCont } from "../scripts.js";
const chatHeadOptionsElem = document.querySelector(".options");

const removedThreeDotsButtons = [];

export function showChatHeadOptions() {
    chatHeadOptionsElem.classList.remove("hide");
    chatHeadOptionsElem.classList.add("show");
}

export function hideChatHeadOptions() {
    chatHeadOptionsElem.classList.remove("show");
    chatHeadOptionsElem.classList.add("hide");
}

export function hideThreeDotsButton(button) {
    if (!button.classList.contains("hide")) {
        button.classList.add("hide");
        removedThreeDotsButtons.push(button);
    }
}

export function unhideThreeDotsButton(button) {
    if (button.classList.contains("hide")) {
        button.classList.remove("hide");
        removedThreeDotsButtons.push(button);
    }
}

export function unhideThreeDotsButtons() {
    removedThreeDotsButtons.forEach((button) => {
        button.classList.remove("hide");
    });
    // clear the array
    removedThreeDotsButtons.splice(0);
    // console.log(removedThreeDotsButtons)
}

export function unexpandThisThreeDotsButton(id) {
    const button = chatCont.querySelector(`.three-dots-button-${id}`);
    if (button.classList.contains("expanded")) {
        button.classList.remove("expanded");
        chatCont.click();
    }
}

// export function hideThisThreeDotsButton(id) {
//     hideThreeDotsButton(chatCont.querySelector(`.three-dots-button-${id}`));
// }

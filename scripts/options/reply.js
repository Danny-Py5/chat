import { chatCont } from "../scripts.js";
import { _createElement } from "../../utils/chat-util.js";
import { hideThreeDotsButton, unexpandThisThreeDotsButton } from "./general.js";

const messageInputSectionElem = document.getElementById(
    "messageInputSectionContainer"
);

messageInputSectionElem
    .querySelector(".cancel-reply")
    .addEventListener("click", hideReplyElement);

let replyMessageId = undefined;
export function replyHandler(id) {
    // console.log({ newid: id, replyMessageId });
    unexpandThisThreeDotsButton(id);

    if (id !== replyMessageId) {
        updateReplyElement(id);
        replyMessageId = id;
    }
}

function showReplyElement() {
    messageInputSectionElem.querySelector(".reply-cont").classList.add("show");
}
function hideReplyElement() {
    messageInputSectionElem
        .querySelector(".reply-cont")
        .classList.remove("show");
}
function getReplyMessageElem(id) {
    const textElem = chatCont.querySelector(`.message-text-${id}`);

    const pre = _createElement("pre");
    pre.textContent = textElem.textContent;

    return pre;
}

function updateReplyElement(id) {
    showReplyElement();
    const userNameElem = document.querySelector(".user-details .user-name");

    messageInputSectionElem.querySelector(".message-owner").textContent =
        userNameElem.textContent;
    const replyElem = messageInputSectionElem.querySelector(".reply-text");
    replyElem.innerHTML = "";

    const replyMessageElement = getReplyMessageElem(id);

    replyElem.append(replyMessageElement);
}

import { chats } from "../../data/chats.js";
import { chatCont } from "../scripts.js";

export function deleteHandler(id) {
    const thisButtonMessageContainer = chatCont.querySelector(
        `.message-container-${id}`
    );

    chats.deleteMessage(id);
    thisButtonMessageContainer.remove();
    chatCont.click(); // i discover that the option menue don't show not until a click, and this might cause stress. And i guess internal click will resolve the extral click
}

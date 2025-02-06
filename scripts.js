const chatSection = document.querySelector(".chat-section");
const cancelChat = document.querySelector(".cancel-chat");
const chatCont = document.querySelector(".chat-cont");
const messageTexarea = document.getElementById("message");
const userTypedMessgeElem = document.getElementById("message");

function scrollDownChats() {
    chatCont.scrollTo({
        top: chatCont.scrollHeight,
        left: 0,
        behavior: "smooth",
    });
}

function emptyMessageTextarea() {
    userTypedMessgeElem.value = "";
}

function callRespond() {
    setTimeout(() => {
        respond();
        scrollDownChats();
    }, 500);
}

function _createElement(type) {
    return document.createElement(`${type}`);
}

function sendMessage() {
    let newSentMassageElem = _createElement("div");
    let messsageBodyPreElem = document.createElement("pre");

    if (userTypedMessgeElem.value.trim()) {
        messsageBodyPreElem.textContent = userTypedMessgeElem.value;
        newSentMassageElem.appendChild(messsageBodyPreElem);
        newSentMassageElem.classList.add("sent-message-body");

        document.querySelector(".chats").appendChild(newSentMassageElem);

        userTypedMessgeElem.focus();
        scrollDownChats();
        // clear the message elem
        emptyMessageTextarea();
        callRespond();
        messageTexarea.style.height = "auto";
    }
}
const randomResponses = [
    "Hello, how are you doing",
    "Am fine and you?",
    "How was your day",
    "I am the best. doing great, you are good always",
];

function respond() {
    let newResponseMassageElem = document.createElement("div");
    let responseBodyPElem = document.createElement("p");

    const responseIndex = Math.floor(Math.random() * randomResponses.length);
    responseBodyPElem.textContent = randomResponses[responseIndex];

    newResponseMassageElem.appendChild(responseBodyPElem);
    newResponseMassageElem.classList.add("received-message-body");
    document.querySelector(".chats").appendChild(newResponseMassageElem);
}

chatSection.addEventListener("click", (event) => {
    chatSection.classList.add("open");
    chatSection.classList.remove("close");
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

const socket = io("http://localhost:3000");
const message = document.getElementById("type-msg");
let chatlist = document.querySelectorAll(".chat-info");
let sender_name, responder, chatmessages, shouldScroll;
let sender = document.querySelector(".chat-info").dataset.id
let realchat = document.querySelector(".realchat");

chatlist = Array.from(chatlist);

chatlist.map((item) => {
    item.addEventListener("click", () => {
        sender = item.dataset.id;
        sender_name = item.dataset.name;
        realchat.innerHTML = "";
        //fetch all chat
    });
});

const connect = () => {
    // get username
    responder = "708d7cac-4700-4698-9ec0-81da1959502e";
    // send it to server
    socket.emit("user_connected", responder);
    //save my name in global variable
    // prevent the form from submitting
    return false;
};

connect();

const sendMessage = () => {
    // get message
    if (event.keyCode === 13) {
        const text = message.value;

        chatmessages = document.querySelector(".chat-messages");

        let respond = document.createElement("div");
        let chatcontainer = document.createElement("div");
        let chatrespond = document.createElement("div");
        let flipod = document.createElement("div");
        let chatmsg = document.createElement("div");
        let time = document.createElement("div");
        let span = document.createElement("span");
        let sent = document.createElement("span");
        let img = document.createElement("img");

        time.classList.add("time");
        span.textContent = "11:46 AM";
        time.appendChild(span);
        img.src = "img/admin-dash-messages/sent.svg";
        img.alt = "delivered";
        sent.classList.add("sent");
        sent.appendChild(img);
        time.appendChild(sent);
        flipod.classList.add("flippd");
        chatmsg.classList.add("chatmsg");
        chatmsg.textContent = text;
        flipod.appendChild(chatmsg);
        chatrespond.classList.add("chat-respond", "msg");
        chatrespond.appendChild(flipod);
        chatcontainer.classList.add("chat-container", "respond");
        chatcontainer.appendChild(chatrespond);
        respond.classList.add("respond");
        respond.appendChild(chatcontainer);
        respond.appendChild(time);

        realchat.appendChild(respond);
        shouldScroll =
            chatmessages.scrollTop + chatmessages.clientHeight ===
            chatmessages.scrollHeight;
        message.value = "";
        if (!shouldScroll) {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }

        // send message to server
        socket.emit("send_message", {
            sender: responder,
            receiver: sender,
            message: text,
            read_status: false,
            sender_name: "Joshua",
        });
    }
};

message.addEventListener("keyup", sendMessage);

socket.on("new_message", function (data) {
    if (data.receiver !== responder || data.sender !== sender) {
        return
    }
    console.log(data);
    let sender1 = document.createElement("div");
    let chatcontainer = document.createElement("div");
    let chatsender = document.createElement("div");
    let chatmsg = document.createElement("div");
    let time = document.createElement("div");
    let span = document.createElement("span");
    realchat = document.querySelector(".realchat");
    chatmessages = document.querySelector(".chat-messages");

    span.textContent = "11:46 AM";
    time.classList.add("time");
    time.appendChild(span);
    chatmsg.classList.add("chatmsg");
    chatmsg.textContent = data.message;
    chatsender.classList.add("chat-sender", "msg");
    chatsender.appendChild(chatmsg);
    chatcontainer.classList.add("chat-container");
    chatcontainer.appendChild(chatsender);
    sender1.classList.add("sender");
    sender1.appendChild(chatcontainer);
    sender1.appendChild(time);

    if (data.sender === responder) {
        return;
    }
    realchat.appendChild(sender1);
    shouldScroll =
        chatmessages.scrollTop + chatmessages.clientHeight ===
        chatmessages.scrollHeight;
    message.value = "";
    if (!shouldScroll) {
        chatmessages.scrollTop = chatmessages.scrollHeight;
    }
});
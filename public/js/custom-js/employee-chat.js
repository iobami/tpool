const socket = io("http://localhost:3000");
const message = document.getElementById("type-msg");

let sender_name, responder, chatmessages, par, shouldScroll;
let realchat = document.querySelector(".realchat");
let chatname = document.querySelector(".chat-scroll-view");


const getUsers = () => {
    //fetch all users here to replace this
    let users = {
        "status": "success",
        "data": {
            "data": [{
                    "user_id": "303ce17b-1a6a-4b81-93d2-26deb3522c33",
                    "first_name": "Segun",
                    "last_name": "Adebayo"
                },
                {
                    "user_id": "6a9ab674-d301-45fe-91db-7491f90ead3a",
                    "first_name": "Joshua",
                    "last_name": "Adesanya"
                }
            ]
        }
    }

    function toggleBack() {
        var x = document.getElementsByClassName("main-section");
        var messageToggle = document.getElementById("inbox-top");
        var messages = document.getElementById("right-side");

        if (window.screen.width > 768) {
            return;
        }
        for (var i = 0; i < x.length; i++) {
            if (x[i].style.display === "none") {
                x[i].style.display = "block";
                messageToggle.style.display = "none";
                messages.style.display = "none";
            } else {
                x[i].style.display = "none";
                messageToggle.style.display = "block";
                messages.style.display = "block";
            }
        }
    }


    let chatusers = users.data.data
    console.log(chatusers)
    let name = ""
    chatusers.map((item) => {

        if (item.employer_name) {
            name = item.employer_name
        } else {
            name = item.first_name + " " + item.last_name
        }
        let id = item.user_id

        par = document.createElement("div");
        par.classList.add("card", "d-flex", "flex-row", "mb-3", "p-3", "chat-card")
        par.addEventListener("click", toggleBack)
        let imgdiv = document.createElement("div");
        imgdiv.classList.add("mb-1", "img-class");
        let img = document.createElement("img");
        img.src = "img/admin-dash-messages/Ellipse 30.png"
        img.alt = "img"
        img.classList.add("dp-img")
        imgdiv.appendChild(img);

        let chatInfo = document.createElement("div");
        chatInfo.classList.add("chat-info");
        chatInfo.dataset.name = name;
        chatInfo.dataset.id = id;

        let contenttop = document.createElement("div");
        contenttop.classList.add("content-top", "d-flex", "flex-row", "justify-content-between")
        let contentname = document.createElement("p");
        contentname.classList.add("contact-name", "mb-0", "font-weight-bold");
        contentname.textContent = name;
        let contenttime = document.createElement("p");
        contenttime.classList.add("time-sent", "mb-0")
        contenttop.appendChild(contentname);
        contenttop.appendChild(contenttime);

        let contentbottom = document.createElement("div");
        contentbottom.classList.add("content-bottom", "d-flex", "flex-row")
        let pc = document.createElement("p");
        pc.classList.add("mb-0", "pr-2");
        let bimg = document.createElement("img");
        bimg.src = "img/admin-dash-messages/Read-tick.svg";
        bimg.classList.add("check-mark");
        bimg.alt = "dp-img/";
        pc.appendChild(bimg);
        contentbottom.appendChild(pc)

        chatInfo.appendChild(contenttop);
        chatInfo.appendChild(contentbottom);

        par.appendChild(imgdiv);
        par.appendChild(chatInfo);

        chatname.appendChild(par);
    })

    console.log(chatname)
}

getUsers();
let chatlist = document.querySelectorAll(".chat-info");
chatlist = Array.from(chatlist);
let sender = document.querySelector(".chat-info").dataset.id;

chatlist.map((item) => {
    item.addEventListener("click", function () {
        sender = item.dataset.id;
        sender_name = item.dataset.name;
        realchat.innerHTML = "";
        //fetch previous chat messages
    });
});

console.log(sender);

const connect = () => {
    // get user_id from localstorage to replace this id
    responder = "e9186b23-ef8f-450c-8608-741686e5ce61";
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
            sender_name: "Ade",
        });
    }
};

message.addEventListener("keyup", sendMessage);

socket.on("new_message", function (data) {

    if (data.receiver !== responder || data.sender !== sender) {
        return
    }

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
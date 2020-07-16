const socket = io('/');
const message = document.getElementById('type-msg');
let sender_name, receiver, chatmessages, check, par, shouldScroll;
let realchat = document.querySelector('.realchat');
let chatname = document.querySelector('.chat-scroll-view');
let sender = document.querySelector('.chat').dataset.user;

function toggleBack() {
    var x = document.getElementsByClassName('main-section');
    var messageToggle = document.getElementById('inbox-top');
    var messages = document.getElementById('right-side');

    if (window.screen.width > 768) {
        return;
    }
    for (var i = 0; i < x.length; i++) {
        if (x[i].style.display === 'none') {
            x[i].style.display = 'block';
            messageToggle.style.display = 'none';
            messages.style.display = 'none';
        } else {
            x[i].style.display = 'none';
            messageToggle.style.display = 'block';
            messages.style.display = 'block';
        }
    }
}

function getAllMessages() {
    let chatlist = document.querySelectorAll('.chat-info');
    chatlist = Array.from(chatlist);
    receiver = window.document.querySelector('.chat-info').dataset.id;

    chatlist.map((item) => {
        item.addEventListener('click', () => {
            check = true;
            receiver = item.dataset.id;
            receiver_name = item.dataset.name;
            realchat.innerHTML = '';
            console.log(sender, receiver);

            axios
                .get(`/admin/message/${sender}/${receiver}`)
                .then((res) => {
                    res.data.data.forEach((item) => {
                        console.log(item)

                        if (item.user_id === sender) {
                            chatmessages = document.querySelector('.chat-messages');

                            let respond = document.createElement('div');
                            let chatcontainer = document.createElement('div');
                            let chatrespond = document.createElement('div');
                            let flipod = document.createElement('div');
                            let chatmsg = document.createElement('div');
                            let time = document.createElement('div');
                            let span = document.createElement('span');
                            let sent = document.createElement('span');
                            let img = document.createElement('img');

                            time.classList.add('time');
                            span.textContent = '';
                            time.appendChild(span);
                            img.src = '../img/admin-dash-messages/sent.svg';
                            img.alt = 'delivered';
                            sent.classList.add('sent');
                            //sent.appendChild(img);
                            time.appendChild(sent);
                            flipod.classList.add('flippd');
                            chatmsg.classList.add('chatmsg');
                            chatmsg.textContent = item.message;
                            flipod.appendChild(chatmsg);
                            chatrespond.classList.add('chat-respond', 'msg');
                            chatrespond.appendChild(flipod);
                            chatcontainer.classList.add('chat-container', 'respond');
                            chatcontainer.appendChild(chatrespond);
                            respond.classList.add('respond');
                            respond.appendChild(chatcontainer);
                            respond.appendChild(time);

                            realchat.appendChild(respond);
                        } else {
                            let sender1 = document.createElement('div');
                            let chatcontainer = document.createElement('div');
                            let chatsender = document.createElement('div');
                            let chatmsg = document.createElement('div');
                            let time = document.createElement('div');
                            let span = document.createElement('span');
                            realchat = document.querySelector('.realchat');
                            chatmessages = document.querySelector('.chat-messages');

                            span.textContent = '';
                            time.classList.add('time');
                            time.appendChild(span);
                            chatmsg.classList.add('chatmsg');
                            chatmsg.textContent = item.message;
                            chatsender.classList.add('chat-sender', 'msg');
                            chatsender.appendChild(chatmsg);
                            chatcontainer.classList.add('chat-container');
                            chatcontainer.appendChild(chatsender);
                            sender1.classList.add('sender');
                            sender1.appendChild(chatcontainer);
                            sender1.appendChild(time);

                            realchat.appendChild(sender1);

                        }



                    });
                })
                .catch((err) => console.log(err));
        });
    });
}

getAllMessages();

const connect = () => {
    // get user_id from localstorage to replace this id
    sender = document.querySelector('.chat').dataset.user;
    socket.emit('user_connected', sender);
    //save my name in global variable
    // prevent the form from submitting
    return false;
};

connect();

const sendMessage = () => {
    // get message
    if (event.keyCode === 13) {
        const text = message.value;

        chatmessages = document.querySelector('.chat-messages');

        let respond = document.createElement('div');
        let chatcontainer = document.createElement('div');
        let chatrespond = document.createElement('div');
        let flipod = document.createElement('div');
        let chatmsg = document.createElement('div');
        let time = document.createElement('div');
        let span = document.createElement('span');
        let sent = document.createElement('span');
        let img = document.createElement('img');

        time.classList.add('time');
        span.textContent = '11:46 AM';
        time.appendChild(span);
        img.src = 'img/admin-dash-messages/sent.svg';
        img.alt = 'delivered';
        sent.classList.add('sent');
        sent.appendChild(img);
        time.appendChild(sent);
        flipod.classList.add('flippd');
        chatmsg.classList.add('chatmsg');
        chatmsg.textContent = text;
        flipod.appendChild(chatmsg);
        chatrespond.classList.add('chat-respond', 'msg');
        chatrespond.appendChild(flipod);
        chatcontainer.classList.add('chat-container', 'respond');
        chatcontainer.appendChild(chatrespond);
        respond.classList.add('respond');
        respond.appendChild(chatcontainer);
        respond.appendChild(time);

        realchat.appendChild(respond);
        shouldScroll =
            chatmessages.scrollTop + chatmessages.clientHeight ===
            chatmessages.scrollHeight;
        console.log(chatmessages.scrollTop, shouldScroll);
        message.value = '';
        if (!shouldScroll) {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }

        // send message to server
        socket.emit('send_message', {
            sender: sender, //you should check this, it throws an error
            receiver: receiver,
            message: text,
            read_status: false,
            sender_name: 'No name',
        });
    }
};

message.addEventListener('keyup', sendMessage);

socket.on('new_message', function (data) {
    console.log(data);
    if (data.sender === sender || data.receiver !== sender) {
        return;
    }
    let sender1 = document.createElement('div');
    let chatcontainer = document.createElement('div');
    let chatsender = document.createElement('div');
    let chatmsg = document.createElement('div');
    let time = document.createElement('div');
    let span = document.createElement('span');
    realchat = document.querySelector('.realchat');
    chatmessages = document.querySelector('.chat-messages');

    span.textContent = '11:46 AM';
    time.classList.add('time');
    time.appendChild(span);
    chatmsg.classList.add('chatmsg');
    chatmsg.textContent = data.message;
    chatsender.classList.add('chat-sender', 'msg');
    chatsender.appendChild(chatmsg);
    chatcontainer.classList.add('chat-container');
    chatcontainer.appendChild(chatsender);
    sender1.classList.add('sender');
    sender1.appendChild(chatcontainer);
    sender1.appendChild(time);
    console.log(sender)
    console.log(data.receiver)
    if (!check) {
        return;
    }
    realchat.appendChild(sender1);
    shouldScroll =
        chatmessages.scrollTop + chatmessages.clientHeight ===
        chatmessages.scrollHeight;
    console.log(chatmessages.scrollTop, shouldScroll);
    message.value = '';
    if (!shouldScroll) {
        chatmessages.scrollTop = chatmessages.scrollHeight;
    }
});
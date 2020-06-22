
const getMessage = document.getElementById('msg--wrap')
const chatList = document.getElementById('chat--list')
const chatItem = document.getElementById('chat-item')
const chatItem2 = document.getElementById('chat-item-2')
const chatItem3 = document.getElementById('chat-item-3')
const chatItem4 = document.getElementById('chat-item-4')
const chatItem5 = document.getElementById('chat-item-5')
const chatListBack = document.getElementById('chat--list-back')

chatItem.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    }
})

chatItem2.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    }
})
chatItem3.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    }
})
chatItem4.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    }
})
chatItem5.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    }
})

chatListBack.addEventListener('click', () => {
    getMessage.classList.remove('msg--wrap-enter')
    chatList.style.display = 'block'
})
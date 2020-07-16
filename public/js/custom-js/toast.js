
const createAudio = () => {
    const sound = document.createElement("audio");
    // const source = document.createElement("source");
    sound.id       = 'notification';
    sound.controls = 'controls';
    sound.src      = '/audio/notification.mp3';
    sound.type     = 'audio/mpeg';
    document.querySelector('body').appendChild(sound);
    const notify = document.getElementById('notification');
    notify.style.position = 'absolute';
    notify.style.left = '-2000px';
    return 'done';
};

createAudio();

const playAudio = async () => {
    const notify = document.getElementById('notification');
    notify.play();
    return 'done';
};

const toaster = async (message, type) => {
    await playAudio();
    const [messageSpan] = document.querySelectorAll('.slide-in-content span');
    messageSpan.innerHTML = message;

    const [toast] = document.getElementsByClassName('slide-in');
    const [toastBgColor] = document.getElementsByClassName('slide-in-content');
    toastBgColor.classList.add(type);
    toast.classList.add('show');
};

const removeToaster = (time) => {
    const toast = () => {
        const [toast] = document.getElementsByClassName('slide-in');
        toast.className = 'slide-in from-right';
    };
    setTimeout(toast, time)
};
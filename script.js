document.addEventListener('DOMContentLoaded', fetchUsers);
const text = document.getElementById("text");

const chatting = document.getElementById("chatting");
const listuser = document.getElementById("list-user");
const name=document.getElementById("name");
const typing = document.getElementById("typing");
name.innerHTML = localStorage.getItem('username');
const storedUsername=name.textContent;
typing.addEventListener("click", () =>{
    console.log("typing")
    socket.emit("typing-event", {
        user: storedUsername
    })
})
const hello = document.getElementById("hello");
hello.addEventListener("click", () => {
    console.log('message')
    socket.emit("message-event", {
        user: storedUsername,
        message: text.value
    });
    
})
const chat = document.getElementById("chat");
socket.on("message-event", (data) => {
    const nouveau = document.createElement("span");
    nouveau.textContent = data.user + " :: " + data.message + " ! ";
    chat.appendChild(nouveau);
});
socket.on("typing-event", (data) => {
    const notif = document.getElementsByClassName("notif");
    while (notif.length > 0) {
        notif[0].remove();
    }
    const nouveauParagraphe = document.createElement("p");
    nouveauParagraphe.classList.add("notif");
    nouveauParagraphe.textContent = data.user + " is currently typing";
    
    chatting.appendChild(nouveauParagraphe);
});


function fetchUsers() {
    fetch('http://localhost:3000/listuser')
        .then(response => response.json())
        .then(data => displayUsers(data))
        .catch(error => console.error('Error:', error));
}
function displayUsers(users) {
    const listUsers = document.querySelector('#list-users');
    listUsers.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        image.src = user.image_user ? `data:image/jpeg;base64,${user.image_user}` : './default-image.jpg';
        image.alt = 'User Image';
        listItem.appendChild(image);

        const userInfoDiv = document.createElement('div');
        userInfoDiv.classList.add('user-info');

        const usernameSpan = document.createElement('span');
        usernameSpan.classList.add('username');
        usernameSpan.innerHTML = `<a href="#">${user.username}</a>`;
        userInfoDiv.appendChild(usernameSpan);

        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status');
        statusSpan.classList.add(user.status_user === 'online' || user.status_user === 'active' ? 'online' : 'offline');
        userInfoDiv.appendChild(statusSpan);

        listItem.appendChild(userInfoDiv);
        listUsers.appendChild(listItem);

        console.log('User image data:', user.image_user);
        console.log('Image source:', image.src);
    });
}


var socket = io();
const text = document.getElementById("text");
const typing = document.getElementById("typing");
const hello = document.getElementById("hello");
const chat = document.getElementById("chat");
const chatting = document.getElementById("chatting");
const listuser = document.getElementById("list-user");
const name=document.getElementById("name");
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
        // Ajout de la classe en fonction du statut
        statusSpan.classList.add(user.status_user === 'online' || user.status_user === 'active' ? 'online' : 'offline');
        userInfoDiv.appendChild(statusSpan);

        listItem.appendChild(userInfoDiv);
        listUsers.appendChild(listItem);

        // Les logs sont utiles pour le débogage
        console.log('User image data:', user.image_user);
        console.log('Image source:', image.src);
    });
}

document.addEventListener('DOMContentLoaded', fetchUsers);

name.innerHTML = storedUsername;
typing.addEventListener("click", () => {
    socket.emit("typing-event", {
        name: text.value
    });
});

hello.addEventListener("click", () => {
    socket.emit("message-event", {
        message: text.value
    });
});

socket.on("message-event", (data) => {
    const nouveau = document.createElement("span");
    nouveau.textContent = storedUsername + " :: " + data.message + " ! ";
    chat.appendChild(nouveau);
});

socket.on("typing-event", (data) => {
    const nouveau = document.createElement("p");
    nouveau.textContent = storedUsername + " is currently typing";
    chatting.appendChild(nouveau);
    localStorage.clear()
});

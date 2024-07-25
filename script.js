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
/**
 * li : img=>
 *           img 
 *      div.user-info=>
 *           span.username 
 *                 a
 *           span.status,span.online
 */
const storedUsername = localStorage.getItem('username');
console.log(localStorage.getItem.name);
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

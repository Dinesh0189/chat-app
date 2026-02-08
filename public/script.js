const socket = io();

const joinScreen = document.getElementById("joinScreen");
const chatScreen = document.getElementById("chatScreen");
const messagesDiv = document.getElementById("messages");

function joinChat() {
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  socket.emit("join", username);
  joinScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (!msg) return;

  socket.emit("chatMessage", msg);
  input.value = "";
}

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `
    <strong>${data.user}</strong>
    <span>${data.text}</span>
    <small>${data.time}</small>
  `;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("system", (msg) => {
  const div = document.createElement("div");
  div.className = "system";
  div.textContent = msg;
  messagesDiv.appendChild(div);
});

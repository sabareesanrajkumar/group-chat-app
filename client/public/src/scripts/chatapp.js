const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const token = localStorage.getItem("token");

let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
let lastFetchedId = 0;
async function displayMessages() {
  const response = await axios.get("http://localhost:3000/chat/", {
    headers: { Authorization: token, "Content-Type": "application/json" },
    params: { lastFetchedId: lastFetchedId },
  });
  const messages = response.data;
  if (messages.length > 0) {
    lastFetchedId = messages[messages.length - 1].id;
  }
  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.id = message.id;
    messageElement.innerHTML = `<span>~${message.user.username}</span><p>${message.text}</p>`;
    chatBox.appendChild(messageElement);
    let newMessage = {
      id: message.id,
      username: message.user.username,
      text: message.text,
    };
    storedMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(storedMessages));
  });
}

async function sendMessage() {
  const messageText = document.getElementById("message-input").value;
  if (messageText) {
    const sendResponse = await axios.post(
      "http://localhost:3000/chat/send",
      { text: messageText },
      {
        headers: { Authorization: token, "Content-Type": "application/json" },
      }
    );
    if (sendResponse.status === 201) {
      document.getElementById("message-input").value = "";
      setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 1000);
    }

    if (sendResponse.status != 201) {
      alert("failed to send message");
    }
  }
}

setInterval(() => {
  displayMessages();
}, 1000);

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

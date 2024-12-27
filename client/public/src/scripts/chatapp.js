const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const token = localStorage.getItem("token");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

async function displayMessages() {
  chatBox.innerHTML = "";
  const response = await axios.get("http://localhost:3000/chat/", {
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  const messages = response.data;
  console.log(messages);
  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<span>~${message.user.username}</span><p>${message.text}</p>`;
    chatBox.appendChild(messageElement);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
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

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

let messages = JSON.parse(localStorage.getItem("messages")) || [];

function displayMessages() {
  chatBox.innerHTML = "";
  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<span>${message.user}:</span><p>${message.text}</p>`;
    chatBox.appendChild(messageElement);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText) {
    const newMessage = {
      user: "User",
      text: messageText,
    };
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    messageInput.value = "";
    displayMessages();
  }
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
displayMessages();

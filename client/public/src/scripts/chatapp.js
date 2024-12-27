const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const token = localStorage.getItem("token");

let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
let lastFetchedId = 0;

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

const groupSelect = document.getElementById("group-select");
const createGroupButton = document.getElementById("create-group-button");
const createGroupModal = document.getElementById("create-group-modal");
const closeModal = document.getElementById("close-modal");
const createGroupSubmit = document.getElementById("create-group-submit");
const groupNameInput = document.getElementById("group-name");
const groupDescriptionInput = document.getElementById("group-description");

async function loadGroups() {
  try {
    const response = await axios.get("http://localhost:3000/groups", {
      headers: { Authorization: token },
    });
    const groups = response.data;

    groupSelect.innerHTML =
      '<option value="" disabled selected>Select Group</option>';
    groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.id;
      option.textContent = group.name;
      groupSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading groups:", error);
  }
}

async function displayMessages(groupId) {
  try {
    const response = await axios.get(`http://localhost:3000/chat/`, {
      headers: { Authorization: token },
      params: { lastFetchedId: lastFetchedId, groupId: groupId },
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
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Error loading messages:", error);
  }
}

async function sendMessage() {
  const messageText = messageInput.value.trim();
  const groupId = document.getElementById("group-select").value;

  if (messageText && groupId) {
    try {
      await axios.post(
        "http://localhost:3000/chat/send",
        {
          text: messageText,
          groupId,
        },
        {
          headers: { Authorization: token },
        }
      );

      messageInput.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
      alert("failed to send message");
    }
  }
}

setInterval(() => {
  //displayMessages(document.getElementById("group-select").value);
}, 1000);

async function createGroup() {
  const groupName = groupNameInput.value.trim();
  const groupDescription = groupDescriptionInput.value.trim();

  if (groupName) {
    try {
      await axios.post(
        "http://localhost:3000/groups/create",
        {
          name: groupName,
          description: groupDescription,
        },
        {
          headers: { Authorization: token },
        }
      );

      createGroupModal.classList.add("hidden");
      loadGroups();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  }
}

groupSelect.addEventListener("change", () => {
  const groupId = groupSelect.value;
  if (groupId) {
    displayMessages(groupId);
  }
});

createGroupButton.addEventListener("click", () => {
  createGroupModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  createGroupModal.classList.add("hidden");
});

createGroupSubmit.addEventListener("click", createGroup);

loadGroups();

const addMemberButton = document.getElementById("add-member-button");
const removeMemberButton = document.getElementById("remove-member-button");

async function checkAdminPrivileges(selectedGroupId) {
  const response = await axios.get(
    `http://localhost:3000/groups/${5}/members`,
    {
      headers: { Authorization: token },
    }
  );
  const isAdmin = response.data.some(
    (member) => member.userId === req.user.id && member.role === "admin"
  );
  document.getElementById("admin-controls").style.display = isAdmin
    ? "block"
    : "none";
}

addMemberButton.addEventListener("click", async () => {
  const userId = prompt("Enter the User ID to add:");
  if (userId) {
    await axios.post(
      `http://localhost:3000/admin/${selectedGroupId}/add`,
      { userId },
      { headers: { Authorization: token } }
    );
    alert("Member added successfully.");
  }
});

removeMemberButton.addEventListener("click", async () => {
  const userId = prompt("Enter the User ID to remove:");
  if (userId) {
    await axios.post(
      `http://localhost:3000/admin/${selectedGroupId}/remove`,
      { userId },
      { headers: { Authorization: token } }
    );
    alert("Member removed successfully.");
  }
});

const selectedGroupId = groupSelect.value;
checkAdminPrivileges(selectedGroupId);

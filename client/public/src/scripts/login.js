document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    document.getElementById("error").innerHTML = "";
    const FormData = {
      email: event.target.email.value,
      passWord: event.target.password.value,
    };

    try {
      const postResponse = await axios.post(
        "http://localhost:3000/user/login",
        FormData
      );
      localStorage.setItem("token", postResponse.data.token);
      window.location.href = "chatapp.html";
      resetForm(event);
    } catch (err) {
      resetForm(event);
      if (err.response.status != 200) {
        document.getElementById("error").innerHTML = JSON.stringify(
          err.response.data.message
        );
      }
    }
  });
async function forgotPassword() {
  document.getElementById("forgot-password-form").style.display = "block";
  document.getElementById("forgot-password-btn").style.display = "none";
  document.getElementById("login-form").style.display = "none";
  document
    .getElementById("forgot-password-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const forgotPasswordResponse = await axios.post(
        "http://localhost:3000/password/forgotpassword",
        { email: event.target.email.value }
      );
      event.target.email.value = "";
      document.getElementById("forgot-password-form").style.display = "none";
      document.getElementById("login-form").style.display = "flex";
      alert("reset link sent to your mail");
    });
}

function resetForm(event) {
  event.target.email.value = "";
  event.target.password.value = "";
}

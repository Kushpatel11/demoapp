document.querySelector("#rtsu").addEventListener("click", () => {
  window.location.href = "signup.html";
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");

  console.log("Login form:", loginForm);
  console.log("Login email:", loginEmail);
  console.log("Login password:", loginPassword);

  if (loginForm && loginEmail && loginPassword) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = loginEmail.value;
      const password = btoa(loginPassword.value); // Encrypt password to compare

      if (email === "admin@demo.com" && loginPassword.value === "admin123") {
        alert("Welcome Admin!");
        localStorage.setItem("admin-session", true);
        let ASET = 15;
        const adminexp = new Date().getTime() + ASET * 1000; // Admin-Session-Expiry-Time in sec
        localStorage.setItem(
          "admin-exp",
          JSON.stringify({
            adminexptime: adminexp,
          })
        );
        checkadminvalidity();
        window.location.href = "admindashboard.html";
        return;
      }

      const users = getUsers(); // Fetch users data
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        saveSession(user); // Save session on successful login
        alert("Login successful!");
        window.location.href = "profile.html"; // Redirect to profile page
      } else {
        alert("Invalid email or password.");
      }
    });
  } else {
    console.error("One or more elements are missing in the DOM");
  }
});

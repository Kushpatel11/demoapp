document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstname = document.getElementById("signup-firstname").value;
  const lastname = document.getElementById("signup-lastname").value;
  const email = document.getElementById("signup-email").value;
  const password = btoa(document.getElementById("signup-password").value); // Encrypt password

  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    alert("Email already exists.");
    return;
  }

  users.push({ firstname, lastname, email, password });
  saveUsers(users);
  alert("Registration successful. Please login.");
  window.location.href = "login.html";
});

document.querySelector("#login").addEventListener("click", () => {
  window.location.href = "login.html";
});

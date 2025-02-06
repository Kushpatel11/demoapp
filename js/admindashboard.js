//user-table-on-admin-dashboard

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("admin-session")) {
    const users = getUsers();
    const tableBody = document.getElementById("user-table-body");

    tableBody.innerHTML = users
      .map(
        (user, index) => `
              <tr>
                  <td>${index + 1}</td>
                  <td>${user.firstname}</td>
                  <td>${user.lastname}</td>
                  <td>${user.email}</td>
                  <td><button data-email="${
                    user.email
                  }" class="delete-user-btn"></button></td>
              </tr>
          `
      )
      .join("");

    //user-delete

    document.querySelectorAll(".delete-user-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const email = this.dataset.email;
        let users = getUsers();
        users = users.filter((user) => user.email !== email);
        saveUsers(users);
        alert("User deleted successfully.");
        location.reload();
      });
    });

    //admin-logout

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("admin-session");
        window.location.href = "login.html";
      });
  } else {
    alert("You must be logged in as admin to access this page.");
    window.location.href = "login.html";
  }
});

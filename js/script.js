function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function getAdminSession() {
  return JSON.parse(localStorage.getItem("admin-session"));
}

function clearAdminSession() {
  localStorage.removeItem("admin-session");
  localStorage.removeItem("admin-exp");
}

function logoutAdmin() {
  localStorage.removeItem("admin-session");
  clearAdminSession();
  window.location.href = "login.html";
}

let SESSION_EXPIRY_TIME = 15;
function saveSession(user) {
  localStorage.setItem("session", JSON.stringify(user)); // Save user session
  console.log("hello");
  const exp = new Date().getTime() + SESSION_EXPIRY_TIME * 1000; // Correct expiry time
  console.log(exp);
  localStorage.setItem(
    "exp",
    JSON.stringify({
      expdate: exp,
    })
  );
}

function clearSession() {
  localStorage.removeItem("session");
  localStorage.removeItem("exp");
}

// Function to logout user
function logoutUser() {
  localStorage.removeItem("session");
  clearSession();
  window.location.href = "login.html"; // Redirect to login page
}

function checkvalidity() {
  const session = getSession();
  const expdate = localStorage.getItem("exp");
  if (session) {
    const checkexp = new Date().getTime() > JSON.parse(expdate).expdate;
    if (checkexp) {
      clearSession();
      logoutUser();
    }
  }
}

setInterval(checkvalidity, 20 * 1000);

function checkadminvalidity() {
  const adminsession = getAdminSession();
  const adminexp = localStorage.getItem("admin-exp");
  if (adminsession) {
    const checkadminexp =
      new Date().getTime() > JSON.parse(adminexp).adminexptime;
    if (checkadminexp) {
      clearAdminSession();
      logoutAdmin();
    }
  }
}

setInterval(checkadminvalidity, 20 * 1000);

document.addEventListener("DOMContentLoaded", function () {
  const session = getSession(); // Now returns user object
  console.log(session);
  if (!session) {
    window.location.href = "login.html"; // Redirect if no session
    return;
  }

  // Populate profile form
  document.getElementById("profile-firstname").value = session.firstname;
  document.getElementById("profile-lastname").value = session.lastname;
  document.getElementById("profile-email").value = session.email;

  // Update user details
  document
    .getElementById("profileForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const firstname = document.getElementById("profile-firstname").value;
      const lastname = document.getElementById("profile-lastname").value;
      const email = document.getElementById("profile-email").value;
      const password = btoa(document.getElementById("profile-password").value);

      const users = getUsers();
      const userIndex = users.findIndex(
        (user) => user.username === session.username
      );

      if (userIndex > -1) {
        users[userIndex] = {
          ...users[userIndex],
          firstname,
          lastname,
          email,
          password,
        };
        saveUsers(users);
        saveSession(users[userIndex]); // Re-save the updated session data
        alert("Profile updated successfully!");
      } else {
        alert("User not found!");
      }
    });

  // Delete account
  document
    .getElementById("delete-account")
    .addEventListener("click", function () {
      if (confirm("Are you sure you want to delete your account?")) {
        let users = getUsers();
        users = users.filter((user) => user.username !== session.username);
        saveUsers(users);
        clearSession();
        alert("Account deleted successfully.");
        window.location.href = "signup.html";
      }
    });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", function () {
    clearSession();
    alert("Logged out successfully.");
    window.location.href = "login.html";
  });
});

// Default Profile Photo
const defaultProfilePhoto = "/images/img7.png";

// Initialize Profile Photo on Page Load
document.addEventListener("DOMContentLoaded", function () {
  const profileImg = document.getElementById("profileImg");
  const savedPhoto = localStorage.getItem("profilePhoto");

  // Set the saved photo or default photo
  profileImg.src = savedPhoto ? savedPhoto : defaultProfilePhoto;
});

// Preview Photo Before Changing
function previewPhoto(event) {
  const profileImg = document.getElementById("profileImg");
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      profileImg.src = e.target.result; // Set the preview image
    };

    reader.readAsDataURL(file); // Convert file to Data URL
  } else {
    alert("No file selected or invalid file type.");
  }
}

// Save Profile Photo on Change
document.getElementById("changedp").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default form submission

  const profileImg = document.getElementById("profileImg");
  const fileInput = document.getElementById("profilePhotoInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      localStorage.setItem("profilePhoto", e.target.result); // Save photo to localStorage
      alert("Profile photo updated successfully!");
    };

    reader.readAsDataURL(file); // Convert file to Data URL
  } else {
    alert("Please select a photo to upload.");
  }
});

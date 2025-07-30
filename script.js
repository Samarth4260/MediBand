
let currentRole = "";
let currentUser = null;
let selectedUserFromQR = new URLSearchParams(window.location.search).get('user');

function selectRole(role) {
  currentRole = role;
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");

  if (selectedUserFromQR) {
    document.getElementById("username").value = selectedUserFromQR;
  }
}

function goBack() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.username === username && u.password === password && u.role === currentRole);
  if (user) {
    currentUser = user;
    showDashboard(user);
  } else {
    alert("Invalid credentials");
  }
}

function showDashboard(user) {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  const content = document.getElementById("dashboardContent");
  content.innerHTML = "";

  if (user.role === "hospital") {
    let visibleUsers = users.filter(u => u.role === "person");
    if (selectedUserFromQR) {
      visibleUsers = visibleUsers.filter(p => p.username === selectedUserFromQR);
    }
    visibleUsers.forEach(p => {
      content.innerHTML += `<div class="profile-section">${renderProfile(p)}</div>`;
    });
  } else {
    content.innerHTML = `
      <div class="profile-section" id="personProfile">${renderProfile(user)}</div>
      <button onclick="editProfile()">Edit Profile</button>
    `;
  }
}

function renderProfile(u) {
  return `
    <strong>Name:</strong> ${u.name}<br>
    <strong>Age:</strong> ${u.age}<br>
    <strong>Blood Group:</strong> ${u.bloodGroup}<br>
    <strong>Emergency Contact:</strong> ${u.emergencyContact}<br>
    <strong>Allergies:</strong> ${u.allergies.join(", ")}<br>
    <strong>Medications:</strong> ${u.medications.join(", ")}<br>
    <strong>Conditions:</strong> ${u.conditions.join(", ")}<br>
    <strong>Surgeries:</strong> ${u.surgeries.join(", ")}<br>
    <strong>Last Visit:</strong> ${u.lastVisit}<br>
    <strong>Vaccinations:</strong> ${u.vaccinations.join(", ")}<br>
    <strong>Notes:</strong> ${u.notes}
  `;
}

function editProfile() {
  const formHtml = `
    <h3>Edit Profile</h3>
    <input type="text" id="name" value="${currentUser.name}" placeholder="Name"/>
    <input type="number" id="age" value="${currentUser.age}" placeholder="Age"/>
    <input type="text" id="bloodGroup" value="${currentUser.bloodGroup}" placeholder="Blood Group"/>
    <input type="text" id="emergencyContact" value="${currentUser.emergencyContact}" placeholder="Emergency Contact"/>
    <textarea id="allergies">${currentUser.allergies.join(", ")}</textarea>
    <textarea id="medications">${currentUser.medications.join(", ")}</textarea>
    <textarea id="conditions">${currentUser.conditions.join(", ")}</textarea>
    <textarea id="surgeries">${currentUser.surgeries.join(", ")}</textarea>
    <input type="text" id="lastVisit" value="${currentUser.lastVisit}" placeholder="Last Visit"/>
    <textarea id="vaccinations">${currentUser.vaccinations.join(", ")}</textarea>
    <textarea id="notes">${currentUser.notes}</textarea>
    <button onclick="saveProfile()">Save</button>
  `;
  document.getElementById("dashboardContent").innerHTML = formHtml;
}

function saveProfile() {
  currentUser.name = document.getElementById("name").value;
  currentUser.age = parseInt(document.getElementById("age").value);
  currentUser.bloodGroup = document.getElementById("bloodGroup").value;
  currentUser.emergencyContact = document.getElementById("emergencyContact").value;
  currentUser.allergies = document.getElementById("allergies").value.split(",").map(i => i.trim());
  currentUser.medications = document.getElementById("medications").value.split(",").map(i => i.trim());
  currentUser.conditions = document.getElementById("conditions").value.split(",").map(i => i.trim());
  currentUser.surgeries = document.getElementById("surgeries").value.split(",").map(i => i.trim());
  currentUser.lastVisit = document.getElementById("lastVisit").value;
  currentUser.vaccinations = document.getElementById("vaccinations").value.split(",").map(i => i.trim());
  currentUser.notes = document.getElementById("notes").value;

  showDashboard(currentUser);
}

function logout() {
  location.reload();
}

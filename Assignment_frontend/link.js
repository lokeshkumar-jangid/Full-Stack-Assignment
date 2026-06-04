const API_URL = "http://localhost:8080/check";

async function loadTable() {
  const table = document.getElementById("personTable").getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  try {
    const response = await fetch(`${API_URL}/all`);
    const persons = await response.json();
    persons.forEach((employee) => {
      const row = table.insertRow();
      row.insertCell(0).innerText = employee.username;
      row.insertCell(1).innerText = employee.mobileno;
      row.insertCell(2).innerText = employee.age;
      row.insertCell(3).innerText = employee.role;
      row.insertCell(4).innerText = employee.employeeid;
      const actionCell = row.insertCell(5);
      actionCell.innerHTML = `
        <button onclick="editData(this)">Edit</button>
        <button onclick="deleteData(${employee.employeeid})">Delete</button>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

let editRow = null;

function openForm() {
  document.getElementById("popup").style.display = "flex";
}

function closeForm() {
  document.getElementById("popup").style.display = "none";
  clearForm();
}

function clearForm() {
  document.getElementById("username").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("age").value = "";
  document.getElementById("role").value = "";
  document.getElementById("employeeId").value = "";
}

function resetTable() {
  document.getElementById("search1").value = "";
  document.getElementById("search2").value = "";
  document.getElementById("searchMode").value = "exact";
  loadTable();
}

async function deleteData(id) {
  try {
    await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
    loadTable();
  } catch (error) {
    console.log(error);
  }
}

async function saveData() {
  let username = document.getElementById("username").value;
  let mobile = document.getElementById("mobile").value;
  let age = document.getElementById("age").value;
  let role = document.getElementById("role").value;
  let employeeId = document.getElementById("employeeId").value;

  if (username === "" || mobile === "" || age === "" || role === "" || employeeId === "") {
    let nullfc = document.getElementById("nullFieldMsg");
    nullfc.style.right = "30px";
    setTimeout(() => { nullfc.style.right = "-350px"; }, 2000);
    return;
  }

  let namePattern = /^[A-Za-z ]+$/;
  if (!namePattern.test(username)) {
    alert("Username should contain only letters");
    return;
  }

  let mobileInput = document.getElementById("mobile");
  if (mobile.length !== 10) {
    mobileInput.placeholder = "⚠ Enter valid 10-digit number!";
    mobileInput.style.outline = "2px solid red";
    mobileInput.focus();
    return;
  }

  if (age < 18 || age > 60) {
    alert("Age must be between 18 and 60");
    return;
  }

  username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  try {
    const response = await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mobileno: mobile, age, role, employeeid: employeeId })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  closeForm();

  let msg = document.getElementById("successfullCreateMsg");
  msg.innerText = editRow ? "Details Updated Successfully" : "Form Submitted";
  msg.style.right = "20px";
  setTimeout(() => { msg.style.right = "-350px"; }, 3000);
  editRow = null;
  loadTable();
  /*let table = document.getElementById("personTable").getElementsByTagName("tbody")[0];

  if (editRow != null) {
    editRow.cells[0].innerHTML = username;
    editRow.cells[1].innerHTML = mobile;
    editRow.cells[2].innerHTML = age;
    editRow.cells[3].innerHTML = role;
    editRow.cells[4].innerHTML = employeeId;
    editRow = null;
  } else {
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = username;
    newRow.insertCell(1).innerHTML = mobile;
    newRow.insertCell(2).innerHTML = age;
    newRow.insertCell(3).innerHTML = role;
    newRow.insertCell(4).innerHTML = employeeId;
    let actionCell = newRow.insertCell(5);
    actionCell.innerHTML = `
      <button onclick="editData(this)">Edit</button>
      <button onclick="${employee.id}">Delete</button>
    `;
  }*/
}

function addEmployee() {
  clearForm();
  editRow = null;
  document.getElementById("saveBtn").innerText = "Create";
  openForm();
}

function editData(button) {
  editRow = button.parentElement.parentElement;
  document.getElementById("username").value = editRow.cells[0].innerHTML;
  document.getElementById("mobile").value = editRow.cells[1].innerHTML;
  document.getElementById("age").value = editRow.cells[2].innerHTML;
  document.getElementById("role").value = editRow.cells[3].innerHTML;
  document.getElementById("employeeId").value = editRow.cells[4].innerHTML;
  document.getElementById("saveBtn").innerText = "Update";
  openForm();
}


async function searchTable() {
  const search1 = document.getElementById("search1").value.trim().toUpperCase();
  const search2 = document.getElementById("search2").value.trim().toLowerCase();
  const mode = document.getElementById("searchMode").value; 

  const table = document.getElementById("personTable").getElementsByTagName("tbody")[0];
  table.innerHTML = "";

  try{
    const response = await fetch(`${API_URL}/all`); 
    const persons = await response.json();

    const filtered = persons.filter((emp) => {
      const firstName = emp.username.toUpperCase();
      const lastName = emp.role.toLowerCase();
      if (mode === "exact") {
        return firstName === search1 && lastName === search2;
      } else {
        return (
          (search1 === "" || firstName.includes(search1)) &&
          (search2 === "" || lastName.includes(search2))
        );
      }
    });

    filtered.forEach((employee) => {
      const row = table.insertRow();
      row.insertCell(0).innerText = employee.username;
      row.insertCell(1).innerText = employee.mobileno; 
      row.insertCell(2).innerText = employee.age;
      row.insertCell(3).innerText = employee.role;
      row.insertCell(4).innerText = employee.employeeid; 
      const actionCell = row.insertCell(5);
      actionCell.innerHTML = `
        <button onclick="editData(this)">Edit</button>
        <button onclick="deleteData(${employee.id})">Delete</button>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = function () {
  loadTable();

  const mobileInput = document.getElementById("mobile");
  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, "");
    if (mobileInput.value.length > 10) {
      mobileInput.value = mobileInput.value.slice(0, 10);
    }
    const len = mobileInput.value.length;
    if (len === 0) {
      mobileInput.placeholder = "Mobile Number";
      mobileInput.style.outline = "none";
    } else if (len < 10) {
      mobileInput.placeholder = `${10 - len} more digits needed...`;
      mobileInput.style.outline = "2px solid orange";
    } else if (len === 10) {
      mobileInput.placeholder = "✓ Mobile Number";
      mobileInput.style.outline = "2px solid green";
    }
  });
};
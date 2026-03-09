document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();
const errorMessage = document.getElementById("error-message");

const users = {
admin: "admin123",
attendant: "park2026"
};

if(users[username] && users[username] === password){

sessionStorage.setItem("userRole", username);

if(username === "admin"){
window.location.href = "reports.html";
}
else if(username === "attendant"){
window.location.href = "dashboard.html";
}

}
else{
errorMessage.textContent = "Invalid username or password";
}

});
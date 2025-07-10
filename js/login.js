function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (username === "Hugo Muñoz" && password === "230304") {
    window.location.href = "menu.html";
  } else {
    error.textContent = "Usuario o contraseña incorrectos.";
  }
}

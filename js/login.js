import { getData } from "./services.js"

const form = document.querySelector("form")

form.addEventListener("submit", async e => {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.remove("was-validated")
        form.classList.add("was-validated")
        return
    }

    // capturando los datos
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const dataUsers = await getData("users");

    const emailValidate = dataUsers.find(userEmail => userEmail.email === email.value);
    const passwordValidate = dataUsers.find(userPassword => userPassword.password === password.value)

    if (emailValidate && passwordValidate) {
        localStorage.setItem("isLogin", "true")
        localStorage.setItem("currentUser", email.value)

        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
        email.classList.add("is-valid");
        password.classList.add("is-valid");

        const roles = await getData("users");
        let userRole = "";
        roles.forEach(rol => {
            if (rol.email == email.value) {
                userRole = rol.role
                localStorage.setItem("typeUser", userRole)
            }
        });

        await Swal.fire({
            title: "¡Inicio correcto de sesión!",
            text: "Click en continuar o espera 3 segundos!",
            icon: "success",
            confirmButtonText: "Continuar",
            timer: 3000
        });

        window.location.href =
            userRole.role === "admin"
                ? "dashboard.html"
                : "../index.html";

    } else {
        form.classList.remove("was-validated")
        email.classList.add("is-invalid");
        password.classList.add("is-invalid");
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }

})

// redireccion al registro
const register = document.getElementById("newRegister");
register.addEventListener("click", async e => {
    e.preventDefault()

    window.location.href = '/html/sign-up.html'
})

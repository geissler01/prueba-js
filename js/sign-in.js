const form = document.querySelector("form")

const userBurned = {
    "email": "ej@g",
    "password": "123"
}

localStorage.setItem("users", JSON.stringify(userBurned))

form.addEventListener("submit", e => {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.remove("was-validated")
        form.classList.add("was-validated")
        return
    }

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const dataUsers = JSON.parse(localStorage.getItem("users"))
    console.log(dataUsers.password)
    if (email.value === dataUsers.email && password.value === dataUsers.password) {
        localStorage.setItem("isLogin", "true")
        localStorage.setItem("currentUser", email.value)

        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
        email.classList.add("is-valid");
        password.classList.add("is-valid");

        Swal.fire({
            title: "Inicio correcto de sesión!",
            text: "Click en continuar o espera 3 segundos!",
            icon: "Continuar",
            confirmButtonText: "Continuar",
            timer: 3000
        }).then(() => {
            window.location.href = "login.html"
        })
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
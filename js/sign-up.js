import { getData, postData } from "./services.js";

const form = document.querySelector("form");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("email") // busco el correo
    const emailValidate = await getData("users");

    // validacion correo
    const findEmail = emailValidate.find(em => em.email === email.value);
    console.log(findEmail);
    if (findEmail) {
        alert("Usuario ya existe")
        email.classList.add("is-invalid");
        email.classList.remove("is-valid")
        e.stopPropagation();
        return
    } else {
        email.classList.remove("is-invalid")
        email.classList.add("is-valid")
    }

    // validacion de role
    const role = document.getElementById("selectRole");
    if (!role.value) {
        role.classList.add("is-invalid")
        alert("Seleccione un rol de usuario")
        return
    } else {
        role.classList.remove("is-invalid")
        const rol = document.getElementById("rol");
        if (role.value === "admin") {
            rol.classList.remove("d-none")
        }
    }

    const codeImput = document.getElementById("code");
    const codeValidate = await getData("codes");

    // validacion codigo
    const findCode = codeValidate.find(cod => cod.code === codeImput.value);
    console.log(findCode)
    if (role.value === "admin") {
        if (!findCode) {
            alert("codigo invalido")
            codeImput.classList.add("is-invalid");
            e.stopPropagation();
            return
        }
    }

    const userName = document.getElementById("userName");
    const password = document.getElementById("password");

    const newUser = {
        "user": userName.value,
        "email": email.value,
        "password": password.value,
        "role": role.value
    };

    await postData("users", newUser);
    
    window.location.href = 'login.html'

})

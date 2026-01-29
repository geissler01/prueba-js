const urlUsers = "http://localhost:3000/users";

const form = document.querySelector("form");

// GET data users
async function getUsers() {
    const resUsers = await fetch(urlUsers);
    return await resUsers.json()
}
// get data code
async function getCodes() {
    const resCodes = await fetch("http://localhost:3000/codes");
    return await resCodes.json()
}

// POST data
// async function createUser(data) {
//     try {
//         const resp = await fetch(urlUsers, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//     });
//     } catch (error) {
//         console.log("error")
//     }

// }
// async function createUser(data) {
//     try {
//         const resp = await fetch(urlUsers, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         if (!resp.ok) {
//             throw new Error("Error al crear usuario");
//         }

//         const result = await resp.json();
//         console.log("Usuario creado:", result);
//     } catch (error) {
//         console.log(error.message);
//     }
// }


form.addEventListener("submit", async e => {
    e.preventDefault()

    const email = document.getElementById("email") // busco el correo
    const emailValidate = await getUsers();

    // validacion correo
    const findEmail = emailValidate.find(em => em.email === email.value);
    console.log(findEmail);
    if (findEmail) {
        alert("Usuario ya existe")
        email.classList.add("is-invalid");
        e.stopPropagation();
        return
    } else {
        alert("correo validado")
    }

    const role = document.getElementById("selectRole");
    const codeImput = document.getElementById("code");

    const codeValidate = await getCodes();

    // validacion codigo
    const findCode = codeValidate.find(code => code === codeImput.value);
    console.log(findCode)
    if (role.value === "admin") {
        if (!findCode) {
            alert("codigo invalido")
            codeImput.classList.add("is-invalid");
            e.stopPropagation();
            return
        } else {
            alert("codigo validado")
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


    // await createUser(newUser)
    console.log(await createProduct(newUser))
    })


    async function createProduct(newProdcut) {
    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProdcut)
        });
        await res.json();
    } catch (error) {
        console.error('Error en POST:', error);
    }
}
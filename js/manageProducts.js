// Post
async function createProduct(newProdcut) {

}

async function createProduct(newProdcut) {
    try {
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProdcut)
        });
        // const data = await res.json();
    } catch (error) {
        console.error('Error en POST:', error);
    }
}

const saveProduct = document.getElementById("saveProduct");

saveProduct.addEventListener("click", async (e) => {
    e.preventDefault();
    alert()

    const newProduct = {
        "name": "Hola",
        "email": "geisler@gmail.com"
    }
    await createProduct(newProduct);
})
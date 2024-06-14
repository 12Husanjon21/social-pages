init();

const container = document.querySelector(".container");
const logout_btn = document.getElementById("logout-btn");
const add_btn = document.getElementById("add_btn");
const title  = document.getElementById("title");
const price  = document.getElementById("price");
const description  = document.getElementById("description");
const form = document.forms[0];
const products = [];



logout_btn.onclick = logout;
  
  function init() {
    checkToken();
  }
  
function redirect(path) {
  window.location.href = path;
}

function logout() {
  localStorage.removeItem("token"); 

  redirect("/login.html");
}


function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
  }
}    

const newProduct = {
  id: Date.now(),
  title: "",
  price: "",
  description: "",
}  



form.onsubmit = (event) => {
  event.preventDefault();
  
  const newProduct = {
    id: Date.now(),
    title: title.value.trim(),
    price: price.value,
    description: description.value.trim(),
  }

  title.value = "";
  price.value = "";
  description.value = "";
  // add_btn.disabled = true

  if (validateProduct(newProduct)) {
    products.push(newProduct);
    console.log(products);
    
    clearFormInputs();
    renderProducts();
  } else {
    alert("All fields are required and must be filled out correctly.");
  }
}

function validateProduct(product) {
  return product.title && !isNaN(product.price) && product.description;
}

function clearFormInputs() {
  title.value = '';
  price.value = '';
  description.value = '';
}


function renderProducts() {
  container.innerHTML = "";
  products.map(product => {
    const products = document.createElement("div");
    products.className = "my_new_product";

    const title = document.createElement("h2");
    const price = document.createElement("p");
    const description = document.createElement("h4");

    title.textContent = `Title: ${  product.title}`;
    price.textContent = `It costs: $${  product.price}`;
    description.textContent = `Description: ${  product.description}`;

    const del_btn = document.createElement("button");
    del_btn.className = "small_btn";
    del_btn.type = "button";
    del_btn.textContent = "Delete";

    del_btn.onclick = () => {
      deleteProduct(product.id);
    };
    
    products.append(title, price, description, del_btn);
    container.append(products);
  })
}


function deleteProduct(id) {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    
    renderProducts();
  }
}

























const products = [
  { id: 1, name: "Black Oversized T-Shirt", price: 2500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 2, name: "Denim Jacket", price: 6500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { id: 3, name: "White Casual Shirt", price: 3200, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
  { id: 4, name: "Grey Hoodie", price: 4500, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
  { id: 5, name: "Beige Chinos", price: 4000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400" },
  { id: 6, name: "Summer Dress", price: 3800, image: "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=400" }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const orderForm = document.getElementById("order-form");
const message = document.getElementById("message");

function showProducts() {
  productList.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">Rs ${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Cart khali hai</li>";
  }

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} - Rs ${item.price}</span>
                    <button class="btn" onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = `Cart (${cart.length})`;
}

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    message.style.color = "#e63946";
    message.textContent = "Pehle cart mein kuch items dalein.";
    return;
  }

  const name = document.getElementById("name").value;
  message.style.color = "#2a9d8f";
  message.textContent = `Shukriya ${name}! Demo order place ho gaya. Total: Rs ${cartTotal.textContent}`;

  cart = [];
  updateCart();
  orderForm.reset();
});

showProducts();
updateCart();

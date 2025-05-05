// ==================== Preloader ====================
window.addEventListener("load", function() {
    setTimeout(function() {
        document.querySelector(".preloader").style.display = "none";
        document.querySelector(".content").style.display = "block";
    }, 3000);
});

// ==================== Login/Logout System ====================
document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("loggedInUser");
    const userInfo = document.getElementById("user-info");
    const loginLink = document.getElementById("login");
    
    if (user) {
        userInfo.style.display = "flex";
        document.getElementById("username").textContent = user;
        loginLink.style.display = "none";
    }
    
    document.getElementById("logout-btn").addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    });
});

// ==================== Slider ====================
document.addEventListener("DOMContentLoaded", function() {
    const slider = {
        slides: document.querySelectorAll(".slide"),
        container: document.querySelector(".slider-container"),
        prevBtn: document.querySelector(".prev"),
        nextBtn: document.querySelector(".next"),
        currentIndex: 0,
        interval: null,
        
        init: function() {
            this.updateSlider();
            this.startAutoSlide();
            this.setupEventListeners();
        },
        
        updateSlider: function() {
            this.container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        },
        
        nextSlide: function() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlider();
        },
        
        prevSlide: function() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.updateSlider();
        },
        
        startAutoSlide: function() {
            this.interval = setInterval(() => this.nextSlide(), 4000);
        },
        
        stopAutoSlide: function() {
            clearInterval(this.interval);
        },
        
        setupEventListeners: function() {
            this.nextBtn.addEventListener("click", () => {
                this.nextSlide();
                this.restartAutoSlide();
            });
            
            this.prevBtn.addEventListener("click", () => {
                this.prevSlide();
                this.restartAutoSlide();
            });
            
            this.container.addEventListener("mouseenter", () => this.stopAutoSlide());
            this.container.addEventListener("mouseleave", () => this.startAutoSlide());
        },
        
        restartAutoSlide: function() {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    };
    
    slider.init();
});

// ==================== Cart System ====================
document.addEventListener("DOMContentLoaded", function() {
    const cart = {
        icon: document.querySelector("#cart-icon"),
        cartElement: document.querySelector(".cart"),
        closeBtn: document.querySelector("#cart-close"),
        content: document.querySelector(".cart-content"),
        buyBtn: document.querySelector(".btn-buy"),
        itemCount: 0,
        
        init: function() {
            this.setupEventListeners();
        },
        
        setupEventListeners: function() {
            this.icon.addEventListener("click", () => this.toggleCart());
            this.closeBtn.addEventListener("click", () => this.closeCart());
            this.buyBtn.addEventListener("click", () => this.handleBuy());
            
            document.querySelectorAll(".add-cart").forEach(button => {
                button.addEventListener("click", (e) => {
                    const product = e.target.closest(".product-box") || e.target.closest(".product");
                    if (product) this.addToCart(product);
                });
            });
        },
        
        toggleCart: function() {
            this.cartElement.classList.toggle("active");
        },
        
        openCart: function() {
            this.cartElement.classList.add("active");
        },
        
        closeCart: function() {
            this.cartElement.classList.remove("active");
        },
        
        addToCart: function(product) {
            const title = product.querySelector(".product-title").textContent;
            
            if (this.isItemInCart(title)) {
                alert("This item is already in the cart");
                return;
            }
            
            const cartItem = this.createCartItem(product);
            this.content.appendChild(cartItem);
            this.setupCartItemEvents(cartItem);
            this.updateCount(1);
            this.updateTotalPrice();
        },
        
        isItemInCart: function(title) {
            return Array.from(document.querySelectorAll(".cart-product-title"))
                .some(item => item.textContent === title);
        },
        
        createCartItem: function(product) {
            const image = product.querySelector("img").src;
            const title = product.querySelector(".product-title").textContent;
            const price = product.querySelector(".price").textContent;
            
            const cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");
            cartBox.innerHTML = `
                <img src="${image}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${title}</h2>
                    <span class="cart-price">${price}</span>
                    <div class="cart-quantity">
                        <button class="decrement">-</button>
                        <span class="number">1</span>
                        <button class="increment">+</button>
                    </div>
                </div>
                <svg class="cart-remove" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>`;
            
            return cartBox;
        },
        
        setupCartItemEvents: function(cartItem) {
            cartItem.querySelector(".cart-remove").addEventListener("click", () => {
                cartItem.remove();
                this.updateCount(-1);
                this.updateTotalPrice();
            });
            
            cartItem.querySelector(".cart-quantity").addEventListener("click", e => {
                const numberElement = cartItem.querySelector(".number");
                const decrementButton = cartItem.querySelector(".decrement");
                let quantity = parseInt(numberElement.textContent);
                
                if (e.target.classList.contains("decrement") && quantity > 1) {
                    quantity--;
                    if (quantity === 1) decrementButton.style.color = "#999";
                } else if (e.target.classList.contains("increment")) {
                    quantity++;
                    decrementButton.style.color = "#333";
                }
                
                numberElement.textContent = quantity;
                this.updateTotalPrice();
            });
        },
        
        updateCount: function(change) {
            const countBadge = document.querySelector(".cart-count");
            this.itemCount += change;
            
            if (this.itemCount > 0) {
                countBadge.style.visibility = "visible";
                countBadge.textContent = this.itemCount;
            } else {
                countBadge.style.visibility = "hidden";
                countBadge.textContent = "";
            }
        },
        
        updateTotalPrice: function() {
            const totalPriceElement = document.querySelector(".total-price");
            let total = 0;
            
            document.querySelectorAll(".cart-box").forEach(box => {
                const priceText = box.querySelector(".cart-price").textContent;
                const quantity = parseInt(box.querySelector(".number").textContent);
                const price = parseFloat(priceText.replace("Rs.", "").replace(/,/g, "").trim());
                total += price * quantity;
            });
            
            totalPriceElement.textContent = `Rs. ${total.toLocaleString()}`;
        },
        
        handleBuy: function() {
            if (this.itemCount === 0) {
                alert("Your cart is empty, please add items before buying");
                return;
            }
            
            this.content.innerHTML = "";
            this.itemCount = 0;
            this.updateCount(0);
            this.updateTotalPrice();
            window.location.href = "Thank.html";
        }
    };
    
    cart.init();
});

// ==================== Product Filtering ====================
document.addEventListener("DOMContentLoaded", function() {
    const filterItems = document.querySelectorAll(".categories li");
    const products = document.querySelectorAll(".product");
    
    filterItems.forEach(item => {
        item.addEventListener("click", function() {
            // Update active state
            filterItems.forEach(li => li.classList.remove("active"));
            this.classList.add("active");
            
            // Filter products
            const filter = this.dataset.filter;
            products.forEach(product => {
                if (filter === "all" || product.classList.contains(filter)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
});

// ==================== Product Details Modal ====================
document.addEventListener("DOMContentLoaded", function() {
    const modal = {
        element: document.getElementById("product-details-modal"),
        image: document.getElementById("modal-image"),
        title: document.getElementById("modal-title"),
        price: document.getElementById("modal-price"),
        description: document.getElementById("modal-description"),
        closeBtn: document.querySelector(".close"),
        
        init: function() {
            this.setupEventListeners();
            this.setupQuantityButtons();
        },
        
        setupEventListeners: function() {
            document.querySelectorAll(".product .view-details").forEach(icon => {
                icon.addEventListener("click", (e) => {
                    const product = e.target.closest(".product");
                    this.openModal(product);
                });
            });
            
            this.closeBtn.addEventListener("click", () => this.closeModal());
            window.addEventListener("click", (e) => {
                if (e.target === this.element) this.closeModal();
            });
        },
        
        openModal: function(product) {
            this.image.src = product.querySelector("img").src;
            this.title.textContent = product.querySelector(".product-title").textContent;
            this.price.textContent = product.querySelector(".price").textContent;
            this.element.style.display = "flex";
        },
        
        closeModal: function() {
            this.element.style.display = "none";
        },
        
        setupQuantityButtons: function() {
            document.querySelectorAll(".plus-btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    const input = this.previousElementSibling;
                    input.value = (parseInt(input.value) || 0) + 1;
                });
            });
            
            document.querySelectorAll(".minus-btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    const input = this.nextElementSibling;
                    const value = parseInt(input.value) || 0;
                    if (value > 1) input.value = value - 1;
                });
            });
        }
    };
    
    modal.init();
});

// ==================== Scroll to Top Button ====================
document.addEventListener("DOMContentLoaded", function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    
    window.addEventListener("scroll", function() {
        scrollBtn.classList.toggle("show", window.scrollY > 300);
    });
    
    scrollBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// ==================== Testimonials Slider ====================
document.addEventListener("DOMContentLoaded", function() {
    const testimonials = {
        items: document.querySelectorAll(".testimonial-item"),
        prevBtn: document.querySelector(".prev-btn"),
        nextBtn: document.querySelector(".next-btn"),
        currentIndex: 0,
        
        init: function() {
            this.showTestimonial(this.currentIndex);
            this.setupEventListeners();
        },
        
        showTestimonial: function(index) {
            this.items.forEach((item, i) => {
                item.classList.toggle("active", i === index);
            });
        },
        
        next: function() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.showTestimonial(this.currentIndex);
        },
        
        prev: function() {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.showTestimonial(this.currentIndex);
        },
        
        setupEventListeners: function() {
            this.prevBtn.addEventListener("click", () => this.prev());
            this.nextBtn.addEventListener("click", () => this.next());
        }
    };
    
    testimonials.init();
});
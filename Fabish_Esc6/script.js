//........................ preloader.................................. 
window.addEventListener("load", function () {
    setTimeout(function () {
        const preloader = document.querySelector(".preloader");
        preloader.style.display = "none";

        const content = document.querySelector(".content");
        content.style.display = "block";
    }, 3000); 
});

// .................button login/logout...............................
document.addEventListener("DOMContentLoaded", function() {
    let user = localStorage.getItem("loggedInUser");

    // login
    if (user) {
        document.getElementById("user-info").style.display = "block";
        document.getElementById("username").textContent = user;
        document.getElementById("login").style.display = "none";
    }
    
    // Logout 
    document.getElementById("logout-btn").addEventListener("click", function() {
        localStorage.removeItem("loggedInUser"); 
        window.location.reload(); 
    });
});


//.............................. slider ....................................
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const sliderContainer = document.querySelector(".slider-container");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(showNextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    startAutoSlide();

    nextButton.addEventListener("click", () => {
        showNextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        showPrevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);
});


// .............................Add To Cart..................... ....
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartclose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartclose.addEventListener("click", () => cart.classList.remove("active"));

const addcartbutton = document.querySelectorAll(".add-cart");
addcartbutton.forEach(button => {
    button.addEventListener("click", event => {
        const productbox = event.target.closest(".product-box");
        if (!productbox) return;
        addTocart(productbox);
    });
});


const cartcontent = document.querySelector(".cart-content");

const addTocart = productbox => {
    const productImage = productbox.querySelector("img").src;
    const productTitle = productbox.querySelector(".product-title").textContent;
    const productPrice = productbox.querySelector(".price").textContent;

const cartItems = document.querySelectorAll(".cart-product-title");
for (const item of cartItems) {
    if(item.textContent === productTitle){
        alert("this item is already in the cart");
        return;
    }
    
}


    const cartbox = document.createElement("div");
    cartbox.classList.add("cart-box");
    cartbox.innerHTML = `
        <img src="${productImage}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <svg  class="cart-remove" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>`;

    cartcontent.appendChild(cartbox);
    cartbox.querySelector(".cart-remove").addEventListener("click",()=>{
        cartbox.remove();
    updateCount(-1);

        ubdateTotalPrice();
    });
    cartbox.querySelector(".cart-quantity").addEventListener("click",event=>{
        const numberElement=cartbox.querySelector(".number");
        const decrementButton=cartbox.querySelector("#decrement");
        let quantity=numberElement.textContent;
        if (event.target.id === "decrement" && quantity>1) {
            quantity --;
            if (quantity === 1) {
                decrementButton.style.color="#999"; 
            }
        } else if(event.target.id ==="increment")
             {
            quantity ++;
            decrementButton.style.color="#333"; 

        }
        numberElement.textContent=quantity;
        ubdateTotalPrice();

    });
    updateCount(1);
    ubdateTotalPrice();
};

const ubdateTotalPrice=()=>{
const totalpriceElement=document.querySelector(".total-price");
const cartboxs=cartcontent.querySelectorAll(".cart-box");
let total=0;
cartboxs.forEach(cartbox =>{
    const priceElement=cartbox.querySelector(".cart-price");
    const quantityElement=cartbox.querySelector(".number");
    const price = parseFloat(priceElement.textContent.replace("Rs.", "").replace(/,/g, "").trim());
    let quantity=parseInt(quantityElement.textContent);
    total+=price *quantity;
});
totalpriceElement.textContent=`${total}`;
};

let cartItemCount=0;
const updateCount=change=>{
    const countbage=document.querySelector(".cart-count");
    cartItemCount+=change;
    if (cartItemCount>0) {
        countbage.style.visibility="visible";
        countbage.textContent=cartItemCount;
        
    } else {
        countbage.style.visibility="hidden";
        countbage.textContent="";
    }
}

// massage buy now
const buynowbutton=document.querySelector(".btn-buy");
buynowbutton.addEventListener("click",()=>{
    const cartboxs=cartcontent.querySelectorAll(".cart-box");
    if (cartboxs.length===0) {
        alert("your cart empty ,please add item before buying");
        return;
        
    }
    cartboxs.forEach(cartbox => cartbox.remove());
    cartItemCount=0;
    updateCount(0);
    ubdateTotalPrice();
    window.location.href = "Thank.html"; 
    alert("Thank You for buying");
})



// ..........................prouduct................................... 
document.querySelectorAll(".categories li").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".categories li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
    });
});


document.querySelectorAll(".categories li").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".categories li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
        let filter = this.getAttribute("data-filter");
        document.querySelectorAll(".product").forEach(product => {
            if (filter === "all") {
                product.classList.add("show");
            } else {
                if (product.classList.contains(filter)) {
                    product.classList.add("show");
                } else {
                    product.classList.remove("show");
                }
            }
        });
    });
});


document.querySelectorAll(".product").forEach(product => product.classList.add("show"));




//.............................. detailes cart...........................................
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('product-details-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.product .view-details').forEach(icon => {
        icon.addEventListener('click', function() {
            const product = this.closest('.product');
            const productImage = product.querySelector('img').src;
            const productTitle = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('p').textContent;

            modalImage.src = productImage;
            modalTitle.textContent = productTitle;
            modalPrice.textContent = productPrice;
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ...............................button  in detailes =/-............................
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.plus-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
        });
    });

    document.querySelectorAll('.minus-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let currentValue = parseInt(input.value) || 0;
            if(currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });
});

 //......................... top  button................................
document.addEventListener("DOMContentLoaded", function () {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// ....................termination.................
// slider image 
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialItems.length - 1;
    showTestimonial(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
    showTestimonial(currentIndex);
});


showTestimonial(currentIndex);

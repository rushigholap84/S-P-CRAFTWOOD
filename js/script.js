/* script.js - improved and safer interactions */

// DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// menu toggle
const menuBtn = $('#menu-bars');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navbar.classList.toggle('show');
  });
}

// theme toggler
const themeToggler = document.querySelector('.theme-toggler');
const toggleBtn = document.querySelector('.theme-toggler .toggle-btn');

if (toggleBtn && themeToggler) {
  toggleBtn.addEventListener('click', () => {
    themeToggler.classList.toggle('active');
  });
}

// close open panels on scroll
window.addEventListener('scroll', () => {
  if (navbar && navbar.classList.contains('show')) navbar.classList.remove('show');
  if (themeToggler && themeToggler.classList.contains('active')) themeToggler.classList.remove('active');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
});

// color chooser
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.style.background;
    if (color) document.documentElement.style.setProperty('--main-color', color);
  });
});

// Initialize Swiper for home-slider and review-slider safely
function initSwipers() {
  // Home slider - coverflow-like appearance
  if (typeof Swiper !== 'undefined') {
    new Swiper('.home-slider', {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 1.4,
        slideShadows: false,
      },
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      speed: 900,
    });

    new Swiper('.review-slider', {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      spaceBetween: 18,
      breakpoints: {
        700: { slidesPerView: 2 },
        1050: { slidesPerView: 3 },
      },
      autoplay: { delay: 5000, disableOnInteraction: false },
      speed: 700,
    });
  } else {
    console.warn('Swiper not loaded.');
  }
}
document.addEventListener('DOMContentLoaded', initSwipers);

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Gallery functionality
const galleryModal = document.getElementById('gallery-modal');
const viewAllBtn = document.getElementById('view-all-btn');
const closeGalleryBtn = document.getElementById('close-gallery');
const allGalleryGrid = document.getElementById('all-gallery-grid');

// All gallery images data
const allGalleryImages = [
  { src: 'images/IMG_6202.JPG', title: 'Custom Dining Table', alt: 'Wood Crafting 1' },
  { src: 'images/g-2.jpg', title: 'Handcrafted Chair', alt: 'Wood Crafting 2' },
  { src: 'images/g-3.jpg', title: 'Wooden Cabinet', alt: 'Wood Crafting 3' },
  { src: 'images/g-4.jpg', title: 'Decorative Panel', alt: 'Wood Crafting 4' },
  { src: 'images/g-5.jpg', title: 'Cutting Board', alt: 'Wood Crafting 5' },
  { src: 'images/g-6.jpg', title: 'Photo Frame', alt: 'Wood Crafting 6' },
  { src: 'images/g-7.jpg', title: 'Wooden Shelf', alt: 'Wood Crafting 7' },
  { src: 'images/g-8.jpg', title: 'Jewelry Box', alt: 'Wood Crafting 8' },
  { src: 'images/g-9.jpg', title: 'Serving Tray', alt: 'Wood Crafting 9' },
  { src: 'images/slide-1.jpg', title: 'Wooden Coffee Table', alt: 'Wood Crafting 10' },
  { src: 'images/slide-2.jpg', title: 'Custom Bookshelf', alt: 'Wood Crafting 11' },
  { src: 'images/slide-3.jpg', title: 'Handcrafted Bench', alt: 'Wood Crafting 12' },
  { src: 'images/slide-4.jpg', title: 'Wooden Wall Art', alt: 'Wood Crafting 13' },
  { src: 'images/slide-5.jpg', title: 'Decorative Bowl', alt: 'Wood Crafting 14' },
  { src: 'images/slide-6.jpg', title: 'Custom Headboard', alt: 'Wood Crafting 15' },
  { src: 'images/pic-1.png', title: 'Wooden Clock', alt: 'Wood Crafting 16' },
  { src: 'images/pic-2.png', title: 'Storage Box', alt: 'Wood Crafting 17' },
  { src: 'images/pic-3.png', title: 'Decorative Vase', alt: 'Wood Crafting 18' },
  { src: 'images/pic-4.png', title: 'Wooden Lamp', alt: 'Wood Crafting 19' },
  { src: 'images/about-img.jpg', title: 'Workshop Showcase', alt: 'Wood Crafting 20' }
];

// Load all gallery images into modal
function loadAllGalleryImages() {
  allGalleryGrid.innerHTML = '';
  allGalleryImages.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="item-title">${image.title}</div>
    `;
    allGalleryGrid.appendChild(galleryItem);
  });
}

// Open gallery modal
if (viewAllBtn && galleryModal) {
  viewAllBtn.addEventListener('click', () => {
    loadAllGalleryImages();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
}

// Close gallery modal
if (closeGalleryBtn && galleryModal) {
  closeGalleryBtn.addEventListener('click', () => {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  });
}

// Close modal when clicking outside
if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Review System
let currentRating = 0;
const stars = document.querySelectorAll('.star');
const ratingText = document.querySelector('.rating-text');
const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');

// Star rating functionality
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    currentRating = index + 1;
    updateStars();
    updateRatingText();
  });
  
  star.addEventListener('mouseenter', () => {
    highlightStars(index + 1);
  });
});

document.getElementById('starRating').addEventListener('mouseleave', () => {
  updateStars();
});

function highlightStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function updateStars() {
  stars.forEach((star, index) => {
    if (index < currentRating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function updateRatingText() {
  const ratingTexts = [
    'Click to rate',
    'Poor',
    'Fair', 
    'Good',
    'Very Good',
    'Excellent'
  ];
  ratingText.textContent = ratingTexts[currentRating];
}

// Review form submission
if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(reviewForm);
    const name = formData.get('reviewerName').trim();
    const email = formData.get('reviewerEmail').trim();
    const reviewText = formData.get('reviewText').trim();
    
    if (!name || !email || !reviewText || currentRating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }
    
    // Email validation
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Format WhatsApp message
    const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    const stars = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
    
    const whatsappMessage = `🌟 *NEW REVIEW FOR S P CRAFTWOOD* 🌟

👤 *Customer Name:* ${name}
📧 *Email:* ${email}
⭐ *Rating:* ${currentRating}/5 (${ratingTexts[currentRating]})
${stars}

💬 *Review:*
"${reviewText}"

📅 *Date:* ${new Date().toLocaleDateString()}
🕒 *Time:* ${new Date().toLocaleTimeString()}

---
*This review was submitted through the S P CRAFTWOOD website*`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Your WhatsApp number
    const whatsappNumber = '918104316752'; // Updated number
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Thank you for your review! You will be redirected to WhatsApp to send your review.');
    
    // Add new review to the slider (for immediate display)
    addNewReview(name, email, reviewText, currentRating);
    
    // Reset form
    reviewForm.reset();
    currentRating = 0;
    updateStars();
    updateRatingText();
  });
}

// Add new review to the slider
function addNewReview(name, email, reviewText, rating) {
  const reviewSlide = document.createElement('div');
  reviewSlide.className = 'swiper-slide box';
  
  const starsHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  
  reviewSlide.innerHTML = `
    <i class="fas fa-quote-right"></i>
    <div class="user">
      <img src="images/pic-${Math.floor(Math.random() * 4) + 1}.png" alt="${name}" loading="lazy">
      <div class="user-info">
        <h4>${name}</h4>
        <span>New Review</span>
        <div class="review-rating">
          <span class="stars">${starsHTML}</span>
        </div>
      </div>
    </div>
    <p>${reviewText}</p>
  `;
  
  reviewsContainer.appendChild(reviewSlide);
  
  // Reinitialize Swiper with new slides
  if (typeof Swiper !== 'undefined') {
    const reviewSlider = document.querySelector('.review-slider');
    if (reviewSlider.swiper) {
      reviewSlider.swiper.update();
    }
  }
}

// Contact form submission to WhatsApp
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !phone || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      alert('Please enter a valid email address.');
      return;
    }

    // Format WhatsApp message for contact form
    const whatsappMessage = `📞 *NEW CONTACT INQUIRY - S P CRAFTWOOD* 📞

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
${subject ? `📋 *Subject:* ${subject}` : ''}

💬 *Message:*
"${message}"

📅 *Date:* ${new Date().toLocaleDateString()}
🕒 *Time:* ${new Date().toLocaleTimeString()}

---
*This inquiry was submitted through the S P CRAFTWOOD website*`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Your WhatsApp number
    const whatsappNumber = '918104316752';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Thank you for your inquiry! You will be redirected to WhatsApp to send your message.');
    
    // Reset form
    form.reset();
  });
}

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
  { src: 'images/IMG_6202.JPG', title: 'S P CRAFTWOOD Logo', alt: 'S P CRAFTWOOD Logo' },
  { src: 'images/craftwork-01.jpeg', title: 'Premium Wood Crafting', alt: 'Wood Crafting 1' },
  { src: 'images/craftwork-02.jpeg', title: 'Handcrafted Excellence', alt: 'Wood Crafting 2' },
  { src: 'images/craftwork-03.jpeg', title: 'Custom Furniture', alt: 'Wood Crafting 3' },
  { src: 'images/craftwork-04.jpeg', title: 'Wood Artistry', alt: 'Wood Crafting 4' },
  { src: 'images/craftwork-05.jpeg', title: 'Decorative Woodwork', alt: 'Wood Crafting 5' },
  { src: 'images/craftwork-06.jpeg', title: 'Artisan Craftwork', alt: 'Wood Crafting 6' },
  { src: 'images/craftwork-07.jpeg', title: 'Handcrafted Furniture', alt: 'Wood Crafting 7' },
  { src: 'images/craftwork-08.jpeg', title: 'Custom Woodwork', alt: 'Wood Crafting 8' },
  { src: 'images/craftwork-09.jpeg', title: 'Premium Wood Art', alt: 'Wood Crafting 9' },
  { src: 'images/craftwork-10.jpeg', title: 'Decorative Pieces', alt: 'Wood Crafting 10' },
  { src: 'images/craftwork-11.jpeg', title: 'Wooden Accessories', alt: 'Wood Crafting 11' },
  { src: 'images/craftwork-12.jpeg', title: 'Custom Designs', alt: 'Wood Crafting 12' },
  { src: 'images/craftwork-13.jpeg', title: 'Wood Restoration', alt: 'Wood Crafting 13' },
  { src: 'images/craftwork-14.jpeg', title: 'Artisan Craftwork', alt: 'Wood Crafting 14' },
  { src: 'images/craftwork-15.jpeg', title: 'About S P CRAFTWOOD', alt: 'Wood Crafting 15' },
  { src: 'images/craftwork-16.jpeg', title: 'Client Showcase', alt: 'Wood Crafting 16' },
  { src: 'images/craftwork-17.jpeg', title: 'Professional Work', alt: 'Wood Crafting 17' },
  { src: 'images/craftwork-18.jpeg', title: 'Beautiful Craftwork', alt: 'Wood Crafting 18' },
  { src: 'images/craftwork-19.jpeg', title: 'Wooden Masterpieces', alt: 'Wood Crafting 19' },
  { src: 'images/craftwork-20.jpeg', title: 'Timeless Craftwork', alt: 'Wood Crafting 20' },
  { src: 'images/craftwork-21.jpeg', title: 'Exquisite Woodwork', alt: 'Wood Crafting 21' },
  { src: 'images/craftwork-22.jpeg', title: 'Master Craftsmanship', alt: 'Wood Crafting 22' },
  { src: 'images/craftwork-23.jpeg', title: 'Fine Wood Art', alt: 'Wood Crafting 23' },
  { src: 'images/craftwork-24.jpeg', title: 'Custom Creations', alt: 'Wood Crafting 24' },
  { src: 'images/craftwork-25.jpeg', title: 'Wooden Treasures', alt: 'Wood Crafting 25' },
  { src: 'images/craftwork-26.jpeg', title: 'Artisan Excellence', alt: 'Wood Crafting 26' },
  { src: 'images/craftwork-27.jpeg', title: 'Premium Craftwork', alt: 'Wood Crafting 27' },
  { src: 'images/craftwork-28.jpeg', title: 'Handcrafted Beauty', alt: 'Wood Crafting 28' },
  { src: 'images/craftwork-29.jpeg', title: 'Wood Art Mastery', alt: 'Wood Crafting 29' },
  { src: 'images/craftwork-30.jpeg', title: 'Timeless Woodwork', alt: 'Wood Crafting 30' },
  { src: 'images/craftwork-31.jpeg', title: 'Elegant Craftwork', alt: 'Wood Crafting 31' },
  { src: 'images/craftwork-32.jpeg', title: 'Wooden Excellence', alt: 'Wood Crafting 32' },
  { src: 'images/craftwork-33.jpeg', title: 'Artisan Masterpieces', alt: 'Wood Crafting 33' },
  { src: 'images/craftwork-34.jpeg', title: 'Custom Wood Art', alt: 'Wood Crafting 34' },
  { src: 'images/craftwork-35.jpeg', title: 'Premium Woodwork', alt: 'Wood Crafting 35' },
  { src: 'images/craftwork-36.jpeg', title: 'Handcrafted Perfection', alt: 'Wood Crafting 36' },
  { src: 'images/craftwork-37.jpeg', title: 'Wood Artistry', alt: 'Wood Crafting 37' },
  { src: 'images/craftwork-38.jpeg', title: 'Exquisite Furniture', alt: 'Wood Crafting 38' },
  { src: 'images/craftwork-39.jpeg', title: 'Master Woodwork', alt: 'Wood Crafting 39' },
  { src: 'images/craftwork-40.jpeg', title: 'Beautiful Craftwork', alt: 'Wood Crafting 40' },
  { src: 'images/craftwork-41.jpeg', title: 'Wooden Art', alt: 'Wood Crafting 41' },
  { src: 'images/craftwork-42.jpeg', title: 'Custom Excellence', alt: 'Wood Crafting 42' },
  { src: 'images/craftwork-43.jpeg', title: 'Premium Artistry', alt: 'Wood Crafting 43' },
  { src: 'images/craftwork-44.jpeg', title: 'Handcrafted Treasures', alt: 'Wood Crafting 44' },
  { src: 'images/craftwork-45.jpeg', title: 'Wood Mastery', alt: 'Wood Crafting 45' },
  { src: 'images/craftwork-46.jpeg', title: 'Artisan Beauty', alt: 'Wood Crafting 46' },
  { src: 'images/craftwork-47.jpeg', title: 'Exquisite Woodwork', alt: 'Wood Crafting 47' },
  { src: 'images/craftwork-48.jpeg', title: 'Custom Masterpieces', alt: 'Wood Crafting 48' },
  { src: 'images/craftwork-49.jpeg', title: 'Wood Art Excellence', alt: 'Wood Crafting 49' },
  { src: 'images/craftwork-50.jpeg', title: 'Premium Craftsmanship', alt: 'Wood Crafting 50' },
  { src: 'images/craftwork-51.jpeg', title: 'Handcrafted Art', alt: 'Wood Crafting 51' },
  { src: 'images/craftwork-52.jpeg', title: 'Wooden Mastery', alt: 'Wood Crafting 52' },
  { src: 'images/craftwork-53.jpeg', title: 'Artisan Perfection', alt: 'Wood Crafting 53' },
  { src: 'images/craftwork-54.jpeg', title: 'Custom Wood Art', alt: 'Wood Crafting 54' },
  { src: 'images/craftwork-55.jpeg', title: 'Exquisite Craftwork', alt: 'Wood Crafting 55' },
  { src: 'images/craftwork-56.jpeg', title: 'Master Woodwork', alt: 'Wood Crafting 56' }
];

// Load all gallery images into modal
function loadAllGalleryImages() {
  allGalleryGrid.innerHTML = '';
  allGalleryImages.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
    `;
    
    // Add click/tap event for popup
    galleryItem.addEventListener('click', () => {
      showImagePopup(image.src, image.alt);
    });
    
    // Add touch events for mobile
    galleryItem.addEventListener('touchstart', (e) => {
      e.preventDefault();
      showImagePopup(image.src, image.alt);
    });
    
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

/* Image Popup functionality
const imagePopup = document.getElementById('image-popup');
const popupImage = document.getElementById('popup-image');
const closePopupBtn = document.getElementById('close-popup');

// Show image popup
function showImagePopup(src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  imagePopup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close image popup
function closeImagePopup() {
  imagePopup.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close popup events
if (closePopupBtn) {
  closePopupBtn.addEventListener('click', closeImagePopup);
}

if (imagePopup) {
  imagePopup.addEventListener('click', (e) => {
    if (e.target === imagePopup) {
      closeImagePopup();
    }
  });
}

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imagePopup && imagePopup.classList.contains('active')) {
    closeImagePopup();
  }
});*/

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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

if (testimonials.length > 0) {
  setInterval(nextTestimonial, 4000);
}

// Initial display
showTestimonial(currentTestimonial);

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const windowHeight = window.innerHeight;
  const revealPoint = 80;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// BMI Calculator
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');
if (bmiForm) {
  bmiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let height = parseFloat(document.getElementById('bmi-height').value);
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    if (height > 0 && weight > 0) {
      // If height is less than 3, treat as meters; otherwise, as centimeters
      if (height >= 3) height = height / 100;
      const bmi = weight / (height * height);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      bmiResult.textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
      bmiResult.classList.add('show');
    } else {
      bmiResult.textContent = 'Please enter valid height and weight.';
      bmiResult.classList.add('show');
    }
  });
}

bmiResult.addEventListener('transitionend', function() {
  bmiResult.classList.remove('show');
});

// Progress bar functionality
function updateProgressBar() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Floating Action Button - scroll to contact
function scrollToContact() {
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = contactSection.offsetTop - headerHeight - 20;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Loading Screen
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 1500);
});

// Back to Top Button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function toggleBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

// Animated Counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Trigger counters when they come into view
const counterSection = document.querySelector('.counter-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

if (counterSection) {
  observer.observe(counterSection);
}

// Particle Background Animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Active Navigation State
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      if (email) {
        // Simulate subscription
        const btn = this.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#28a745';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '#ff2d2d';
          this.querySelector('.newsletter-input').value = '';
        }, 2000);
      }
    });
  }
  
  // Initialize particles
  createParticles();
}); 
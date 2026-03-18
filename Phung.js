document.addEventListener('DOMContentLoaded', () => {
  // --- 1. KHỞI TẠO SCROLLREVEAL (Hiệu ứng xuất hiện khi cuộn) ---
  if (typeof ScrollReveal !== 'undefined') {
    // Cấu hình chung cho các section: Chậm và sang trọng hơn
    ScrollReveal().reveal('section', {
      origin: 'bottom',
      distance: '60px',
      duration: 1200, // 1.2 giây để tạo cảm giác chuyển động cao cấp
      delay: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)', // Đường cong chuyển động mượt chuẩn Apple
      reset: false // Chỉ chạy một lần để giữ sự tập trung
    });

    // Hiệu ứng riêng cho các thẻ kỹ năng (Skills Tags)
    ScrollReveal().reveal('.skills-tags-grid span', {
      origin: 'top',
      distance: '20px',
      duration: 800,
      interval: 80, // Các tag sẽ "rơi" xuống lần lượt tạo hiệu ứng thị giác tốt
      easing: 'ease-out',
      reset: false
    });
  }

  // --- 2. SMOOTH SCROLL (Cuộn trang mượt mà khi bấm Menu) ---
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        // Offset 80px để không bị thanh Nav che mất tiêu đề section
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 3. ACTIVE LINK (Tự động highlight menu theo vị trí cuộn) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
      // Xác định section đang hiển thị (Offset 120px để kích hoạt sớm hơn một chút)
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // Nếu href của link trùng với id của section đang hiển thị
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  // --- 4. CONTACT FORM (Xử lý gửi form chuyên nghiệp) ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Check if all fields are filled
      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }

      // Print form data to console for demonstration (In real application, you would send this to a server)
      console.log('--- New Client Inquiry ---');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);

      // Display a professional response in English
      alert(`Thank you for your message, ${name}! I will review your inquiry and get back to you as soon as possible.`);
      
      form.reset(); // Clear the form after successful submission
    });
  }
});
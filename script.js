// Inicialização do AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Scroll suave para links internos
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll para links internos
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Atualizar link ativo
        updateActiveLink(targetId);
      }
    });
  });

  // Adicionar classe ativa ao header no scroll
  const header = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Atualizar link ativo baseado na seção visível
    updateActiveLinkOnScroll();
  });

  // Função para atualizar link ativo
  function updateActiveLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  // Função para atualizar link ativo baseado no scroll
  function updateActiveLinkOnScroll() {
    const sections = ['#inicio', '#sobre', '#servicos', '#localizacao'];
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    // Se estiver no topo da página, destacar "Início"
    if (window.scrollY < 200) {
      currentSection = '#inicio';
    } else {
      sections.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - navbarHeight - 100;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = sectionId;
          }
        }
      });
    }
    
    if (currentSection) {
      updateActiveLink(currentSection);
    }
  }

  // Funcionalidade para botões de serviço
  const serviceButtons = document.querySelectorAll('.service-info button');
  
  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceName = this.previousElementSibling.textContent;
      const message = `Olá! Gostaria de saber mais sobre o serviço: ${serviceName}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999369101&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // Lazy loading para imagens
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Adicionar loading state aos botões
  const buttons = document.querySelectorAll('button, .button-contact, .header-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
          this.classList.remove('loading');
          this.style.pointerEvents = 'auto';
        }, 2000);
      }
    });
  });

  // Adicionar efeito de destaque aos links de navegação
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Lead Form Handling
  const leadForm = document.getElementById('leadForm');
  
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simular envio do formulário
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Simular delay de envio
      setTimeout(() => {
        // Aqui você pode integrar com seu sistema de leads
        // Por exemplo, enviar para WhatsApp, email, CRM, etc.
        
        const message = `Novo agendamento:
Nome: ${data.name}
WhatsApp: ${data.phone}
Serviço: ${data.service}
Data: ${data.date || 'Não informada'}
Mensagem: ${data.message || 'Não informada'}`;
        
        const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999369101&text=${encodeURIComponent(message)}`;
        
        // Mostrar sucesso
        showNotification('Agendamento enviado com sucesso! Entraremos em contato em até 2 horas.', 'success');
        
        // Redirecionar para WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Resetar formulário
        this.reset();
        
        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
      }, 2000);
    });
  }

  // Service CTA Buttons
  const serviceCtaButtons = document.querySelectorAll('.service-cta');
  
  serviceCtaButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceName = this.closest('.service-info').querySelector('strong').textContent;
      const message = `Olá! Gostaria de saber mais sobre o serviço: ${serviceName}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999369101&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // Smooth scroll for all CTA buttons
  const ctaButtons = document.querySelectorAll('a[href="#agendamento"]');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.querySelector('#agendamento');
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll animations for trust indicators
  const trustItems = document.querySelectorAll('.trust-item');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  trustItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });

  // Add hover effects for testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  
  testimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    testimonial.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Form validation enhancement
  const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
        this.style.borderColor = '#dc3545';
        this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
      } else {
        this.style.borderColor = '#1877f2';
        this.style.boxShadow = '0 0 0 3px rgba(24, 119, 242, 0.1)';
      }
    });
    
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.style.borderColor = '#1877f2';
        this.style.boxShadow = '0 0 0 3px rgba(24, 119, 242, 0.1)';
      }
    });
  });
});

// Função para validar formulários (se houver)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
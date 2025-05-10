document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const navbarHeight = navbar?.offsetHeight || 0;

  // Smooth scrolling for anchor links
  navLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra space

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        // Optionally close mobile menu if open
      }
    });
  });

  // Navbar scroll effect (add shadow)
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // Intersection Observer for fade-in sections and active nav links
  const observerOptions = {
    rootMargin: `-${navbarHeight + 25}px 0px 0px 0px`, // Adjust top margin for fixed navbar
    threshold: 0.4 // Section is considered active when 40% visible
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Fade-in effect
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      } else {
        // Optional: remove fade-in-visible if you want elements to fade out when scrolling up
        // entry.target.classList.remove('fade-in-visible'); 
      }

      // Active nav link highlighting
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`nav a[href="#${id}"]`);

      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        navLinks.forEach(link => link.classList.remove('active-nav-link'));
        if (navLink) {
          navLink.classList.add('active-nav-link');
        }
      } else {
        if (navLink) {
          // Only remove if it's not considered the top-most visible section anymore
          // This helps keep an active link if scrolling quickly past small sections
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('fade-in-section'); // Initial state for CSS fade-in
    sectionObserver.observe(section);
  });

  // Fallback for initial load or if no section is intersecting enough
  // (e.g. if the page is very short or the first section doesn't meet threshold)
  function setActiveLinkOnLoad() {
    let currentActiveFound = false;
    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      // Check if section is at the top of the viewport or very close to it
      if (rect.top >= 0 && rect.top < window.innerHeight * 0.5) { 
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${id}"]`);
        navLinks.forEach(link => link.classList.remove('active-nav-link'));
        if (navLink) {
          navLink.classList.add('active-nav-link');
          currentActiveFound = true;
          break;
        }
      }
    }
    // If no section is clearly at the top (e.g. bottom of page), keep the last active or first
    if (!currentActiveFound && navLinks.length > 0) {
        let hasActive = Array.from(navLinks).some(link => link.classList.contains('active-nav-link'));
        if(!hasActive){
            navLinks[0].classList.add('active-nav-link'); // Default to first link
        }
    }
  }
  window.addEventListener('load', setActiveLinkOnLoad);
  window.addEventListener('scroll', setActiveLinkOnLoad); // Re-evaluate on scroll for robustness

  // Contact Options Toggle
  const contactTriggerButton = document.getElementById('contact-trigger-button');
  const contactOptions = document.getElementById('contact-options');

  if (contactTriggerButton && contactOptions) {
    // Verifica iniziale: se l'elemento ha 'hidden' ma è visibile, forzalo a 'display: none'.
    // Questo può aiutare se la classe 'hidden' di Tailwind ha conflitti.
    if (contactOptions.classList.contains('hidden')) {
      if (window.getComputedStyle(contactOptions).display !== 'none') {
        console.warn("#contact-options ha la classe 'hidden' ma non è display:none. Forzo display:none via JS.");
        contactOptions.style.display = 'none';
      }
    } else {
      // Se NON ha la classe 'hidden' all'inizio e vuoi che sia nascosto, aggiungila e imposta display:none.
      // Ma l'HTML attuale dovrebbe avere 'hidden', quindi questo blocco 'else' è per scenari imprevisti.
      // Per il caso corrente (pulsanti sempre visibili), il blocco 'if' sopra è più rilevante.
    }

    contactTriggerButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      
      // Alterna la classe 'hidden'
      contactOptions.classList.toggle('hidden');

      // Imposta esplicitamente lo stile display basandoti sulla presenza della classe 'hidden'
      if (contactOptions.classList.contains('hidden')) {
        contactOptions.style.display = 'none';
      } else {
        // Rimuovi lo stile display inline per permettere alle classi Tailwind (es. md:flex) di funzionare
        contactOptions.style.display = ''; 
      }
    });
  }

}); 
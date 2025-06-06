document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.pathname === window.location.pathname && this.hash) {
            e.preventDefault();
            let target = document.querySelector(this.hash);
            if (target) {
                const navbarHeight = document.querySelector('.navbar.fixed-top')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        }
    });
});

const sections = document.querySelectorAll("section[id], header[id]");
const navLi = document.querySelectorAll(".navbar-nav .nav-item .nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    const navbarHeight = document.querySelector('.navbar.fixed-top')?.offsetHeight || 70;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight - 50; 
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
    
    if (pageYOffset < (sections[0]?.offsetTop || 0) - navbarHeight - 50) {
         navLi.forEach(link => link.classList.remove("active"));
         const homeLink = document.querySelector('.navbar-nav .nav-link[href="#hero"]');
         if (homeLink) homeLink.classList.add("active");
    }
});
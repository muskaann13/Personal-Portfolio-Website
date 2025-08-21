// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable


// THEME MANAGEMENT
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

//checked the localStorage to know about the current theme otherwise set to dark-mode as default
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = (currentTheme === "dark") ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    //Animate theme toggle
    //GSAP is an animation library
    gsap.to(themeToggle, {
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
});


// Mobile Menu Management
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    //Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "";
    }
});


//Loading Animation
function initLoader() {
    const loader = document.querySelector(".loader");
    const loaderText = document.querySelector(".loader-text");
    const loaderProgress = document.querySelector(".loader-progress");

    //adding animations using GSAP 
    //animation to loader text
    gsap.to(loaderText, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
    });

    //animation to progress bar
    gsap.to(loaderProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        //when the progress reaches 100%, chaining another animation using onComplete callback
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                //once it is completely invisible
                onComplete: () => {
                    //removed loader
                    loader.style.display = "none";
                    //called to initialize animations
                    initAnimations();
                }
            });
        }
    });
}

//Initialize loader on page load
window.addEventListener("load", initLoader);

//Custom cursor (only on desktop)
if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
        });

        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.2,
        });
    });
}

//Initializing all animations to move to hero-section
function initAnimations() {
    //Navigation animation
    gsap.to("nav", {
        y: 0,
        duration: 1,
        ease: "power3.out"
    });

    //Hero Animation
    //this helps us chain multiple animations
    //so one by one each content comes
    const heroTl = gsap.timeline();
    heroTl
        .to(".hero-title", {
            opacity: 1,
            filter: "blur(0px)", /*removing blur*/
            y: 0,
            duration: 1.2,
            ease: "power3.out",
        })

        .to(".hero-subtitle", {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.5") /*overlapping it with previous animation using timeline offset syntax
        we start the subtitle animation 0.5s before*/

        .to(".hero-description", {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.3")

        .to(".cta-button", {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",// removes GSAP's transform so hover can work
        }, "-=0.3")

    // About section
    // let aboutTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#about",
    //         start: "top 80%",
    //         toggleActions: "play none none reverse"
    //     }
    // });

    // Step 1: Section Title
    // aboutTl.from(".about-title", {
    //     y: 50,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out"
    // }, "+=0.2")

    // Step 2: Section Content
    // .from(".section-content", {
    //     y: 80,
    //     opacity: 0,
    //     duration: 1,
    //     ease: "power3.out"
    // }, "-=0.5")

    // Step 3: Pro Cards with stagger
    // .from(".pro-card", {
    //     y: 40,
    //     scale: 0.9,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "back.out(1.7)",
    //     stagger: 0.2
    // });


    // Resume/Skills Section
    // let resumeTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#skills",
    //         start: "top 80%",
    //         toggleActions: "play none none reverse"
    //     }
    // });

    // Step 1: Section Title
    // resumeTl.from(".resume-title", {
    //     y: 50,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out"
    // }, "+=0.2")

    // // Step 2: Resume Tabs
    // .from(".resume-tabs", {
    //     y: 40,
    //     opacity: 0,
    //     duration: 0.6,
    //     ease: "power3.out"
    // }, "-=0.3") 

    // Step 4: Resume Items (Education/Experience) with stagger
    // .from(".resume-items .item", {
    //     x: (i) => i % 2 === 0 ? -80 : 80, // left items slide from left, right from right
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out",
    //     stagger: 0.3
    // }, "-=0.5")

    // Project Section

    // let projectsTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#projects",
    //         start: "top 80%",
    //         toggleActions: "play none none reverse"
    //     }
    // });

    // Step 1: Section Title
    // projectsTl.from(".portfolio-title", {
    //     y: 40,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out"
    // }, "+0.2")

    // Contact Section

    // let contactTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#contact",
    //         start: "top 85%",
    //         toggleActions: "play none none reverse",
    //     }
    // });

    // Step 1: Section Title (same style as others)
    // contactTl.from("#contact .section-title", {
    //     y: 40,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power3.out"
    // }, "+=0.2")

    // Step 2: Contact Info (slide from left)
    // .from("#contact .contact-info", {
    //     x: -100,
    //     opacity: 0,
    //     duration: 1,
    //     ease: "power3.out"
    // }, "+=0.3") // delay for smooth transition

    // Step 3: Contact Form (slide from right)
    // .from("#contact .contact-form-body", {
    //     x: 100,
    //     opacity: 0,
    //     duration: 1,
    //     ease: "power3.out"
    // }, "-=0.5"); // overlap with contact info

}

//Resume Section tools and tab contents
const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

let resumeTabNav = function(resumeTabClick) {
    // Step 1: Hide all tab contents
    resumeTabContents.forEach((resumeTabContent) => {
        resumeTabContent.style.display = "none";
        resumeTabContent.classList.remove("active");
    });

    // Step 2: Remove active class from all tab buttons
    resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
        resumePortfolioTabBtn.classList.remove("active");
    });

    // Step 3: Show the clicked tab content
    resumeTabContents[resumeTabClick].style.display = "flex";

    setTimeout(() => {
        resumeTabContents[resumeTabClick].classList.add("active");
    }, 100);

    // Step 4: Highlight the clicked tab button
    resumePortfolioTabBtns[resumeTabClick].classList.add("active");
};

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
    resumePortfolioTabBtn.addEventListener("click", (e) => {
        e.preventDefault(); // stop page reload/scroll
        resumeTabNav(i);
    });
});

// open/close Portfolio modals
const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardsWithModals.forEach((portfolioCardsWithModal) => {
    const portfolioCard = portfolioCardsWithModal.querySelector(".portfolio-card");
    const portfolioBackdrop = portfolioCardsWithModal.querySelector(".portfolio-modal-backdrop");
    const portfolioModal = portfolioCardsWithModal.querySelector(".portfolio-modal")
    const modalCloseBtn = portfolioCardsWithModal.querySelector(".modal-close-btn");
    
    portfolioCard.addEventListener("click", () => {
        portfolioBackdrop.style.display = "flex";

        setTimeout(() => {
            portfolioBackdrop.classList.add("active");
        }, 300);
        
        setTimeout(() => {
            portfolioModal.classList.add("active");
        }, 300);

    });

    modalCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        setTimeout(() => {
            portfolioBackdrop.style.display = "none";
        }, 500);

        setTimeout(() => { 
            portfolioBackdrop.classList.remove("active"); 
            portfolioModal.classList.remove("active"); 
        }, 100);
        
    });
});

// Send/Recieve emails from contact form = Email JS
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "6Y8N1bQwrpbg26OEc",
    });
})();

contactForm = document.getElementById("contact-form");
contactFormAlert = document.querySelector(".contact-form-alert");

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // these IDs from the previous steps
    emailjs.sendForm('service_rk16s7f', 'template_0xhdbe5', '#contact-form')
        .then(() => {
            //console.log('SUCCESS!');
            contactFormAlert.innerHTML = "<span>Your message sent successfully </span><i class='fa-solid fa-circle-check'></i>";
            contactForm.reset();

            setTimeout(() => {
                contactFormAlert.innerHTML = "";
            }, 5000);

        }, (error) => {
            //console.log('FAILED...', error);
            contactFormAlert.innerHTML = "<span>Message not sent </span><i class='fa-solid fa-circle-exclamation'></i>";
            contactFormAlert.title = error;
        });
});

ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 2500,
    delay: 400
});

ScrollReveal().reveal('.section-title', {delay: 250, origin: 'top'});
ScrollReveal().reveal('.about-img', {delay: 600, origin: 'top'});
ScrollReveal().reveal('.about-info', {delay: 250, origin: 'bottom'});
ScrollReveal().reveal('.pro-card, .about-buttons, .resume-tabs .tab-btn', {delay: 300, origin: 'right', interval: 200});
ScrollReveal().reveal('#skills .section-content .education .resume-line', {delay: 700, origin: 'bottom'});
ScrollReveal().reveal('.education .resume-items .item-left', {delay: 900, origin: 'left', interval: 400});
ScrollReveal().reveal('.education .resume-items .item-right', {delay: 920, origin: 'right'});
ScrollReveal().reveal('.portfolio-card', {delay: 300, origin: 'bottom', interval: 200});
ScrollReveal().reveal('.contact-info', {delay: 500, origin: 'left'});
ScrollReveal().reveal('.contact-form-body', {delay: 500, origin: 'right'});
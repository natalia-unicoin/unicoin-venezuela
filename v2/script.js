document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const donationModal = document.getElementById('donationModal');
    const closeModalBtn = document.querySelector('.close-modal-btn-x');
    const donationForm = document.getElementById('donationForm');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    
    

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            // Animate burger lines
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile nav when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.querySelectorAll('span').forEach(span => span.style.transform = 'none');
                mobileMenuToggle.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // --- Modal Open / Close ---
    const openModal = () => {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    const closeModal = () => {
        donationModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    donationModal.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            closeModal();
        }
    });

    // --- Form Submission & Success Feedback ---
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get donation details (can be used for tracking if needed)
        
        const name = document.getElementById('donorName').value;
        const lastName = document.getElementById('donorLastName').value;
        const email = document.getElementById('donorEmail').value;
        const country = document.getElementById('donorCountry').value;
        const company = document.getElementById('donorCompany').value;
        const linkedin = document.getElementById('donorLinkedIn').value;
        
        console.log(`Donation registered: by ${name} ${lastName} (${email}) from ${country}, Company: ${company}, LinkedIn: ${linkedin}`);
        
        // Open donation link in a new tab (DEV: Insert the link here)
        const donationUrl = '';
        if (donationUrl) {
            window.open(donationUrl, '_blank');
        }
        
        closeModal();
        
        // Show success screen on the landing page
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // --- Close Success Screen ---
    const closeSuccess = () => {
        successOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        donationForm.reset();
    };

    closeSuccessBtn.addEventListener('click', closeSuccess);
    successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) {
            closeSuccess();
        }
    });

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });



    // --- Share Campaign Button ---
    const shareBtns = document.querySelectorAll('.share-campaign-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageUrl = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(pageUrl).then(() => {
                    alert('Enlace copiado al portapapeles. ¡Comparte el mensaje!');
                }).catch(err => {
                    console.error('Error copying text: ', err);
                });
            } else {
                alert(`Comparte este enlace: ${pageUrl}`);
            }
        });
    });

    // --- Smooth Scrolling for internal links ---
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });


});

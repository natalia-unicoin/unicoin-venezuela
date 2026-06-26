document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const donationModal = document.getElementById('donationModal');
    const closeModalBtn = document.querySelector('.close-modal-btn-x');
    const donationForm = document.getElementById('donationForm');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    
    const presetBtns = document.querySelectorAll('.preset-btn');
    const customAmountInput = document.getElementById('customAmountInput');
    
    const userDonationVal = document.getElementById('userDonationVal');
    const unicoinMatchVal = document.getElementById('unicoinMatchVal');
    const totalImpactVal = document.getElementById('totalImpactVal');
    
    
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

    // --- Live Match Calculation ---
    const calculateMatch = (amount) => {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            userDonationVal.textContent = '$0.00 USD';
            unicoinMatchVal.textContent = '+ 0.00 UNIC';
            totalImpactVal.textContent = '$0.00 USD';
            return;
        }

        // 1 USD = 1 UNIC matched (dollar-for-dollar)
        const matchUnicoin = parsedAmount.toFixed(2);
        // Total impact is doubled because of the match
        const totalImpact = (parsedAmount * 2).toFixed(2);

        userDonationVal.textContent = `$${parsedAmount.toFixed(2)} USD`;
        unicoinMatchVal.textContent = `+ ${matchUnicoin} UNIC`;
        totalImpactVal.textContent = `$${totalImpact} USD`;
    };

    // --- Amount Presets Selection ---
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const amount = btn.getAttribute('data-amount');
            customAmountInput.value = amount;
            calculateMatch(amount);
        });
    });

    // --- Custom Amount Input ---
    customAmountInput.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Remove active class from presets if value doesn't match
        let matchedPreset = false;
        presetBtns.forEach(btn => {
            if (btn.getAttribute('data-amount') === value) {
                btn.classList.add('active');
                matchedPreset = true;
            } else {
                btn.classList.remove('active');
            }
        });
        
        calculateMatch(value);
    });

    // --- Form Submission & Success Feedback ---
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get donation details (can be used for tracking if needed)
        const amount = customAmountInput.value;
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('emailAddress').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phoneNumber').value;
        
        console.log(`Donation registered: ${amount} USD by ${name} (${email}) from ${country}, Tel: ${phone}`);
        
        // Open PayPal donation link in a new tab (placeholder URL, can be updated to specific PayPal link later)
        const paypalUrl = 'https://www.paypal.com/donate';
        window.open(paypalUrl, '_blank');
        
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
        
        // Set back default values
        presetBtns.forEach(b => b.classList.remove('active'));
        presetBtns[1].classList.add('active'); // $50 default active
        customAmountInput.value = "50";
        calculateMatch(50);
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

    // --- Creator Modal Open / Close ---
    const openCreatorModalBtn = document.querySelector('.open-creator-modal-btn');
    const creatorModal = document.getElementById('creatorModal');
    const closeCreatorBtn = document.querySelector('.close-creator-btn');
    const creatorForm = document.getElementById('creatorForm');

    if (openCreatorModalBtn && creatorModal) {
        openCreatorModalBtn.addEventListener('click', () => {
            creatorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeCreator = () => {
            creatorModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeCreatorBtn) {
            closeCreatorBtn.addEventListener('click', closeCreator);
        }

        creatorModal.addEventListener('click', (e) => {
            if (e.target === creatorModal) {
                closeCreator();
            }
        });

        if (creatorForm) {
            creatorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('creatorName').value;
                const email = document.getElementById('creatorEmail').value;
                const social = document.getElementById('creatorSocial').value;
                
                console.log(`Creator registered: ${name} (${email}) - ${social}`);
                
                closeCreator();
                
                // Show a simple success alert or use the same success overlay
                alert('¡Gracias por unirte! Nos pondremos en contacto contigo pronto con el kit de prensa.');
                creatorForm.reset();
            });
        }
    }

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

    // Initialize calculation
    calculateMatch(50);
});

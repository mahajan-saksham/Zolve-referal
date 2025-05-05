// Interactions and event handlers
document.addEventListener('DOMContentLoaded', function() {
    // CTA Button interactions
    setupCTAButtons();
    
    // Copy message button
    setupCopyMessage();
    
    // Mobile menu interactions
    setupMobileMenu();
    
    // Modal interactions
    setupModalInteractions();
    
    // Confetti effect setup
    setupConfetti();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Setup Nudge buttons
    setupNudgeButtons();
    
    // Remove any demo buttons that might exist
    removeDemoButtons();
});

// Setup Nudge Buttons functionality
function setupNudgeButtons() {
    const nudgeButtons = document.querySelectorAll('.nudge-button');
    
    // First, hide nudge buttons for completed referrals
    document.querySelectorAll('.referral-row').forEach(row => {
        const allStepsCompleted = row.querySelectorAll('.status-step.completed').length === 3; // Check if all 3 steps are completed
        const nudgeButton = row.querySelector('.nudge-button');
        
        if (allStepsCompleted && nudgeButton) {
            nudgeButton.style.display = 'none';
        }
    });
    
    // Setup click handlers for remaining visible buttons
    nudgeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the friend's name from the parent referral row
            const referralRow = this.closest('.referral-row');
            const friendName = referralRow.querySelector('.referral-info h4').textContent;
            
            // Reference to the button for changing state
            const nudgeBtn = this;
            
            // Show immediate feedback on the button
            nudgeBtn.textContent = 'SENDING...';
            nudgeBtn.style.backgroundColor = '#E55A38';
            nudgeBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Success state
                nudgeBtn.textContent = 'NUDGE SENT!';
                nudgeBtn.style.backgroundColor = '#48bb78';
                
                // Show a toast notification
                showToast(`Reminder sent to ${friendName}!`);
                
                // Reset the button after a delay
                setTimeout(() => {
                    nudgeBtn.textContent = 'NUDGE THEM';
                    nudgeBtn.style.backgroundColor = '';
                    nudgeBtn.disabled = false;
                }, 3000);
            }, 1200);
        });
    });
}

// Function to show toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'var(--primary)';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '1000';
        toast.style.transition = 'all 0.3s ease';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        document.body.appendChild(toast);
    }
    
    // Set message and show
    toast.textContent = message;
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// Function to remove any demo buttons
function removeDemoButtons() {
    // Remove any existing demo buttons
    document.querySelectorAll('.demo-button').forEach(btn => {
        btn.parentNode.removeChild(btn);
    });
    
    // Also use a MutationObserver to catch any dynamically added demo buttons
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('demo-button')) {
                        node.parentNode.removeChild(node);
                    }
                });
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
}

function setupCTAButtons() {
    const primaryCtaButton = document.getElementById('referralCta');
    const footerCta = document.getElementById('footerCta');
    
    // Handler for the main CTA button
    if (primaryCtaButton) {
        primaryCtaButton.addEventListener('click', function() {
            // Show confetti effect
            triggerConfetti();
            
            // Show success message
            showSuccessToast('Nice. Your ₹500 could be on the way.');
            
            // Attempt to copy a referral link to clipboard
            copyToClipboard('https://zolve.com/refer?code=YOUR123');
        });
    }
    
    // Handler for the footer CTA button
    if (footerCta) {
        footerCta.addEventListener('click', function() {
            // Show confetti effect
            triggerConfetti();
            
            // Attempt to copy a referral link to clipboard
            copyToClipboard('https://zolve.com/refer?code=YOUR123');
            
            // Show success message
            showSuccessToast('Sharing is caring! Link copied to clipboard.');
        });
    }
}

function setupCopyMessage() {
    const copyMessageBtn = document.getElementById('copyMessageBtn');
    
    if (copyMessageBtn) {
        copyMessageBtn.addEventListener('click', function() {
            const messageText = "Hey! Looking for a US bank? Use Zolve instead - instant card, no SSN needed. Here's my referral link: https://zolve.com/refer?code=YOUR123";
            
            copyToClipboard(messageText);
            
            // Update button text temporarily
            const originalText = copyMessageBtn.textContent;
            copyMessageBtn.textContent = '✓ Message Copied!';
            
            setTimeout(() => {
                copyMessageBtn.textContent = originalText;
            }, 2000);
        });
    }
}

function setupFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Add click event to flip the card
        card.addEventListener('click', function() {
            // Toggle a class to flip the card manually
            card.querySelector('.flip-card-inner').style.transform = 
                card.querySelector('.flip-card-inner').style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    });
}

function setupModalInteractions() {
    // Get modal elements
    const reminderModal = document.getElementById('reminderModal');
    const closeModal = document.getElementById('closeModal');
    
    // Function to open the modal
    window.openReminderModal = function() {
        if (reminderModal) {
            // Display the modal
            reminderModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
            
            // Animate the modal entrance with Zolve-like animation
            gsap.fromTo(reminderModal.querySelector('.reminder-modal'), 
                {y: 20, scale: 0.98, opacity: 0}, 
                {y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out'}
            );
            
            // Animate the illustration in the modal
            const illustration = reminderModal.querySelector('.reminder-illustration img');
            if (illustration) {
                gsap.fromTo(illustration, 
                    {y: 20, opacity: 0}, 
                    {y: 0, opacity: 1, duration: 0.5, delay: 0.2}
                );
            }
            
            // Animate the heading text
            const heading = reminderModal.querySelector('.reminder-heading');
            if (heading) {
                gsap.fromTo(heading, 
                    {y: 15, opacity: 0}, 
                    {y: 0, opacity: 1, duration: 0.4, delay: 0.3}
                );
            }
            
            // Animate the form elements
            const formElements = [
                reminderModal.querySelector('.editable-message'),
                reminderModal.querySelector('.sharing-buttons')
            ];
            
            formElements.forEach((el, index) => {
                if (el) {
                    gsap.fromTo(el, 
                        {y: 10, opacity: 0}, 
                        {y: 0, opacity: 1, duration: 0.3, delay: 0.4 + (index * 0.1)}
                    );
                }
            });
        }
    };
    
    // Close modal function
    const closeReminderModal = () => {
        if (reminderModal) {
            // Animate modal exit
            gsap.to(reminderModal.querySelector('.reminder-modal'), {
                y: 10, 
                opacity: 0, 
                duration: 0.3,
                ease: 'power2.in',
                onComplete: function() {
                    reminderModal.style.display = 'none';
                    document.body.style.overflow = ''; // Re-enable body scrolling
                }
            });
        }
    };
    
    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', closeReminderModal);
    }
    
    // Close modal when clicking outside of it
    if (reminderModal) {
        reminderModal.addEventListener('click', function(event) {
            if (event.target === reminderModal) {
                closeReminderModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && reminderModal.style.display === 'flex') {
                closeReminderModal();
            }
        });
    }
    
    // Setup sharing buttons in the modal
    setupSharingButtons();
}

function setupSharingButtons() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const smsBtn = document.querySelector('.sms-btn');
    const emailBtn = document.querySelector('.email-btn');
    const messageText = document.getElementById('messageText');
    
    if (whatsappBtn && messageText) {
        whatsappBtn.addEventListener('click', function() {
            const text = encodeURIComponent(messageText.value);
            window.open(`https://wa.me/?text=${text}`, '_blank');
        });
    }
    
    if (smsBtn && messageText) {
        smsBtn.addEventListener('click', function() {
            const text = encodeURIComponent(messageText.value);
            window.open(`sms:?&body=${text}`, '_blank');
        });
    }
    
    if (emailBtn && messageText) {
        emailBtn.addEventListener('click', function() {
            const text = encodeURIComponent(messageText.value);
            window.open(`mailto:?subject=Complete your Zolve signup&body=${text}`, '_blank');
        });
    }
}

function setupConfetti() {
    // Create a canvas for confetti
    const confettiContainer = document.getElementById('confetti-container');
    
    if (!confettiContainer) return;
    
    // We'll use the canvas when triggering confetti
}

function triggerConfetti() {
    // Simple confetti effect using canvas
    const confettiContainer = document.getElementById('confetti-container');
    
    if (!confettiContainer) return;
    
    // Create canvas element for confetti
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1001';
    confettiContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const confettiCount = 200;
    const colors = ['#6b46c1', '#00b3a4', '#48bb78', '#805ad5', '#f56565'];
    const confetti = [];
    
    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 6.28,
            spin: Math.random() < 0.5 ? 0.05 : -0.05,
            fallSpeed: Math.random() * 2 + 1
        });
    }
    
    // Animate the confetti
    const animateConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let stillActive = false;
        
        confetti.forEach(p => {
            p.y += p.fallSpeed;
            p.x += Math.sin(p.angle) * p.speed;
            p.angle += p.spin;
            
            if (p.y < canvas.height) {
                stillActive = true;
            }
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI, false);
            ctx.fill();
        });
        
        if (stillActive) {
            requestAnimationFrame(animateConfetti);
        } else {
            // Remove the canvas when animation completes
            canvas.remove();
        }
    };
    
    animateConfetti();
}

function setupHorizontalScroll() {
    const rewardsCarousel = document.querySelector('.rewards-carousel');
    
    if (rewardsCarousel) {
        // Make sure snap-scrolling works nicely on mobile
        rewardsCarousel.addEventListener('scroll', function() {
            // Intentionally left empty - this is just to ensure touch events
            // are captured correctly for better mobile scrolling
        });
    }
}

function setupMobileMenu() {
    // Mobile menu functionality removed
    console.log('Mobile menu disabled');
}

function setupScrollAnimations() {
    // Only run if ScrollTrigger is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Animate section titles as they scroll into view
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate reward cards
        gsap.utils.toArray('.reward-card').forEach((card, index) => {
            gsap.fromTo(card, 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card.parentElement,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate chat card
        const chatCard = document.querySelector('.chat-card');
        if (chatCard) {
            gsap.fromTo(chatCard, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: chatCard,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
        
        // Animate testimonial cards with stagger
        const testimonialCards = gsap.utils.toArray('.testimonial-card');
        if (testimonialCards.length) {
            gsap.fromTo(testimonialCards, 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: testimonialCards[0].parentElement,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
        
        // Animate tracker rows
        const referralRows = gsap.utils.toArray('.referral-row');
        if (referralRows.length) {
            gsap.fromTo(referralRows, 
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: referralRows[0].parentElement,
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }
}

function showSuccessToast(message) {
    // Create a toast element
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">✓</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    // Add it to the body
    document.body.appendChild(toast);
    
    // Animate in
    gsap.fromTo(toast, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    
    // Add a close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', function() {
        gsap.to(toast, { opacity: 0, duration: 0.3, onComplete: () => toast.remove() });
    });
    toast.querySelector('.toast-content').appendChild(closeBtn);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        gsap.to(toast, { opacity: 0, duration: 0.4, onComplete: () => toast.remove() });
    }, 4000);
}

function copyToClipboard(text) {
    // Create a temporary input element
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    
    // Execute copy command
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    
    // Remove the temporary element
    document.body.removeChild(input);
}

// Modal can be triggered programmatically using openReminderModal()

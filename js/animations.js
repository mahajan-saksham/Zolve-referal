// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation Setup
document.addEventListener('DOMContentLoaded', function() {
    // Hero animations
    initHeroAnimations();
    
    // Reward card animations
    initRewardCardAnimations();
    
    // ScrollTrigger animations
    initScrollAnimations();
    
    // Initialize the sparkle effect
    initSparkleEffect();
    
    // Initialize the earnings counter animation
    initEarningsCounter();
    
    // Boarding pass animation placeholder
    loadLottieAnimations();
});

function initHeroAnimations() {
    // Hero animations
    function animateHero() {
        // Reset any inline styles that might be causing issues
        gsap.set(".headline, .subtext, #referralCta, .main-hero-image", {
            clearProps: "all"
        });
        
        gsap.fromTo(".headline", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.fromTo(".subtext", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out"
        });

        gsap.fromTo("#referralCta", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            onComplete: function() {
                // Add a subtle pulse animation to the button after it appears
                gsap.to("#referralCta", {
                    scale: 1.03,
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        });

        gsap.fromTo(".main-hero-image", {
            opacity: 0,
            scale: 0.95
        }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.15,
            ease: "power3.out"
        });
    }
    animateHero();
    gsap.from('.main-hero-image', { 
        x: 50, 
        opacity: 0, 
        duration: 1.2, 
        delay: 1.3 
    });
}

function initRewardCardAnimations() {
    // Animate reward cards when they come into view
    const rewardCards = document.querySelectorAll('.reward-card');
    
    rewardCards.forEach((card, index) => {
        // Create a staggered entrance effect
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.15
        });
    });
}

function initScrollAnimations() {
    // Chat section animations
    gsap.from('.chat-bubble.friend', {
        scrollTrigger: {
            trigger: '.chat-section',
            start: "top 70%"
        },
        x: -50,
        opacity: 0,
        duration: 0.8
    });
    
    gsap.from('.chat-bubble.user', {
        scrollTrigger: {
            trigger: '.chat-bubble.friend',
            start: "top 70%"
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.7
    });
    
    // Rewards tracker animations
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.tracker-section',
            start: "top 75%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    
    // Testimonial animations
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * 0.2
        });
    });
    
    // Footer animation
    gsap.from('.sticky-footer', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: document.body,
            start: "top 10%",
            end: "bottom bottom",
            toggleActions: "play none none none"
        }
    });
}

function initSparkleEffect() {
    // Create the sparkle animation effect for the CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    
    ctaButtons.forEach(button => {
        const sparkle = button.querySelector('.sparkle-effect');
        
        // If there's a sparkle element
        if (sparkle) {
            // Create a timeline for the sparkle effect
            const sparkleTimeline = gsap.timeline({repeat: -1, repeatDelay: 4});
            
            sparkleTimeline
                .to(sparkle, {opacity: 0.7, duration: 0.3})
                .to(sparkle, {opacity: 0, duration: 0.7}, "+=0.5");
        }
    });
}

function initEarningsCounter() {
    // Animated counter effect for earnings
    const counter = document.getElementById('earningsCounter');
    
    if (counter) {
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            innerText: 1500,
            duration: 2,
            snap: { innerText: 5 },
            ease: "power1.inOut",
            onUpdate: function() {
                counter.innerHTML = '₹' + Math.floor(this.targets()[0].innerText);
            }
        });
    }
}

function loadLottieAnimations() {
    try {
        // Card animation - just animate the floating card div instead of using Lottie
        if (document.getElementById('cardAnimation')) {
            const floatingCard = document.querySelector('.floating-card');
            if (floatingCard) {
                // Create a simple floating animation instead of using Lottie
                gsap.to(floatingCard, {
                    y: -15,
                    rotation: 2,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
        }
    } catch (error) {
        console.log('Animation error:', error);
    }
}

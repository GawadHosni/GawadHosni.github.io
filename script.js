// تحسين كود القائمة المنسدلة
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');

    if (menuBtn && navContainer) {
        menuBtn.addEventListener('click', function() {
            // تبديل حالة القائمة
            navContainer.classList.toggle('active');
            
            // تغيير الأيقونة
            const isOpen = navContainer.classList.contains('active');
            this.innerHTML = isOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // تحسين إمكانية الوصول
            this.setAttribute('aria-expanded', isOpen);
            
            // منع التمرير عند فتح القائمة
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-container a').forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
    }
    // تحديث السنة في الفوتر
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // إظهار/إخفاء زر العودة للأعلى
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // تحميل الصور بكسلاسة
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img.lazy-load');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback للمتصفحات القديمة
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    };
    
    lazyLoadImages();
});
// بديل بسيط للقائمة المنسدلة
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const nav = document.querySelector('.nav-container');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});
// تحسين إمكانية الوصول (Accessibility)
document.addEventListener('DOMContentLoaded', function() {
    // إضافة ARIA labels للعناصر المهمة
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, index) => {
        link.setAttribute('aria-label', `رابط ${link.textContent}`);
    });

    // تحسين focus للأزرار
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});
// إضافة Service Worker للتخزين المؤقت
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// إضافة Content Security Policy (CSP) عبر meta tag
// (يجب إضافتها في <head>)
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; 
script-src 'self' https://cdnjs.cloudflare.com; 
style-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline'; 
img-src 'self' data: https://*.google.com; 
font-src 'self' https://fonts.gstatic.com; 
connect-src 'self' https://*.google.com"></meta>

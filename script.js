document.addEventListener('DOMContentLoaded', function() {
    // عناصر القائمة المنسدلة
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    
    // تفعيل القائمة المنسدلة
    if (menuBtn && navContainer) {
        menuBtn.addEventListener('click', function() {
            navContainer.classList.toggle('active');
            const isOpen = navContainer.classList.contains('active');
            
            // تغيير الأيقونة
            this.innerHTML = isOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // تحسين إمكانية الوصول
            this.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-container a').forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
// JavaScript لتحميل الصور بكسلاسة
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy-load"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
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

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
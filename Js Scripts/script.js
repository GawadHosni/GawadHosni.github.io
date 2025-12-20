function updateGrades() {
  const stage = document.getElementById('stage').value;
  const gradeSelect = document.getElementById('grade');

  gradeSelect.innerHTML = '<option value="">اختر الصف</option>';

  let grades = [];

  if (stage === 'primary') {
    grades = [
      { value: 'grade3', text: 'الصف الثالث الابتدائي' },
      { value: 'grade4', text: 'الصف الرابع الابتدائي' },
      { value: 'grade5', text: 'الصف الخامس الابتدائي' },
      { value: 'grade6', text: 'الصف السادس الابتدائي' }
    ];
  } else if (stage === 'prep') {
    grades = [
      { value: 'prep1', text: 'الصف الأول الإعدادي' },
      { value: 'prep2', text: 'الصف الثاني الإعدادي' },
      { value: 'prep3', text: 'الصف الثالث الإعدادي' }
    ];
  }

  grades.forEach(g => {
    const option = document.createElement('option');
    option.value = g.value;
    option.textContent = g.text;
    gradeSelect.appendChild(option);
  });
}

function showExam() {
  const grade = document.getElementById('grade').value;
  const result = document.getElementById('exam-result');

  if (!grade) {
    result.innerHTML = '<p>من فضلك اختر الصف الدراسي</p>';
    return;
  }

  result.innerHTML = `
    <img src="Images/${grade}.png" alt="جدول امتحانات ${grade}">
    <br><br>
    <a href="Images/${grade}.png" target="_blank" class="btn">فتح الصورة بحجم كامل</a>
  `;
}

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
document.addEventListener("DOMContentLoaded", function () {
  const subjects = document.querySelectorAll(".subject");

  subjects.forEach((subject) => {
    const button = subject.querySelector(".subject-name");
    const list = subject.querySelector(".teacher-list");

    button.addEventListener("click", function (e) {
      // قفل كل القوائم المفتوحة
      document.querySelectorAll(".teacher-list").forEach((el) => {
        if (el !== list) el.style.display = "none";
      });

      // فتح أو إغلاق القائمة المختارة
      if (list.style.display === "block") {
        list.style.display = "none";
      } else {
        list.style.display = "block";
      }
    });
  });
});
  const baseCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwOZoyuk5k3VMPbpbvShdOf-aJDJIP21xv4dJ36mjNoTaHOjOeC53tb3qlfK-XTToQItA49ELPQUkX/pub?gid=484642957&single=true&output=csv';

  function parseCSV(content) {
    const rows = [];
    const lines = content.split('\n');
    let currentRow = '';
    let insideQuotes = false;

    for (let line of lines) {
      if (!insideQuotes) {
        currentRow = line;
      } else {
        currentRow += '\n' + line;
      }

      const quoteCount = (currentRow.match(/"/g) || []).length;
      insideQuotes = quoteCount % 2 !== 0;

      if (!insideQuotes) {
        rows.push(parseCSVLine(currentRow));
      }
    }
    return rows;
  }

  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
  }

  function fetchNews(limit = 4) {
    const csvUrl = baseCsvUrl + '&cacheBuster=' + new Date().getTime();
    fetch(csvUrl)
      .then(response => response.text())
      .then(text => {
        const lines = parseCSV(text.trim());
        const container = document.getElementById('news-container');
        container.innerHTML = '';

        const newsItems = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i];
          const date = cols[1] || '';
          const title = cols[2] || '';
          const description = cols[3] || '';
          const link = cols[4] || '';

          if (title.trim() && description.trim()) {
            newsItems.push({ date, title, description, link });
          }
        }

        newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (newsItems.length === 0) {
          container.innerHTML = '<p style="text-align: center;">لا توجد أخبار حالياً.</p>';
          return;
        }

        const itemsToShow = limit ? newsItems.slice(0, limit) : newsItems;

        itemsToShow.forEach(({ date, title, description, link }) => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');

          const linkHtml = link.trim()
            ? `<a href="${link}" class="btn" target="_blank" rel="noopener">قراءة المزيد</a>`
            : '';

          newsItem.innerHTML = `
            <div class="news-date">${date}</div>
            <h3>${title}</h3>
            <p>${description.replace(/\n/g, '<br>')}</p>
            ${linkHtml}
          `;
          container.appendChild(newsItem);
        });

        // زر "عرض جميع الأخبار"
        if (limit && newsItems.length > limit) {
          const moreBtn = document.createElement('div');
          moreBtn.innerHTML = `
            <div style="text-align:center; margin-top: 1rem;">
              <a href="all-news.html" class="refresh-news-btn">عرض جميع الأخبار</a>
            </div>
          `;
          container.appendChild(moreBtn);
        }
      })
      .catch(err => {
        console.error('خطأ في تحميل الأخبار:', err);
        document.getElementById('news-container').innerText = 'فشل في تحميل الأخبار.';
      });
  }

  fetchNews();
  document.getElementById('refresh-news-btn').addEventListener('click', () => fetchNews());

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

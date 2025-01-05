// Process and map pasted data
document.querySelector('.input-area').addEventListener('input', function(e) {
    const text = e.target.value.trim();
    const lines = text.split('\n');
    const data = {};

    let currentKey = '';
    lines.forEach(line => {
        if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            currentKey = key.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
            data[currentKey] = value || '';
        } else if (line.trim() && currentKey) {
            data[currentKey] = line.trim();
        }
    });

    // Map the data to form fields
    const fieldMap = {
        'First name': 'firstName',
        'Last name': 'lastName',
        'Owner Home Address': 'homeAddress',
        'Owner Phone Number': 'ownerPhone',
        'Owner Email address': 'ownerEmail',
        'Social Security': 'ssn',
        'Confirm Social Security': 'confirmSSN',
        'Location Name (DBA)': 'locationName',
        'Legal Name': 'legalName',
        'Location Address': 'locationAddress',
        'Location Phone Number': 'locationPhone',
        'Location Email': 'locationEmail'
    };

    // Fill the form fields
    Object.entries(fieldMap).forEach(([key, id]) => {
        if (data[key]) {
            document.getElementById(id).value = data[key];
        }
    });

    // Handle required files checkboxes
    const requiredFilesText = text.split('required files:')[1];
    if (requiredFilesText) {
        const checkboxes = {
            'Tax Id': 'taxId',
            'Driver License': 'driverLicense',
            'Voided Check': 'voidedCheck',
            'Social Security': 'socialSecurity',
            'FNS/EBT': 'fnsEbt',
            'Other': 'other'
        };

        Object.entries(checkboxes).forEach(([label, id]) => {
            const checkbox = document.getElementById(id);
            if (checkbox && requiredFilesText.toLowerCase().includes(label.toLowerCase())) {
                checkbox.checked = true;
            }
        });
    }
});

// Clear the form
function clearForm() {
    document.querySelector('.input-area').value = '';
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

// Toggle language
let currentLanguage = 'en';
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    document.body.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        element.textContent = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
    });
    updateModalText(); // تحديث النصوص في النافذة المنبثقة عند تغيير اللغة
    saveUserPreferences();
    updateInputDirection(); // تحديث اتجاه النص داخل مربعات الإدخال
});

// تحديث اتجاه النص داخل مربعات الإدخال
function updateInputDirection() {
    const inputs = document.querySelectorAll('input[dir="auto"], textarea[dir="auto"]');
    inputs.forEach(input => {
        if (currentLanguage === 'ar') {
            input.setAttribute('dir', 'rtl');
        } else {
            input.setAttribute('dir', 'ltr');
        }
    });
}

// Toggle dark mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    saveUserPreferences();
    toggleLogo();
});

// تبديل اللوجو بناءً على الوضع المظلم
function toggleLogo() {
    const logoLight = document.getElementById('logo-light');
    const logoDark = document.getElementById('logo-dark');
    if (document.body.classList.contains('dark-mode')) {
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    } else {
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
    }
}

// تحميل تفضيلات المستخدم من ملفات تعريف الارتباط
function loadUserPreferences() {
    const language = getCookie('language');
    const darkMode = getCookie('darkMode');

    if (language) {
        currentLanguage = language;
        document.body.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            element.textContent = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
        });
    }

    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
        toggleLogo();
    }
}

// حفظ تفضيلات المستخدم في ملفات تعريف الارتباط
function saveUserPreferences() {
    setCookie('language', currentLanguage, 365);
    setCookie('darkMode', document.body.classList.contains('dark-mode'), 365);
}

// وظيفة لتعيين ملف تعريف الارتباط
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// وظيفة للحصول على ملف تعريف الارتباط
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// وظيفة لتحديث النصوص في النافذة المنبثقة بناءً على اللغة
function updateModalText() {
    const modalElements = document.querySelectorAll('#info-modal [data-en], #info-modal [data-ar]');
    modalElements.forEach(element => {
        element.textContent = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
    });
}

// وظيفة لفتح النافذة المنبثقة بعد 5 ثوانٍ
function showModalAfterDelay() {
    setTimeout(() => {
        const modal = document.getElementById('info-modal');
        const hasModalBeenShown = localStorage.getItem('modalShown');

        if (!hasModalBeenShown) {
            modal.style.display = 'block';
            updateModalText(); // تحديث النصوص عند فتح النافذة لأول مرة
            localStorage.setItem('modalShown', 'true');
        }
    }, 5000); // 5000 مللي ثانية = 5 ثوانٍ
}

// تحميل التفضيلات عند بدء التحميل
window.onload = function() {
    loadUserPreferences();
    showModalAfterDelay(); // عرض النافذة المنبثقة بعد 5 ثوانٍ
    updateInputDirection(); // تحديث اتجاه النص داخل مربعات الإدخال عند التحميل
};

// وظيفة لفتح وإغلاق النافذة المنبثقة
const infoBtn = document.getElementById('info-btn');
const modal = document.getElementById('info-modal');
const closeBtn = document.querySelector('.close');

infoBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    updateModalText(); // تحديث النصوص عند فتح النافذة يدويًا
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// التحقق من وجود تحديثات وإعادة تحميل الصفحة
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    window.location.reload();
                }
            });
        });
    });

    navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage('skipWaiting');
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'reload') {
            window.location.reload();
        }
    });
}
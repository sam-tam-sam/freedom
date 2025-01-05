const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './logo.png',
    './logo2.png'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// التعامل مع طلبات الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // إرجاع النسخة المخزنة مؤقتًا إذا وجدت
                if (response) {
                    return response;
                }

                // إنشاء نسخة من الطلب لأن الطلب يمكن استخدامه مرة واحدة فقط
                return fetch(event.request.clone()).then(
                    (response) => {
                        // التحقق من صحة الاستجابة
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // إنشاء نسخة من الاستجابة لأن الاستجابة يمكن استخدامها مرة واحدة فقط
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// تنشيط وتحديث Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // حذف التخزين المؤقت القديم
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // المطالبة بالتحكم في جميع الصفحات فورًا
            return self.clients.claim();
        })
    );
});

// التعامل مع الرسائل
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
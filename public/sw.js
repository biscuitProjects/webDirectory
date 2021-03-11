// Тут имя можно любое задать
const staticCacheName = 's-app-v4'
const dynamicCacheName = 'd-app-v3'

// задаём файлы для сохранения их в кеше
const assetUrls = [
    'department.css',
    'style.css',
    'style2.css',
    'public.js',
    'img/logoB.svg'
]

// При установки ПВА, создаём кеш
self.addEventListener('install', async event => {
    console.log('cache add')
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
    console.log('cache added')
})

// При активации ПВА, проверяем кеш, если мы задали новое значение,
// то загружаем новый и удаляем старый кеш
self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
        .filter(name => name !== staticCacheName)
        .filter(name => name !== dynamicCacheName)
        .map(name => caches.delete(name))
    )
})

// Тут проверяет тип запроса.
// Если запрос относится к нашему домену, сначала проверяем его в кеше
// Если нет, то проверяем
// 
self.addEventListener('fetch', event => {
    const {request} = event

    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})

// Если запрос есть в кеше, то возвращяем его
async function cacheFirst(request) {
    // Проверка кеша
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}

// Если запроса нет в кеше, то вызываем эту функцию
async function networkFirst(request) {
    // Проверка кеша
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
}
const CACHE = 'acervo-shell-v1';
const SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/tab-resumo.svg',
  './icons/tab-armas.svg',
  './icons/tab-limpeza.svg'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e)=>{
  const url = new URL(e.request.url);

  if(url.pathname.includes('/data/')){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }

  if(SHELL.some(p=>url.pathname.endsWith(p.replace('./','/')))){
    e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request)));
    return;
  }
});

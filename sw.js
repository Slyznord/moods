if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const a=e=>n(e,o),d={module:{uri:o},exports:r,require:a};i[o]=Promise.all(s.map((e=>d[e]||a(e)))).then((e=>(c(...e),r)))}}define(["./workbox-ee742793"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/home-CfIHBvbL.js",revision:null},{url:"assets/index-BCMukEFj.css",revision:null},{url:"assets/index-BpkBQ2L0.js",revision:null},{url:"img/icons/android-chrome-192x192.png",revision:"ee81a7e8cf27f9ba2e1786373fba6e82"},{url:"img/icons/android-chrome-512x512.png",revision:"68033451b066d55b6c69e3a32f60a142"},{url:"img/icons/android-chrome-maskable-192x192.png",revision:"ee81a7e8cf27f9ba2e1786373fba6e82"},{url:"img/icons/android-chrome-maskable-512x512.png",revision:"68033451b066d55b6c69e3a32f60a142"},{url:"img/icons/apple-touch-icon-120x120.png",revision:"ebf395d63a260637d8c48748064375d5"},{url:"img/icons/apple-touch-icon-152x152.png",revision:"2e1b6188645841939b820ba4dcaeeb5d"},{url:"img/icons/apple-touch-icon-180x180.png",revision:"75878cd1a9d87420e55f633f89c368cf"},{url:"img/icons/apple-touch-icon-60x60.png",revision:"7e1c5f1aaec10db258fffb3407bab159"},{url:"img/icons/apple-touch-icon-76x76.png",revision:"f3abbe8df7622990b29e1ca773c69a51"},{url:"img/icons/apple-touch-icon.png",revision:"b1b82472d5526625df6cd14eeeb58333"},{url:"img/icons/favicon-16x16.png",revision:"fdad8b265952643365f19c0f488c6905"},{url:"img/icons/favicon-32x32.png",revision:"1589ee8da18aaf6ef500b3ea5d682850"},{url:"img/icons/msapplication-icon-144x144.png",revision:"74d3fa0b17d65ac914acac7328e4960d"},{url:"img/icons/mstile-150x150.png",revision:"8e3cb655093ce73280277402441a3765"},{url:"index.html",revision:"6ddc51a1aabf3c53ef2dc061b9279c7e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"service-worker.js",revision:"2f23ecb35da52495481db740bb179156"},{url:"manifest.webmanifest",revision:"5c22afb7836e9a7177f85dc5823c873d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[]}),"GET")}));

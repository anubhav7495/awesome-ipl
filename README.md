# Awesome IPL PWA

## Libraries Used

* Framework: Vue.js 2.0
* Routing: Vue-router
* Charts: D3.js V4

## Bonus Points

* Create web-app in Vue.js: Complete
  * Vue.js borrows heavily from Angular and React syntax, so was easy to pick up.
  * Chose Vue over React because of smaller library size and performance.
  * Didn't use angular 2/4 because it is too big in size and overly complex.
  * Wanted to use Preact, but chose Vue due to better Vue-router, Preact-Router doesn't easily work with hashHistory.


* Optimize Loading Time: Complete
  * All Javascript and CSS is minified.
  * Runtime-only build of Vue is used, which is 6Kb lighter and also has performance benefits.
  * Webpack is used to split Vendor and App bundle.
  * Preload is used to load Vendor and App bundle.
  * Home Route has Static Content (Kind of cheating to get a lower First Paint Time).


* Mobile Responsive: Complete
  * Responsive breakpoints used to make the web-app mobile responsive.
  * Responsive dimensions of D3 charts set dynamically.
  * Redrawing of D3 charts on window resize event(550ms debounced).


* Progressive Web App: Complete
  * sw-precache to provide a service worker for the web-app to cache app shell.
  * manifest file to display install banners and splash screen.
  * LightHouse Score of 90+/100


* Offline Usage: Complete
  * Offline caching of static assets using service-worker.
  * Cache-First strategy used to fetch dynamic GET requests using service-worker.

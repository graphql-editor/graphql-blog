require('prismjs/themes/prism-okaidia.css')
exports.onServiceWorkerUpdateFound = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
}

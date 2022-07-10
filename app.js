if("serviceWorker" in navigator) {

    navigator.serviceWorker.register("/sw.js")
    .then(() => {
        console.log("Service worker registered")
    })
    .catch(() => {
        console.log("Failed to register service worker")
    })

}

console.log("HI github")
console.log("update from github on v0.01 branch")

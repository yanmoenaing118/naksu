if("serviceWorker" in navigator) {

    navigator.serviceWorker.register("/sw.js")
    .then(() => {
        console.log("Service worker registered")
    })
    .catch(() => {
        console.log("replace by v0.0.1");
    })

}

console.log("HI github")
console.log("update from github on v0.01 branch")

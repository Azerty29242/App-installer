function getApps(callback) {
    fetch(new URL("apps.json"))
        .then((response) => response.json())
        .then((data) => {
            callback(JSON.parse(data))
            return true
        })
}

getApps((data) => console.log(data))
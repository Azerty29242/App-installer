function getApps(callback) {
    fetch("https://raw.githubusercontent.com/Azerty29242/App-installer/main/apps.json")
        .then((response) => response.json())
        .then((apps) => {
            apps.forEach((app, index) => {
                getLatestRelease(app.name, app.author, (release) => {
                    app.latest = { 
                        release: release
                    }
                    callback(app)
                })
            })
        })
}

function getLatestRelease(name, author, callback) {
    fetch(`https://api.github.com/repos/${author}/${name}/releases`)
        .then((response) => response.json())
        .then((data) => {
            try {
                callback(data[0].tag_name)
                return true
            } catch {
                callback(null)
                return false
            }
        })
}

getApps((apps) => {
    console.log(apps)
})
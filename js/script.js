var option;

function getApps(callback) {
    fetch("https://raw.githubusercontent.com/Azerty29242/App-installer/main/apps.json")
        .then((response) => response.json())
        .then((apps) => {
            var formatted_apps = []
            apps.forEach(async (app) => {
                formatted_apps.push(
                    await getLatestRelease(app.name, app.author, (release, assets) => {
                        app.latest = { 
                            release: release,
                            asset: assets[0] ? assets[0].browser_download_url : ""
                        }
                    })
                )
            })

            callback(apps)
        })
}

async function getLatestRelease(name, author, callback) {
    fetch(`https://api.github.com/repos/${author}/${name}/releases`)
        .then((response) => response.json())
        .then((releases) => {
            try {
                var latest = releases[0]
                fetch(`https://api.github.com/repos/${author}/${name}/releases/${latest.id}/assets`)
                    .then((response) => response.json())
                    .then((assets) => {
                        callback(latest.tag_name, assets)
                    })
                return true
            } catch {
                callback(null)
                return false
            }
        })
}

getApps((apps) => {
    var options = []
    apps.forEach((app) => {
        option = document.createElement("option")
        option.value = `${app.author}/${app.name}`
        option.innerHTML = app.name
    })
    $('select').formSelect({
        dropdownOptions: options
    });
})
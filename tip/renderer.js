let touxiang = document.getElementById("touxiang")
let renwubiaoti = document.getElementById("renwubiaoti")
let renwumiaoshu = document.getElementById("renwumiaoshu")

window.electronAPI.handleCounter((event, value) => {
    const {avatarPath,taskName,taskDesc} = JSON.parse(JSON.parse(value))

    console.log(avatarPath)
    console.log(taskName)
    console.log(taskDesc)

    touxiang.src = avatarPath
    renwubiaoti.innerText = taskName
    renwumiaoshu.innerText = taskDesc
})




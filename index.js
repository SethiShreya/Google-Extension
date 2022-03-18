let arr = []

const inputEl = document.getElementById("input-txt")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-txt")
const tabBtn = document.getElementById("save-tab-btn")
const clearbBtn = document.getElementById("clear-btn")

const linkFromLocalStorage = JSON.parse(localStorage.getItem("arr"))

if (linkFromLocalStorage) {
    arr = linkFromLocalStorage
    render(arr)

}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        arr.unshift(tabs[0].url)
        localStorage.setItem("arr", JSON.stringify(arr))
        render(arr)
    })

})

function render(temp) {
    let listItem = ""
    for (let i = 0; i < temp.length; i++) {
        listItem +=
            `<li>
             <a target='_blank' href='${temp[i]}'> ${temp[i]}
             </a>
         </li>`
    }
    ulEl.innerHTML = listItem
}

clearbBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    arr = []
    render(arr)

})

saveBtn.addEventListener("click", function() {
    arr.unshift(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("arr", JSON.stringify(arr))
    render(arr)
})

inputEl.addEventListener("keyup", function(event) {
    if (event.key === 'Enter')
        saveBtn.click()
})
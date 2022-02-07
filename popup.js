let urlList = document.getElementById("urls");

chrome.storage.sync.get("urls", ({ urls }) => {
    urlList.textContent = JSON.stringify(urls);
});

let changePushups = document.getElementById("currentPushUps");

chrome.storage.sync.get("currentPushUps", ({ currentPushUps }) => {
    changePushups.textContent = currentPushUps;
});

let changeDonePushups = document.getElementById("donePushUps");

chrome.storage.sync.get("donePushUps", ({ donePushUps }) => {
    changeDonePushups.textContent = donePushUps;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("clearPushUps").addEventListener("click", clearPushUps);
    document.getElementById("donePushUpsButton").addEventListener("click", handlerDone);
});

function clearPushUps() {
    chrome.storage.sync.set({ currentPushUps: 0 });
    chrome.storage.sync.set({ urls: [] });
    chrome.action.setBadgeText({text: ""});
    window.location.href = "popup.html";
}

function handlerDone() {
    let donePushUpsBuf = 0;

    chrome.storage.sync.get("donePushUps", ({ donePushUps }) => {
        donePushUpsBuf = donePushUps
    });

    chrome.storage.sync.get("currentPushUps", ({ currentPushUps }) => {
        chrome.storage.sync.set({ donePushUps: donePushUpsBuf + currentPushUps });
    });

    clearPushUps();
}
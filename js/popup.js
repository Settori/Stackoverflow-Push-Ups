let urlList = document.getElementById("urls");

chrome.storage.local.get("urls", ({ urls }) => {
    console.log(urls);
    if (urls) {
        urlList.textContent = JSON.stringify(urls);
    }
});

let changePushups = document.getElementById("currentPushUps");

chrome.storage.local.get("currentPushUps", ({ currentPushUps }) => {
    changePushups.textContent = currentPushUps;
});

let changeDonePushups = document.getElementById("donePushUps");

chrome.storage.local.get("donePushUps", ({ donePushUps }) => {
    changeDonePushups.textContent = donePushUps;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("clearPushUps").addEventListener("click", testoo);
    document.getElementById("donePushUpsButton").addEventListener("click", handlerDone);
});

function clearPushUps() {
    chrome.storage.local.set({ currentPushUps: 0 });
    chrome.storage.local.set({ urls: [] });
    chrome.action.setBadgeText({text: ""});
    window.location.href = "popup.html";
}

function handlerDone() {
    let donePushUpsBuf = 0;

    chrome.storage.local.get("donePushUps", ({ donePushUps }) => {
        donePushUpsBuf = donePushUps
    });

    chrome.storage.local.get("currentPushUps", ({ currentPushUps }) => {
        chrome.storage.local.set({ donePushUps: donePushUpsBuf + currentPushUps });
    });

    clearPushUps();
}

function testoo() {
    console.log("testoo");
    chrome.storage.local.get("urls", ({ urls }) => {
        console.log(urls);
    });
    
}
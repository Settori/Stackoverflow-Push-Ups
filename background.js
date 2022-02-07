let urls = [];
let currentPushUps = 0;
let donePushUps = 0;

chrome.runtime.onInstalled.addListener(() => {
    urls = [];
    chrome.action.setBadgeBackgroundColor({color: "#2a92a0"});
    chrome.storage.sync.set({ urls, currentPushUps, donePushUps });
});

const filter = {
    url: [
        {
            urlMatches: 'https://stackoverflow.com/questions/',
        },
    ],
};

chrome.webNavigation.onCompleted.addListener(function(tab) {
    if (!urls.includes(tab.url)) {
        urls.push(tab.url);
        currentPushUps = currentPushUps + 1;
        let badgeText = currentPushUps.toString();
        chrome.action.setBadgeBackgroundColor({color: "#2a92a0"});
        chrome.action.setBadgeText({text: badgeText});
        chrome.storage.sync.set({ urls, currentPushUps });
    }
}, filter);
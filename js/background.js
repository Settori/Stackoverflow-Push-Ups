let urls = [];
let currentPushUps = 0;
let donePushUps = 0;
let filterUrls = ['https://stackoverflow.com/questions/'];

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeBackgroundColor({color: "#2a92a0"});
    chrome.storage.local.set({ urls: urls, currentPushUps, donePushUps, filterUrls });
});

let filter = {
    url: [
        {
            urlMatches: filterUrls.join("|"),
        },
    ],
};

function getFilters() {
    chrome.storage.local.get('filterUrls', function (result) {
        filter = {
            url: [
                {
                    urlMatches: result.filterUrls.join("|"),
                },
            ],
        }
        console.log(filter);
    })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == 'filterUrls') {
            getFilters();
            console.log(filter);
        }
        // console.log(
        //     `Storage key "${key}" in namespace "${namespace}" changed.`,
        //     `Old value was "${oldValue}", new value is "${newValue}".`
        // );
    }
});

chrome.webNavigation.onCompleted.addListener(function(tab) {
    if (!urls.includes(tab.url)) {
        // getFilters();
        urls.push(tab.url);
        currentPushUps = currentPushUps + 1;
        let badgeText = currentPushUps.toString();
        chrome.action.setBadgeBackgroundColor({color: "#2a92a0"});
        chrome.action.setBadgeText({text: badgeText});
        chrome.storage.local.set({ urls, currentPushUps });
    }
}, filter);
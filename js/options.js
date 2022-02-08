let addFilterButton = document.getElementById("filterUrlAddButton");

document.addEventListener('DOMContentLoaded', function() {
    addFilterButton.addEventListener("click", addFilterUrl);
});

let urlsTable = document.getElementById("urls");
chrome.storage.local.get("urls", ({ urls }) => {
    if (urls) {
        tableContent = "";
        urls.forEach(element => {
            tableContent = tableContent + "<tr><td><a href='" + element + "'>" + element + "</a></td></tr>";
        });
        urlsTable.innerHTML = tableContent;
    }
});

let filterUrlsTable = document.getElementById("filterUrls");
chrome.storage.local.get("filterUrls", ({ filterUrls }) => {
    if (filterUrls) {
        tableContent = "";

        filterUrls.forEach(element => {
            tableContent = tableContent + "<tr><td>" + element + "</td></tr>";
        });
        filterUrlsTable.innerHTML = tableContent;
    }
});

function addFilterUrl() {
    chrome.storage.local.get("filterUrls", ({ filterUrls }) => {
        let inputValue = document.getElementById("filterUrlInput").value;
        if (inputValue) {
            filterUrls.push(inputValue);
            chrome.storage.local.set({ filterUrls: filterUrls });
            // window.location.href = "options.html";
        }
    });
    
}
// background.js

console.log("Background script running...");

let keywords = [];

async function fetchKeywords() {
  console.log("Fetching keywords...");
  // --- REPLACE THIS WITH YOUR ACTUAL GOOGLE SHEETS API LOGIC ---
  return new Promise(resolve => {
    setTimeout(() => {
      const fetchedKeywords = ["example", "important", "data", "found"];
      console.log("Keywords fetched:", fetchedKeywords);
      keywords = fetchedKeywords;
      resolve(fetchedKeywords);
    }, 1000); // Simulate API call
  });
}

function executeContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  }, () => {
    console.log("Content script injected and (will) run on tab:", tabId);
    // Optionally, you can now send the keywords directly to the content script
    chrome.tabs.sendMessage(tabId, { action: "updateKeywords", keywords: keywords });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Background script received message:", request);

    if (request.action === "startKeywordScan") {
      console.log("Received start scan request from popup.");
      // Fetch keywords first
      fetchKeywords().then(() => {
        // Get the currently active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (tabs && tabs.length > 0) {
            const activeTabId = tabs[0].id;
            console.log("Active tab ID:", activeTabId);
            // Execute the content script on the active tab
            executeContentScript(activeTabId);
            sendResponse({ status: "scanning" });
          } else {
            sendResponse({ error: "No active tab found." });
          }
        });
      });
      // Important: Return true to indicate you wish to send a response asynchronously
      return true;
    } else if (request.action === "requestKeywords") {
      sendResponse({ keywords: keywords });
    }
  }
);

// You might remove the onInstalled and setInterval for fetching
// if you only want to fetch and highlight on button click.
// chrome.runtime.onInstalled.addListener(() => {
//   fetchKeywords();
// });

// setInterval(fetchKeywords, 60 * 60 * 1000);
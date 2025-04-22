// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const startScanBtn = document.getElementById('startScanBtn');
  
    if (startScanBtn) {
      startScanBtn.addEventListener('click', function() {
        console.log('Scan button clicked in popup.');
  
        // Send a message to the background script to start the process
        chrome.runtime.sendMessage({ action: "startKeywordScan" }, function(response) {
          if (response && response.status === "scanning") {
            console.log("Background script initiated scanning.");
            // Optionally, update the popup UI to indicate scanning
          } else if (response && response.error) {
            console.error("Error starting scan:", response.error);
            // Optionally, display an error message in the popup
          }
        });
      });
    } else {
      console.error("Start button not found in popup!");
    }
  });
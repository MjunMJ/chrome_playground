// Function to highlight keywords in the text
function highlightKeywords(keywords) {
    const bodyText = document.body.innerText;
    const bodyElement = document.body;
  
    // Create a regular expression by joining keywords with '|' (OR operator)
    // and escaping special characters to avoid regex errors.
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi'); // 'gi' for global and case-insensitive
  
    // Function to recursively traverse and highlight text nodes
    function traverseAndHighlight(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        let newHTML = node.textContent.replace(regex, '<span style="background-color: red; color: black;">$1</span>');
        if (newHTML !== node.textContent) {
          const tempElement = document.createElement('span');
          tempElement.innerHTML = newHTML;
          node.parentNode.insertBefore(tempElement, node);
          node.remove();
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName.toLowerCase() !== 'script' && node.tagName.toLowerCase() !== 'style') {
          node.childNodes.forEach(traverseAndHighlight);
        }
      }
    }
  
    traverseAndHighlight(bodyElement);
  }
  
  // Example usage (replace with actual keyword retrieval logic)
  const sampleKeywords = ["example", "text", "highlight", "script", "news", "manga"];
  
  // Call the highlighting function with the keywords
  highlightKeywords(sampleKeywords);
  
  // --- Logic to receive keywords from the background script (if you have one) ---
  // chrome.runtime.onMessage.addListener(
  //   function(request, sender, sendResponse) {
  //     if (request.action === "updateKeywords") {
  //       const receivedKeywords = request.keywords;
  //       highlightKeywords(receivedKeywords);
  //       sendResponse({status: "Keywords updated and highlighted"});
  //     }
  //   }
  // );
  
  // --- Logic to send a message to the background script (if needed) ---
  // chrome.runtime.sendMessage({action: "requestKeywords"}, function(response) {
  //   if (response && response.keywords) {
  //     highlightKeywords(response.keywords);
  //   }
  // });
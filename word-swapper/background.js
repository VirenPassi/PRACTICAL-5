chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      // Skip injecting scripts into chrome:// URLs
      if (!tab.url.startsWith('chrome://')) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error("Script injection failed: " + chrome.runtime.lastError.message);
          } else {
            console.log("Script injected successfully into tab: " + tabId);
          }
        });
      }
    }
  });
  
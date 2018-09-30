chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "close") {
      chrome.tabs.remove(sender.tab.id);
    }
  }
)

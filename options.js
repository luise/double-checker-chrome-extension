function updateBlacklist() {
    var blacklist = document.getElementById("textarea-options").value.split("\n");
    chrome.storage.sync.set({ 'blacklist': blacklist }, function() {
      document.getElementById("update-success").style.visibility = "visible";
    });
}

function restoreBlacklist() {
  chrome.storage.sync.get("blacklist", function(items) {
    if (typeof items.blacklist != "undefined") {
      document.getElementById("textarea-options").value = items.blacklist.join("\n");
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreBlacklist);
document.getElementById("save-button").addEventListener("click",
    updateBlacklist);

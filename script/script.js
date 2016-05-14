chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $.getJSON('http://fy.iciba.com/ajax.php?a=fy&w=' + request.word, function(data) {
        sendResponse(data);
    });
    return true;
});

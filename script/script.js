$('body').append('<audio></audio>');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.type) {
        case 'playsound':
            playSound(request);
            return false;
        case 'iciba':
            iciba(request, sender, sendResponse); return true;
        default:
            return false;
    }
    return true;
});

function iciba(request, sender, sendResponse) {
    $.getJSON('http://fy.iciba.com/ajax.php?a=fy&w=' + request.word, function(data) {
        sendResponse(data);
    });
}

function merriam(request, sender, sendResponse) {
    $.get('http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + request.word + '?key=APIKEY', function(data) {
        sendResponse(data);
    });
}

function playSound(request) {
    var audio = $('audio')[0];
    audio.src = request.audioSrc;
    audio.play();
}

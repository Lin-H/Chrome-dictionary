$('body').append($.create('audio', {id: '_audio'}));

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
    $.fetch('http://fy.iciba.com/ajax.php?a=fy&w=' + request.word).then(function(res) {
        sendResponse(JSON.parse(res.responseText));
    }).catch(function(err) {});;
}

function merriam(request, sender, sendResponse) {
    $.fetch('http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + request.word + '?key=APIKEY').then(function(res) {
        sendResponse(JSON.parse(res.responseText));
    }).catch(function(err) {});
}

function playSound(request) {
    var audio = $('#_audio');
    audio.src = request.audioSrc;
    audio.play();
}

$('body').append('<div id="_dictionary"></div>');
var selection = window.getSelection(),
    dialog = $('#_dictionary'),
    content;

dialog.on('click', function(e) {
    return false;
});

document.onkeyup = function(event) {
    if (event.code !== 'ControlLeft' && event.code !== 'ControlRight') {
        return true;
    }
    chrome.extension.sendMessage({
        type: 'iciba',
        word: selection.toString().trim()
    }, iciba);
};

function iciba(response) {
    content = '<p>英[' + response.content.ph_en + ']<span class="_icon" data-audio="' + response.content.ph_en_mp3 + '"></span>';
    content += '美[' + response.content.ph_am + ']<span class="_icon" data-audio="' + response.content.ph_am_mp3 + '"></span></p>';
    content += response.content.word_mean.join('<br/>');
    dialog.html(content);

    $('span._icon').on('click', function(e) {
        chrome.extension.sendMessage({
            type: 'playsound',
            audioSrc: e.currentTarget.dataset.audio
        });
        return false;
    });
    document.addEventListener('click', hideDialog);
    dialog.show();
}

function hideDialog(event) {
    dialog.hide();
    document.removeEventListener('click', hideDialog);
}

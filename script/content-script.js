var selection = window.getSelection();
$('body').append('<div id="_dictionary"></div><audio id="_audio"></audio>');
var dialog = $('#_dictionary'),
    audio = $('#_audio'),
    content;

dialog.on('click', function(e) {
    return false;
});

document.onkeyup = function(event) {
    if (event.code !== 'ControlLeft' && event.code !== 'ControlRight') {
        return true;
    }
    chrome.extension.sendMessage({word: selection.toString().trim()}, iciba);
};

function iciba(response) {
    content = '<p>英[' + response.content.ph_en + ']<span class="_icon" data-audio="' + response.content.ph_en_mp3.replace(/(http:)|(https:)/, '') + '"></span>';
    content += '美[' + response.content.ph_am + ']<span class="_icon" data-audio="' + response.content.ph_am_mp3.replace(/(http:)|(https:)/, '') + '"></span></p>';
    content += response.content.word_mean.join('<br/>');

    dialog.html(content);
    $('span._icon').on('click', function(e) {
        audio[0].src = e.currentTarget.dataset.audio;
        audio[0].play();
        return false;
    });

    document.addEventListener('click', hideDialog);
    dialog.show();
}

function hideDialog(event) {
    dialog.hide();
    document.removeEventListener('click', hideDialog);
}

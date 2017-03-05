$('body').appendChild($.create('div', {
    id: '_dictionary'
}));
var selection = window.getSelection(),
    dialog = $('#_dictionary'),
    content;

dialog.addEventListener('click', function(e) {
    e.stopPropagation();
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
    content = `<p>英[${response.content.ph_en}] `;
    if (response.content.ph_en_mp3) {
        content += `<span class="_icon" data-audio="${response.content.ph_en_mp3}"></span>`;
    }
    content += `美[${response.content.ph_am}] `;
    if (response.content.ph_am_mp3) {
        content += `<span class="_icon" data-audio="${response.content.ph_am_mp3}"></span></p>`;
    } else {
        content += '</p>'
    }
    content += response.content.word_mean.join('<br/>');
    dialog.innerHTML = content;

    $$('span._icon')._.events({'click': function(e) {
        chrome.extension.sendMessage({
            type: 'playsound',
            audioSrc: e.currentTarget.dataset.audio
        });
        return false;
    }});
    document.addEventListener('click', hideDialog);
    dialog._.style({
        display: 'block'
    });
}

function hideDialog(event) {
    dialog._.style({
        display: 'none'
    });
    document.removeEventListener('click', hideDialog);
}

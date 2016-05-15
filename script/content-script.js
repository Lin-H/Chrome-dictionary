var selection = window.getSelection();
$('body').append('<div id="_dictionary"></div>');
var dialog = $('#_dictionary');

document.onkeyup = function(event) {
    if (event.code !== 'ControlLeft' && event.code !== 'ControlRight') {
        return true;
    }
    chrome.extension.sendMessage({word: selection.toString().trim()}, function(response) {
        var content = '英[' + response.content.ph_en + ']  美[' + response.content.ph_am + ']<br/>';
        content += response.content.word_mean.join('<br/>');
        dialog.html(content);
        document.addEventListener('selectionchange', hideDialog);
        dialog.show();
    });
};

function hideDialog(event) {
    dialog.hide();
    document.removeEventListener('selectionchange', hideDialog);
}

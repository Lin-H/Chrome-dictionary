var selection = window.getSelection();
$('body').append('<div id="_dictionary"></div>');
var dialog = $('#_dictionary');

document.onkeyup = function(event) {
    if (event.code !== 'ControlLeft' && event.code !== 'ControlLeft') {
        return true;
    }
    chrome.extension.sendMessage({word: selection.toString().trim()}, function(response) {
        dialog.html(response.content.word_mean.join('<br/>'));
        document.addEventListener('selectionchange', hideDialog);
        dialog.show();
    });
};

function hideDialog(event) {
    dialog.hide();
    document.removeEventListener('selectionchange', hideDialog);
}

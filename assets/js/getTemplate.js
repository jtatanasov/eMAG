function getTemplate(path) {
    return new Promise(function(resolve, reject) {
        const HTTP_STATUS_OK = 200;
        const HTTP_STATUS_REDIRECT = 300;

        var xhr = null;
        if(XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject();
        }

        xhr.open('GET', path, true);
        xhr.send(null);

        xhr.addEventListener('load', function() {
            if(xhr.status >= HTTP_STATUS_OK && xhr.status < HTTP_STATUS_REDIRECT) {
                var data = xhr.responseText;
                resolve(data);
            } else {
                reject(xhr.statusText);
            }
        })
    });
}
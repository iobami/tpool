(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async function(event) {
                const [name, number, file] = document.querySelectorAll('form input');
                let addValidation = true;

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else if (form.checkValidity()) {

                    const imageData = readImage();
                    if (imageData) {
                        const response = await uploadSingleImage(imageData);
                        console.log(response);

                        if (!response.data) {
                            const tbody = document.querySelector('tbody');
                            newTableRow(tbody, { name: name.value, number: number.value });
                            const clearForm = document.querySelector('form');
                            clearForm.className = 'needs-validation';
                            addValidation = false;
                            name.value = '';
                            number.value = '';
                            labelText('');
                            clearFileInput(file);
                        }
                    }

                }

                if (addValidation) {
                    form.classList.add('was-validated');
                }
                event.preventDefault();
            }, false);
        });
    }, false);
})();

const newTableRow = (container, data) => {

    const tr = document.createElement('tr');
    tr.setAttribute('id', `id${data.number}`);
    let td = document.createElement('td');

    let textNode = document.createTextNode(data.name);
    td.appendChild(textNode);
    tr.appendChild(td);

    td = document.createElement('td');

    textNode = document.createTextNode(data.number);
    td.appendChild(textNode);
    tr.appendChild(td);

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-danger');
    const buttonEventValue = `id${data.number}`;
    button.setAttribute('onclick', `removeTableRow('${buttonEventValue}')`);

    textNode = document.createTextNode('Remove');
    button.appendChild(textNode);
    td = document.createElement('td');
    td.setAttribute('style', 'text-align: center;');
    td.appendChild(button);
    tr.appendChild(td);

    const newPosition = container.children.length;
    container.insertBefore(tr, container.children[newPosition]);

};

const removeTableRow = (rowId) => {
    const rowTarget = document.getElementById(rowId);
    rowTarget.style.display = 'none';
};

const clearFileInput = (ctrl) => {
    try {
        ctrl.value = null;
    } catch(ex) { }
    if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
};

const readImage = () => {
    const imageData = document.getElementById("customFile");
    const files = imageData.files;

    if (!files.length) return;

    const [imageFile] = files;
    const fileNameArray = imageFile.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
        alert('This file is not in a JPG, JPEG or PNG format.');
        return;
    }

    if (files.length) {
        // const [labelText] = document.getElementsByClassName('custom-file-label');
        // labelText.innerText = imageFile.name
        labelText(imageFile.name);
    }

    return imageFile;
};

const labelText = (value) => {
    const [labelText] = document.getElementsByClassName('custom-file-label');
    labelText.innerText = value
};

const uploadSingleImage = async (imageData) => {
    try {
        const reader = new FileReader();

        // reader.onload = function changeFile(e) {
        //     console.log(e.target.result);
        // };

        reader.readAsDataURL(imageData);

        const imageUrl = `/idx/users/upload_image`;
        const fileUploadData = new FormData();
        fileUploadData.append('image', imageData);
        return await fetch({
            method: 'POST',
            url: imageUrl,
            headers: {
                accept: 'application/json',
                // 'content-type': 'application/json',
                'x-ibm-client-id': process.env.VUE_APP_CLIENT_ID,
            },
            data: fileUploadData,
        });
    } catch (e) {
        return e;
    }
};

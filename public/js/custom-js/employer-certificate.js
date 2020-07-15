
let docId = 123;

// store all added documents and display in table
let documentsArray = [];
let imageData;

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async function(event) {
                const [name, number, file] = document.querySelectorAll('#docUpload input');
                let addValidation = true;
                const [fileCountError] = document.getElementsByClassName('file-upload-count-error');
                const upload = document.getElementById('upload');
                const dropArea = document.getElementById('drop-area');
                dropArea.style.border = '2px dashed #ccc';

                if (!imageData) {
                    dropArea.style.border = '2px dashed #dc3545';
                }

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else if (form.checkValidity()) {
                    event.preventDefault();

                    if (documentsArray.length === 3) {
                        fileCountError.style.visibility = 'visible';
                        return event.preventDefault();
                    }

                    // add to array
                    // const imageData = readImage();
                    if (imageData) {
                        docId += 1;
                        documentsArray.push({
                            file: imageData,
                            name: name.value,
                            number: number.value,
                            id: `${number.value}${docId}`,
                        });

                        upload.style.display = 'block';

                        const tbody = document.querySelector('tbody');
                        newTableRow(tbody, { name: name.value, number: number.value, id: `${number.value}${docId}` });
                        const clearForm = document.querySelector('form');
                        clearForm.className = 'needs-validation';
                        addValidation = false;
                        name.value = '';
                        number.value = '';
                        labelText('Upload Image');
                        $('#image-preview').attr('src', '/img/attach_file.svg');
                        clearFileInput(file);
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
    tr.setAttribute('id', `id${data.id}`);
    let td = document.createElement('td');
    td.setAttribute('class', 'align-middle');

    let textNode = document.createTextNode(data.name);
    td.appendChild(textNode);
    tr.appendChild(td);

    td = document.createElement('td');
    td.setAttribute('class', 'align-middle');

    textNode = document.createTextNode(data.number);
    td.appendChild(textNode);
    tr.appendChild(td);

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-danger');
    const buttonEventValue = `id${data.id}`;
    button.setAttribute('onclick', `removeTableRow('${buttonEventValue}')`);

    textNode = document.createTextNode('Remove');
    button.appendChild(textNode);
    td = document.createElement('td');
    td.setAttribute('style', 'text-align: right; padding-right: 12px;'); 
    td.appendChild(button);
    tr.appendChild(td);

    const newPosition = container.children.length;
    container.insertBefore(tr, container.children[newPosition]);

};

const removeTableRow = async (rowId) => {

    // filter array to remove document object

    const checkDocumentId = (data) => {
        return `id${data.id}` != rowId;
    };

    documentsArray = await documentsArray.filter(checkDocumentId);

    const rowTarget = document.getElementById(rowId);
    rowTarget.style.display = 'none';

    if (documentsArray.length <= 0) {
        const upload = document.getElementById('upload');
        upload.style.display = 'none';
    }

    const [fileCountError] = document.getElementsByClassName('file-upload-count-error');
    fileCountError.style.visibility = 'hidden';
};

const clearFileInput = (ctrl) => {
    try {
        ctrl.value = null;
    } catch(ex) { }
    if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
};

// const readImage = () => {
//     const imageData = document.getElementById("customFile");
//     const files = imageData.files;

//     if (!files.length) return;

//     const [imageFile] = files;
//     const fileNameArray = imageFile.name.split('.');
//     const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
//     if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
//         alert('This file is not in a JPG, JPEG or PNG format.');
//         return;
//     }

//     if (files.length) {
//         // const [labelText] = document.getElementsByClassName('custom-file-label');
//         // labelText.innerText = imageFile.name
//         labelText(imageFile.name);
//     }

//     return imageFile;
// };

const truncateString = (str, num) => {

    if (str.length <= num) {
        return str
    }

    return `${str.slice(0, num)}...`;
};

const labelText = (value) => {
    const [labelText] = document.getElementsByClassName('upload-label-button');
    let newValue;

    if ((window.innerWidth >= 366) && (window.innerWidth <= 450)) {
        newValue = truncateString(value, 14);
        labelText.innerText = newValue;
    } else if (window.innerWidth <= 365) {
        newValue = truncateString(value, 10);
        labelText.innerText = newValue;
    } else {
        newValue = truncateString(value, 21);
        labelText.innerText = newValue;
    }

    // labelText.innerText = value
};

const uploadSingleImage = async (imageData, data) => {
    try {
        const reader = new FileReader();

        reader.readAsDataURL(imageData);

        const documentUploadUrl = '/employer/uploaddocument';
        const fileUploadData = new FormData();
        fileUploadData.append('image_document', imageData);
        fileUploadData.append('document_name', data.name);
        fileUploadData.append('document_number', data.number);
        // fileUploadData.append('employer_id', data.userTypeId);

        const [csrf] = document.getElementsByName('_csrf');

        return await axios({
            method: 'POST',
            url: documentUploadUrl,
            headers: {
            accept: 'application/json',
            // 'content-type': 'application/json',
            'csrf-token': csrf.value,
            },
            data: fileUploadData,
        });

    } catch (e) {
        console.log(e.response.data);
        return e.response.data;
    }
};

const batchUpload = async () => {
    const upload = document.getElementById('upload');
    const loader = document.getElementById('loader');
    upload.style.display = 'none';
    loader.style.display = 'block';

    let success = 0;
    let error = 0;
     for (const documentObject of documentsArray) {

        const payload = {
            name: documentObject.name,
            number: documentObject.number,
        };

        try {

            const { data } = await uploadSingleImage(documentObject.file, payload);         
            if (data.status === 'success') {
                success += 1;
                removeTableRow(`id${documentObject.id}`);
            } else {
                error += 1;
            }

        } catch (e) {
            error += 1;
        }

     }

     if (success > 0) {
        const message = (success === 1) ? `${success} file uploaded`  : `${success} files uploaded`;
        toaster(message, 'success');
        const redirect = () => {
            window.location.replace('/employer/dashboard');
        };
        setTimeout(redirect, 6000);
     }
     if (error > 0) {
        const message = (error === 1) ? `${error} upload failed`  : `${error} uploads failed`;
        toaster(message, 'error');
     }
     removeToaster(4000);

     loader.style.display = 'none';
     upload.style.display = 'block';

};

// DRAG AND DROP SECT
const dropArea = document.getElementById("drop-area");

const preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
};

const highlight = e => {
    dropArea.classList.add("highlight");
};

const unhighlight = e => {
    dropArea.classList.remove("highlight");
};

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

const handleDrop = e => {
    // shorthand version
    // ([...e.dataTransfer.files]).forEach((file)=>{console.log("file...",file)});

    const dt = e.dataTransfer;
    const files = dt.files;
  
    readImage(files);
  };
  
const readImage = files => {
    const filesArray = [...files];

    if (!files.length) return;

    const [imageFile] = filesArray;
    const fileNameArray = imageFile.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
        toaster('! Only JPGs and PNG files supported', 'error');
        return;
    }

    if (files.length) {
        labelText(imageFile.name);

        const reader = new FileReader();

        reader.onload = function changeFile(e) {
            $('#image-preview')
                .attr('src', reader.result);
        };

        reader.readAsDataURL(imageFile);

        const dropArea = document.getElementById('drop-area');
        dropArea.style.border = '2px dashed #ccc';
    }

    imageData = imageFile;
};

dropArea.addEventListener("drop", handleDrop, false);
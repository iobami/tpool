// IDs of the three methods of payment buttons
let formIDs = ['visa-card__form', 'master-card__form', 'paypal__form'];

//  Toggle betyween forms
function toggleForm(form){
    let getForm = document.getElementById(form);
    if(getForm){
        getForm.classList.add('show-form');

        let removeForms = formIDs.filter(x => x != form);
        
        //  Hide non selected forms
        for(var i = 0; i<removeForms.length; i++){
            let formToRemove = document.getElementById(removeForms[i]);
            if(formToRemove.classList.contains('show-form')){
                formToRemove.classList.remove('show-form');
            }
        }
    }
}
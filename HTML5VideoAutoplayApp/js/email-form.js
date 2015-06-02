
/*
** Caches patient data form and redirects to the data-redirect attributes value.
*/
var $formButton = $('#patient-details-form');

$formButton.on('click', function ()
{
  var $emailForm  = $('#email-form'),
      formData    = $emailForm.serializeArray();

  window.localStorage.setItem($emailForm.data().cachekey, JSON.stringify(formData));
  window.location = $emailForm.data().redirect;
});

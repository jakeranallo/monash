var currentlyPlayingAudio = {
  el: null,
};
/*
****** CUSTOM QUESTION SLIDERS & FORM DATA CACHING ******
*/
var $questions      = $('.questions'),
    $backButton     = $('.slider-back'),
    $nextButton     = $('.slider-next'),
    index           = 0,
    $questionnaireForm, forms;

forms = [$('form[name="questionnaire"]'), $('form[name="questionnaire-2"]')];

$questionnaireForm = forms.filter(function (_arr)
{
  return _arr.length ? true : false;
})[0];

function nextQuestions()
{
  if (currentlyPlayingAudio.el)
  {
    document.getElementById(currentlyPlayingAudio.el).currentTime = 0;
    document.getElementById(currentlyPlayingAudio.el).pause();
  }
  if (index === ($questions.length - 1))
  {
    formData = $questionnaireForm.serializeArray();
    window.localStorage.setItem($questionnaireForm.data().cachekey, JSON.stringify(formData));

    if ($questionnaireForm.data().webflowsubmit === true)
    {
      $('#questionnaire2-submit').click();
      return;
    }
    window.location = $questionnaireForm.data().redirect;
    return;
  }
  $($questions[index]).addClass('hidden');
  $($questions[index += 1]).removeClass('hidden');
  $backButton.removeClass('hidden');
}

function backQuestions()
{
  if (index === 0) return;
  if (currentlyPlayingAudio.el)
  {
    document.getElementById(currentlyPlayingAudio.el).currentTime = 0;
    document.getElementById(currentlyPlayingAudio.el).pause();
  }
  $($questions[index]).addClass('hidden');
  $($questions[index -= 1]).removeClass('hidden');
  if (index === 0) $backButton.addClass('hidden');
}

$nextButton.on('click', function ()
{
  nextQuestions();
});

$backButton.on('click', function ()
{
  backQuestions();
});


/*
***** VOQ AUDIO CONTROLS *****
** Iterate through all the audio buttons and register a jQuery onclick handler for each.
** Use the data-audioselect attribute to target the audio files by ID and play/pause.
*/
var $audioButtons = $('.button.listen');

for (var i = 0; i < $audioButtons.length; i++)
{
  var $audioButton = $($audioButtons[i]);
  $audioButton.on('click', function ()
  {
    var audioSelect = $(this).data().audioselect;
    if (currentlyPlayingAudio.el)
    {
      document.getElementById(currentlyPlayingAudio.el).currentTime = 0;
      document.getElementById(currentlyPlayingAudio.el).pause();
    }
    currentlyPlayingAudio.el = audioSelect;
    document.getElementById(audioSelect).play();
  });
}









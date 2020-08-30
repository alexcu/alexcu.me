/**
 * Sets up hoverables for header
 * @param headerTagline The tagline to change
 * @param linkList      The list to toggle the hoverables
 */
function setupSwitchText (headerTagline, linkList) {
  function switchHeaderText (header, text) {
    header.textContent = text;
  }
  var headerTaglineText = headerTagline.textContent,
      links             = linkList.children;
  linkList.onmouseleave = function () {
    switchHeaderText(headerTagline, headerTaglineText);
  };
  for (var i = 0; i < links.length; i++) {
    links[i].onmouseover = function (e) {
      switchHeaderText(headerTagline, e.target.textContent);
    };
  };
}
setupSwitchText(
  document.querySelector("body > header > h2"),
  document.querySelector("body > header > ul")
);
/**
 * Updates value CSS input for form validation
 */
var validationEls = document.querySelectorAll('input[required], textarea[required]');
for (var i = 0; i < validationEls.length; i++) {
  validationEls[i].onchange = function (e) {
    e.target.dataset['dirty'] = "";
  }
};
/**
 * XHR and form validation
 */
var form = document.querySelector("form");
form.onsubmit = function () {
  var els = form.querySelectorAll('input,textarea');
  for (var i = 0; i < els.length; i++) {
    els[i].dataset['dirty'] = "";
    if (!els[i].validity.valid) {
      els[i].focus()
      return false;
    }
  }

  // Hide send and show progress
  var progressEl = form.querySelector('progress');
  var sendEl     = form.querySelector('input[type="submit"]');

  progressEl.style.visibility = "visible";
  sendEl.style.visibility = "hidden";
  sendEl.enabled = false;

  var xhr = new XMLHttpRequest();
  var formData = new FormData(form);
  xhr.open('POST', 'https://alexcu-dot-me-mailer.herokuapp.com', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var success = xhr.status == 200;
      var selector = success ? '.success' : '.failure';
      var statusEl = form.querySelector('.response' + selector);
      statusEl.style.opacity = 1;
      statusEl.style.zindex = 0;
      if (success) {
          form.reset();
          progressEl.style.visibility = "hidden";
          sendEl.style.visibility = "visible";
          sendEl.enabled = true;
          for (var i = 0; i < els.length; i++) {
            delete els[i].dataset['dirty'];
          }
          setTimeout(function() {
            statusEl.style.opacity = 0;
            statusEl.style.zindex = -1;
          }, 3000);
      }
    }
  }
  xhr.send(formData);
  return false;
};
/**
 * All external hyperlinks open in blank target
 */
var externalHyperlinkEls = document.querySelectorAll('a[href^="http"]');
for (var i = 0; i < externalHyperlinkEls.length; i++) {
  externalHyperlinkEls[i].target = "_blank";
};

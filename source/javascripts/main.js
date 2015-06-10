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
// Now setup
setupSwitchText(  document.querySelector("body > header > h2"),
                  document.querySelector("body > header > ul"));

setupSwitchText(  document.querySelector("section#technologies > header  > h2"),
                  document.querySelector("section#technologies > article > ul"));
/**
 * Alters a link for touch enabled devices
 */
var tappedEl;
function touchFriendly (anchorEl) {
  var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  // Ignore for non-touch
  if (!isTouch) {
    return;
  }
  firstTap = function (e) {
    tappedEl = e.target; // currently tapped element
    // next time it is tapped, secondTap
    e.target.onclick = secondTap;
    (e.preventDefault ? e.preventDefault() : function() { e.returnValue = false; })()
  }
  secondTap = function (e) {
    // only commit this tap if it's the tappedEl or its descendant
    var targetIsTappedEl = tappedEl == e.target;
    var targetIsDescendantOfTappedEl = false;
    for (i in els = tappedEl.querySelectorAll("*")) {
      if (els[i] == e.target) {
        targetIsDescendantOfTappedEl = true;
        break;
      }
    }
    if (targetIsTappedEl || targetIsDescendantOfTappedEl) {
      // next time it is tapped, firstTap
      e.target.onclick = firstTap;
      e.returnValue = true;
    }
    // Else cancel
    else {
      tappedEl.onclick = tappedEl.onclick = firstTap;
      (e.preventDefault ? e.preventDefault() : function() { e.returnValue = false; })()
    }

  }
  anchorEl.onclick = firstTap;
}
var anchorEls = document.querySelectorAll(':not(p) > a[href^="http"]');
for (var i = 0; i < anchorEls.length; i++) {
  touchFriendly(anchorEls[i]);
};
/**
 * Sets up the modal
 */
function setupModal(modalEl) {
  // Add modal class to body
  var srcAnchor = document.querySelector('a[href="#' + modalEl.id + '"]');
  srcAnchor.onclick = function() {
    document.querySelector('body').classList.add('modal');
    modalEl.querySelector("ul").scrollLeft = 0;
  }
  // Setup close modal
  var closeEl = modalEl.querySelector('button.close');
  closeEl.onclick = function () {
    document.querySelector('body').classList.remove('modal');
    window.location.hash = 'modal-' + modalEl.id + '-src';
  };
}
var modalEls = document.querySelectorAll('dialog.modal');
for (var i = 0; i < modalEls.length; i++) {
  setupModal(modalEls[i]);
};
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
  var xhr = new XMLHttpRequest();
  var formData = new FormData(form);
  xhr.open('POST', 'https://cryptic-stream-5488.herokuapp.com/ ', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var success = xhr.status == 200;
      var selector = success ? '.success' : '.failure';
      var statusEl = form.querySelector('.response' + selector);
      statusEl.style.opacity = 1;
      statusEl.style.zindex = 0;
      if (success) {
          form.reset();
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
 * Percent update on modal gallery scroll
 */
function setupGalleryScrollPercent(modal) {
  var el = modal.querySelector("ul");
  el.onscroll = function () {
    var percent = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    // Update the progress
    var progressEl = modal.querySelector("progress");
    progressEl.value = percent;
    var avgImageWidth = 0;
    for (var i = 0; i < el.children.length - 1; i++) {
      avgImageWidth += el.children[i].scrollWidth;
    };
    avgImageWidth /= el.children.length;
    // Up to last element? Push down header
    if (el.scrollLeft > ((el.children.length + 2) * avgImageWidth)) {
      modal.querySelector("header").classList.add("expanded");
    } else {
      modal.querySelector("header").classList.remove("expanded");
    }
  }
}
var galleryModalEls = document.querySelectorAll('dialog.modal.gallery');
for (var i = 0; i < galleryModalEls.length; i++) {
  setupGalleryScrollPercent(galleryModalEls[i]);
};
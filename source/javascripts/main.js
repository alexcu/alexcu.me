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

setupSwitchText(  document.querySelector("body > header > h2"),
                  document.querySelector("body > header > ul"));

setupSwitchText(  document.querySelector("section#technologies > header  > h2"),
                  document.querySelector("section#technologies > article > ul"));
var header        = document.querySelector("body > header"),
    headerTagline = document.querySelector("body > header > h2"),
    linkList      = document.querySelector("body > header > ul"),
    links         = linkList.children;

function switchHeaderText (text) {
  headerTagline.textContent = text;
}

var headerTaglineText = headerTagline.textContent;
header.onmouseleave = function () {
  switchHeaderText(headerTaglineText);
};

for (var i = 0; i < links.length; i++) {
  links[i].onmouseover = function (e) {
    switchHeaderText(e.target.textContent);
  };
};
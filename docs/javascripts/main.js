function setupSwitchText(e,t){function r(e,t){e.textContent=t}var i=e.textContent,n=t.children;t.onmouseleave=function(){r(e,i)};for(var o=0;o<n.length;o++)n[o].onmouseover=function(t){r(e,t.target.textContent)}}setupSwitchText(document.querySelector("body > header > h2"),document.querySelector("body > header > ul"));for(var validationEls=document.querySelectorAll("input[required], textarea[required]"),i=0;i<validationEls.length;i++)validationEls[i].onchange=function(e){e.target.dataset.dirty=""};var form=document.querySelector("form");form.onsubmit=function(){for(var e=form.querySelectorAll("input,textarea"),t=0;t<e.length;t++)if(e[t].dataset.dirty="",!e[t].validity.valid)return e[t].focus(),!1;var r=form.querySelector("progress"),i=form.querySelector('input[type="submit"]');r.style.visibility="visible",i.style.visibility="hidden",i.enabled=!1;var n=new XMLHttpRequest,o=new FormData(form);return n.open("POST","https://cryptic-stream-5488.herokuapp.com/ ",!0),n.onreadystatechange=function(){if(4==n.readyState){var t=200==n.status,o=t?".success":".failure",l=form.querySelector(".response"+o);if(l.style.opacity=1,l.style.zindex=0,t){form.reset(),r.style.visibility="hidden",i.style.visibility="visible",i.enabled=!0;for(var a=0;a<e.length;a++)delete e[a].dataset.dirty;setTimeout(function(){l.style.opacity=0,l.style.zindex=-1},3e3)}}},n.send(o),!1};for(var externalHyperlinkEls=document.querySelectorAll('a[href^="http"]'),i=0;i<externalHyperlinkEls.length;i++)externalHyperlinkEls[i].target="_blank";
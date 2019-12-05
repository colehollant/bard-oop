window.onload = function(){
    var links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if(window.location.href === links[i].href){
            links[i].classList.add('active');
        }            
    }
}
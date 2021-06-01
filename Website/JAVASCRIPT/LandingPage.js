//methode ruft automatisch init auf wenn die seite(html teil) geladen hat
document.addEventListener('DOMContentLoaded', init)
function init() {
   
}

//hrefs
let topleft = document.querySelector("#topleft");
let bottomleft = document.querySelector("#bottomleft");
let topright = document.querySelector("#topright");
let bottomright = document.querySelector("#bottomright");

//buttonimages
let topleftimg = document.querySelector("#topleft .buttonimg");
let bottomleftimg = document.querySelector("#bottomleft .buttonimg");
let toprightimg = document.querySelector("#topright .buttonimg");
let bottomrightimg = document.querySelector("#bottomright .buttonimg");


topleft.style.transition = "0.5s"
bottomleft.style.transition = "0.5s"
topright.style.transition = "0.5s"
bottomright.style.transition = "0.5s"


topleft.addEventListener('mouseover', function(){
  topleft.style.transform = "scale(1.05)"
})
topleft.addEventListener('mouseout', function(){
  topleft.style.transform = "scale(1.0)"
})

bottomleft.addEventListener('mouseover', function(){
  bottomleft.style.transform = "scale(1.05)"
})
bottomleft.addEventListener('mouseout', function(){
  bottomleft.style.transform = "scale(1.0)"
})

topright.addEventListener('mouseover', function(){
  topright.style.transform = "scale(1.05)"
})
topright.addEventListener('mouseout', function(){
  topright.style.transform = "scale(1.0)"
})

bottomright.addEventListener('mouseover', function(){
  bottomright.style.transform = "scale(1.05)"
})
bottomright.addEventListener('mouseout', function(){
  bottomright.style.transform = "scale(1.0)"
})




var hamburger = document.querySelector(".hamburger");
var menu = document.querySelector(".menu");
hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  menu.classList.toggle("hidden");
});

$('.close-button').on('click',function(){
  $('.modal').addClass('is-expanded');
  var animClass = $(this).data('animation');
  var removeTime = $(this).data('remove');
  if($(this).hasClass(animClass)){
     $(this).removeClass(animClass);
  }else{
    $(this).addClass(animClass);
    if(typeof removeTime != 'undefined'){
      var el = $(this);
       setTimeout(function(){
         el.removeClass(animClass);
       },removeTime);
    }
  }
});


var Boxlayout = function() {

  var wrapper = document.body,
      sections = Array.from(document.querySelectorAll('.modal')),
      closeButtons = Array.from(document.querySelectorAll('.modal .close-button')),
      expandedClass = 'is-expanded',
      hasExpandedClass = 'has-expanded-item';

  return { init : init };

  function init() {
    _initEvents();
  }

  function _initEvents() {    
    sections.forEach(function(element) {
      element.onclick = function() {
        _openSection(this);
      };
    });
    closeButtons.forEach(function(element) {
      element.onclick = function(element) {
        element.stopPropagation();
        _closeSection(this.parentElement);
      };
    });
  }

  function _openSection(element) {
    if ( ! element.classList.contains(expandedClass) ) {
      element.classList.add(expandedClass);
      wrapper.classList.add(hasExpandedClass);
    }
  }

  function _closeSection(element) {
    if ( element.classList.contains(expandedClass) ) {
      element.classList.remove(expandedClass);
      wrapper.classList.remove(hasExpandedClass);
    }
  }

}();

Boxlayout.init();
document.addEventListener('DOMContentLoaded', function () {
    var menuContainer = document.getElementById('menu-container');
    var menuBurger = document.getElementById('menuBurger');
  
    menuBurger.addEventListener('click', function() {
      menuBurger.classList.toggle('active');
      menuContainer.classList.toggle('active');
  
      // Si el menú está visible, ocúltalo; de lo contrario, muéstralo
      var isVisible = menuContainer.classList.contains('active');
      menuContainer.style.left = isVisible ? '0' : '-300px';
    });
});
  
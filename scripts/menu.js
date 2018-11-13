Breakout.menu = (function(screens){
  
  function showScreen(id) {
    let screen = 0;
    let active = null;
    
    // Remove the active state from all screens.  There should only be one...
    active = document.getElementsByClassName('active');
    for (screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove('active');
    }
    
    // Tell the screen to start actively running
    screens[id].run();
    
    // Then, set the new screen to be active
    document.getElementById(id).classList.add('active');
  }

  function initialize() {
    let screen = null;
    // Go through each of the screens and tell them to initialize
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize();
      }
    }
    
    // Make the main-menu screen the active one
    showScreen('main-menu');
  }

  
  return {
    initialize : initialize,
    showScreen : showScreen
  };

}(Breakout.screens));
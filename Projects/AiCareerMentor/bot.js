function showbot() { 
    var botbox = document.querySelectorAll('.botbox');
    var button = document.getElementById('botToggle');
   
    // Disable click for 1 second
    button.style.pointerEvents = 'none';
    botbox.forEach(function(botbox) {
      const ibot = document.getElementById('ibot');
  
      if (botbox.style.display === "flex" || botbox.style.display === " ") {
          // Hide the botbox
          botbox.classList.remove('expand');
          botbox.classList.add('collapsed');
          botbox.style.display = "block";
          botbox.style.width = "1px";
          botbox.style.maxHeight = '1px';
          setTimeout(function() {
           botbox.style.position = "absolute";
        }, 500);
         
          setTimeout(function() {
            botbox.classList.remove('collapsed');
            botbox.style.backgroundColor = "black";
        }, 1000); // 500 milliseconds (0.5 seconds) delay
          // Switch icons
         
        
          ibot.style.opacity = "0";
          
      } else {
        botbox.classList.remove('collapsed');
        botbox.classList.add('expand');
          // Show the botbox
          botbox.style.display = "flex";
          botbox.style.width = "96%";
          botbox.style.height = '70vh';
          botbox.style.maxHeight='450px';
          botbox.style.position = "relative";
          setTimeout(function() {
          ibot.style.opacity = "1";
        }, 1000); // 500 milliseconds (0.5 seconds) delay
  
          // Switch icons
        
        
          // Scroll to the top of the page smoothly
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }
  });
  
  setTimeout(function() {
    button.style.pointerEvents = 'auto';
  }, 1000);
  }
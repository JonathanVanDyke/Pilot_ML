function Input() {
  self = this;

  //Set initial state of Input class
  self.isLeftPressed = false;
  self.isRightPressed = false;
  self.isFwdPressed = false;
  self.isBwdPressed = false;
  self.isShiftPressed = false;
  self.isRLPressed = false;
  self.isRRPressed = false;
  //how do we add gravity?
  self.isSpacePressed = false;
  //bullets?
  self.isFirePressed = false;
  self.isXPressed = false;

  //Handle key events (setting value according to event listener)
  const handleKeyEvent = (e, isKeyDown) => {
    if(e.keyCode === 65) {
      self.isLeftPressed = isKeyDown;
    }  
    if(e.keyCode === 68) {
      self.isRightPressed = isKeyDown;
    } 
    if(e.keyCode === 32) {
      self.isSpacePressed = isKeyDown;
    }
    if(e.keyCode === 87) {
      self.isFwdPressed = isKeyDown;
    }
    if(e.keyCode === 83) {
      self.isBwdPressed = isKeyDown;
    }
    if(e.keyCode === 16) {
      self.isShiftPressed = isKeyDown;
    }
    if (e.keyCode === 81) {
      self.isRLPressed = isKeyDown;
    } 
    if(e.keyCode === 69) {
      self.isRRPressed = isKeyDown;
    }
    if(e.keyCode === 74) {
      self.isFirePressed = isKeyDown;
    }
    if(e.keyCode === 75) {
      self.isXPressed = isKeyDown;
    }
  }

  //Event listeners for key input, pass event and bool to handle event
  document.addEventListener("keydown", (e) => {handleKeyEvent(e, true)} )
  document.addEventListener("keyup", (e) => {handleKeyEvent(e, false)} )
}
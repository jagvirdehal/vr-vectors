AFRAME.registerComponent("label", {
  init: function() {
    this.el.setAttribute('align', 'center');
    this.el.setAttribute('width', '8');
    this.el.setAttribute('height', 'auto');
    console.log(this.el);
  },

  tick: function() {
    // Find the camera, get its position and force this object to look at it
    let camera = document.querySelector("a-entity[camera]");
    let position = camera.components.camera.camera.position;

    this.el.object3D.lookAt(position);
  }
})

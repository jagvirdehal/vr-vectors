AFRAME.registerPrimitive("a-grid", {
  defaultComponents: {
    gridaxis: {}
  },

  mappings: {
    x_min: "gridaxis.x_min",
    y_min: "gridaxis.y_min",
    z_min: "gridaxis.z_min",

    x_max: "gridaxis.x_max",
    y_max: "gridaxis.y_max",
    z_max: "gridaxis.z_max",

    size: "gridaxis.size",

    radius: "gridaxis.radius",

    repeat: "gridaxis.repeat",
    
    src: "gridaxis.grid",

    x_color: "gridaxis.x_color",
    y_color: "gridaxis.y_color",
    z_color: "gridaxis.z_color",
  }
})

AFRAME.registerComponent("gridaxis", {
  schema: {
    // Axis lower bounds
    x_min: {default: -8, max: 0},
    y_min: {default: -8, max: 0},
    z_min: {default: -8, max: 0},

    // Axis upper bounds
    x_max: {default: 8, min: 0},
    y_max: {default: 8, min: 0},
    z_max: {default: 8, min: 0},

    size: {default: -1},

    // Line radii
    radius: {default: 0.03},
    
    // Grid repeat
    repeat: {default: 1},

    // Grid texture
    grid: {type: "asset"},

    // Color settings
    x_color: {default: '#f00', type: 'color'},
    y_color: {default: '#0f0', type: 'color'},
    z_color: {default: '#0af', type: 'color'},
  },

  init: function() {
    let x_axis = document.createElement("a-cylinder");
    let y_axis = document.createElement("a-cylinder");
    let z_axis = document.createElement("a-cylinder");

    let XY = document.createElement("a-plane");
    let YZ = document.createElement("a-plane");
    let XZ = document.createElement("a-plane");

    // Axis sizes
    let x_size = this.data.x_max - this.data.x_min;
    let y_size = this.data.y_max - this.data.y_min;
    let z_size = this.data.z_max - this.data.z_min;

    if (this.data.size > 0 && this.data.size % 2 === 0) {
      x_size = this.data.size;
      y_size = this.data.size;
      z_size = this.data.size;
    }

    // Offsets
    let x_offset = (this.data.x_max + this.data.x_min) / 2;
    let y_offset = (this.data.y_max + this.data.y_min) / 2;
    let z_offset = (this.data.z_max + this.data.z_min) / 2;

    // Repeats
    let x_repeat = x_size / this.data.repeat;
    let y_repeat = y_size / this.data.repeat;
    let z_repeat = z_size / this.data.repeat;

    /*****************/
    /* AXIS SETTINGS */
    /*****************/

    // Size
    x_axis.setAttribute('height', `${x_size}`);
    y_axis.setAttribute('height', `${y_size}`);
    z_axis.setAttribute('height', `${z_size}`);

    // Offset
    x_axis.setAttribute('position', `${x_offset} 0 0`);
    y_axis.setAttribute('position', ` 0 ${y_offset} 0`);
    z_axis.setAttribute('position', `0 0 ${z_offset}`);

    // Rotation
    x_axis.setAttribute('rotation', `0 0 90`);
    y_axis.setAttribute('rotation', `0 90 0`);
    z_axis.setAttribute('rotation', `90 0 0`);

    // Radius
    x_axis.setAttribute('radius', `${this.data.radius}`);
    y_axis.setAttribute('radius', `${this.data.radius}`);
    z_axis.setAttribute('radius', `${this.data.radius}`);

    // Colors
    x_axis.setAttribute('color', `${this.data.x_color}`);
    y_axis.setAttribute('color', `${this.data.y_color}`);
    z_axis.setAttribute('color', `${this.data.z_color}`);

    // Material
    x_axis.setAttribute('material', `shader: flat; opacity: 0.4`);
    y_axis.setAttribute('material', `shader: flat; opacity: 0.4`);
    z_axis.setAttribute('material', `shader: flat; opacity: 0.4`);

    /******************/
    /* PLANE SETTINGS */
    /******************/

    // Size
    XY.setAttribute('height', `${x_size}`);
    XY.setAttribute('width', `${y_size}`);
    YZ.setAttribute('height', `${y_size}`);
    YZ.setAttribute('width', `${z_size}`);
    XZ.setAttribute('height', `${z_size}`);
    XZ.setAttribute('width', `${x_size}`);

    // Offset
    XY.setAttribute('position', `${x_offset} ${y_offset} 0`);
    YZ.setAttribute('position', `0 ${y_offset} ${z_offset}`);
    XZ.setAttribute('position', `${x_offset} 0 ${z_offset}`);

    // Rotation
    XY.setAttribute('rotation', `0 0 90`);
    YZ.setAttribute('rotation', `0 90 0`);
    XZ.setAttribute('rotation', `90 0 0`);

    // Repeat
    XY.setAttribute('repeat', `${y_repeat} ${x_repeat}`);
    YZ.setAttribute('repeat', `${z_repeat} ${y_repeat}`);
    XZ.setAttribute('repeat', `${x_repeat} ${z_repeat}`);

    // Texture
    XY.setAttribute('src', `${this.data.grid}`);
    YZ.setAttribute('src', `${this.data.grid}`);
    XZ.setAttribute('src', `${this.data.grid}`);

    // Material
    XY.setAttribute('material', `shader: flat; side: double; transparent: false; alphaTest: 0.1; opacity: 0.4`);
    YZ.setAttribute('material', `shader: flat; side: double; transparent: false; alphaTest: 0.1; opacity: 0.4`);
    XZ.setAttribute('material', `shader: flat; side: double; transparent: false; alphaTest: 0.1; opacity: 0.4`);

    /****************/
    /* APPEND CHILD */
    /****************/

    this.el.appendChild(x_axis);
    this.el.appendChild(y_axis);
    this.el.appendChild(z_axis);
    this.el.appendChild(XY);
    this.el.appendChild(YZ);
    this.el.appendChild(XZ);
  }
})
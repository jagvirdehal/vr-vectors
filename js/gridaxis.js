AFRAME.registerPrimitive("a-grid", {
  defaultComponents: {
    gridaxis: {}
  },

  mappings: {
    min: "gridaxis.min",
    max: "gridaxis.max",
    size: "gridaxis.size",

    radius: "gridaxis.radius",
    repeat: "gridaxis.repeat",
    
    src: "gridaxis.grid",
    x_color: "gridaxis.x_color",
    y_color: "gridaxis.y_color",
    z_color: "gridaxis.z_color",

    visbility: {
      XY: "gridaxis.show_XY",
      YZ: "gridaxis.show_YZ",
      XZ: "gridaxis.show_XZ",

      x_axis: "gridaxis.show_x_axis",
      y_axis: "gridaxis.show_y_axis",
      z_axis: "gridaxis.show_z_axis",
    },
  }
})

AFRAME.registerComponent("gridaxis", {
  schema: {
    // Min/max vectors
    min: {default: {x: -8, y: -8, z: -8}, type: "vec3"},
    max: {default: {x: 8, y: 8, z: 8}, type: "vec3"},

    // Uniform size
    size: {default: null},

    // Line radii
    radius: {default: 0.03},
    
    // Grid repeat
    repeat: {default: 1},

    // Grid texture
    grid: {type: "map"},

    // Plane visibility
    show_XY: {default: false},
    show_YZ: {default: false},
    show_XZ: {default: true},

    // Axis visibility
    show_x_axis: {default: true},
    show_y_axis: {default: true},
    show_z_axis: {default: true},

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
    let x_size = this.data.max.x - this.data.min.x;
    let y_size = this.data.max.y - this.data.min.y;
    let z_size = this.data.max.z - this.data.min.z;

    if (this.data.size > 0) {
      x_size = this.data.size * 2;
      y_size = this.data.size * 2;
      z_size = this.data.size * 2;
    }

    // Offsets
    let x_offset = (this.data.max.x + this.data.min.x) / 2;
    let y_offset = (this.data.max.y + this.data.min.y) / 2;
    let z_offset = (this.data.max.z + this.data.min.z) / 2;

    // Repeats
    let x_repeat = x_size / this.data.repeat;
    let y_repeat = y_size / this.data.repeat;
    let z_repeat = z_size / this.data.repeat;

    /*****************/
    /* AXIS SETTINGS */
    /*****************/

    // IDs
    x_axis.setAttribute('id', 'grid-x-axis');
    y_axis.setAttribute('id', 'grid-y-axis');
    z_axis.setAttribute('id', 'grid-z-axis');

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

    // IDs
    XY.setAttribute('id', 'grid-XY');
    YZ.setAttribute('id', 'grid-YZ');
    XZ.setAttribute('id', 'grid-XZ');

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
    if (typeof(this.data.grid) === "object") {
      XY.setAttribute('src', `${this.data.grid.src}`);
      YZ.setAttribute('src', `${this.data.grid.src}`);
      XZ.setAttribute('src', `${this.data.grid.src}`);
    } else {
      XY.setAttribute('src', `${this.data.grid}`);
      YZ.setAttribute('src', `${this.data.grid}`);
      XZ.setAttribute('src', `${this.data.grid}`);
    }

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
  },

  update: function() {
    let XY = document.querySelector("a-grid #grid-XY");
    let YZ = document.querySelector("a-grid #grid-YZ");
    let XZ = document.querySelector("a-grid #grid-XZ");

    let x_axis = document.querySelector("a-grid #grid-x-axis");
    let y_axis = document.querySelector("a-grid #grid-y-axis");
    let z_axis = document.querySelector("a-grid #grid-z-axis");

    // Plane visbility
    XY.setAttribute("visible", `${this.data.show_XY}`);
    YZ.setAttribute("visible", `${this.data.show_YZ}`);
    XZ.setAttribute("visible", `${this.data.show_XZ}`);

    // Axis visibility
    x_axis.setAttribute("visible", `${this.data.show_x_axis}`);
    y_axis.setAttribute("visible", `${this.data.show_y_axis}`);
    z_axis.setAttribute("visible", `${this.data.show_z_axis}`);
  }
})
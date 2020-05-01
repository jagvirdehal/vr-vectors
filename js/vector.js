AFRAME.registerPrimitive("a-vector3", {
  defaultComponents: {
    vector3: {}
  },

  mappings: {
    origin: 'vector3.origin',
    location: 'vector3.location',
    delta: 'vector3.delta',
    radius: 'vector3.radius',
    color: 'vector3.color'
  }
});

AFRAME.registerComponent("vector3", {
  schema: {
    // Location of head/tail
    origin: {default: {x: 0, y: 0, z: 0}, type: "vec3"},
    location: {default: {x: 1, y: 1, z: 1}, type: "vec3"},

    // Whether location is the absolute coordinate or delta coords
    delta: {default: false},

    // Size of vector
    radius: {default: 0.05, min: 0},

    // Material settings
    color: {default: "#fff", type: "color"},
  },

  init: function () {
    /* Wrapper used for rotation and translation
       Body used to draw the 'line' part of the vector
       Head used to create 'pointer' on the head */
    let wrapper = document.createElement("a-entity");
    let body = document.createElement("a-cylinder");
    let head = document.createElement("a-cone");

    updateVector(this.data, wrapper, head, body);

    // Add wrapped, body, and head elements to the vector3 component
    this.el.appendChild(wrapper);
    wrapper.appendChild(body);
    wrapper.appendChild(head);
  },

  update: function() {
    console.log(this);
    let wrapper = this.el.children[0];
    let body = wrapper.children[0];
    let head = wrapper.children[1];

    updateVector(this.data, wrapper, head, body);
  }
});

function updateVector(data, wrapper, head, body) {
  console.log(data);
  
  // Calculate vector coordinates
  let deltaX, deltaY, deltaZ;
  if (data.delta) { // See delta schema
    deltaX = data.location.x;
    deltaY = data.location.y;
    deltaZ = data.location.z;
  } else {
    deltaX = data.location.x - data.origin.x;
    deltaY = data.location.y - data.origin.y;
    deltaZ = data.location.z - data.origin.z;
  }
  
  // Magnitude of vector
  let size = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

  let coneRadius = data.radius * 2;
  let coneHeight = coneRadius * 2;

  // Settings for cylinder shape (line)
  // Position offset by half of size so it starts at the origin
  body.setAttribute("position", `0 ${(size - coneHeight) / 2} 0`);
  body.setAttribute("radius", `${data.radius}`);
  body.setAttribute("height", `${size - coneHeight}`);
  body.setAttribute("color", data.color);

  // Settings for cone shape (pointer)
  head.setAttribute("position", `0 ${size - (coneHeight / 2)} 0`);
  head.setAttribute("radius-bottom", `${coneRadius}`);
  head.setAttribute("radius-top", `0`);
  head.setAttribute("height", `${coneHeight}`);
  head.setAttribute("color", data.color);

  // Calculate X rotation using dot product from vector (0, 1, 0)
  let rotX = (Math.acos(deltaY / size) * 180) / Math.PI;

  // Calculate Y rotation using dot product between (X, 0, Z) and (0, 0, 1)
  let sansY = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
  let rotY;

  // Check if (X, 0, Z) === (0, 0, 0) to avoid division by zero
  if (deltaX === 0) {
    rotY = 0;
  } else {
    rotY = (Math.abs(deltaX) / deltaX) * (Math.acos(deltaZ / sansY) * 180) / Math.PI;
  }

  // Apply rotation and position attributes to wrapper
  wrapper.setAttribute("rotation", `${rotX} ${rotY} 0`);
  wrapper.setAttribute("position",
    `${data.origin.x} ${data.origin.y} ${data.origin.z}`
  );
}
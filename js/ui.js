// Initialize localStorage variables
// TODO: Save across sessions
//       Add a clear button
function init() {
  localStorage.setItem("objects", JSON.stringify([]));
  localStorage.setItem("objectCount", 0);
}

// Add a vector to the scene
// TODO: Add more object details for storage
function addVectorObject(vectorId, x, y, z) {
  // Grab grid component and create a vector
  let grid = document.querySelector("a-grid");
  let vector = document.createElement("a-vector3");

  // Get objects from localStorage
  let objects = JSON.parse(localStorage.getItem("objects"));
  
  // Create the object variable for storage *TODO(2)
  let newObject = {id: vectorId, type: "vector"};

  vector.setAttribute('location', `${x} ${y} ${z}`);
  vector.setAttribute('id', `v${vectorId}`);
  objects.push(newObject);

  // Update localStorage
  localStorage.setItem("objectCount", vectorId);
  localStorage.setItem("objects", JSON.stringify(objects));

  // Add vector to scene
  grid.appendChild(vector);
}

// Adjust an existing object in the scene
// TODO: Input modes
//       
function updateVectorObject(event, vectorId) {
  let vector = document.querySelector(`a-vector3#v${vectorId}`);
  
  console.log(vector);
  
  
  let numbers = event.target.parentNode;

  let x = numbers.children[0].value;
  let y = numbers.children[1].value;
  let z = numbers.children[2].value;

  vector.setAttribute('location', `${x} ${y} ${z}`);
}

function addVectorEntry(event) {
  let display = document.querySelector(".control-drawer .entries");
  let template = display.querySelector(".entry-template").firstElementChild;

  let current_node = event.target.parentNode;

  let vectorId = JSON.parse(localStorage.getItem("objectCount")) + 1;

  let get_x = current_node.querySelector("#x");
  let get_y = current_node.querySelector("#y");
  let get_z = current_node.querySelector("#z");

  addVectorObject(vectorId, get_x.value, get_y.value, get_z.value);

  get_x.parentNode.setAttribute("id", `${vectorId}`);

  get_x.setAttribute("onchange", `updateVectorObject(event, ${vectorId});`);
  get_y.setAttribute("onchange", `updateVectorObject(event, ${vectorId});`);
  get_z.setAttribute("onchange", `updateVectorObject(event, ${vectorId});`);

  event.target.setAttribute("disabled", "true");
  event.target.setAttribute("style", "opacity: 0;");
  
  let new_node = template.cloneNode(deep=true);
  display.appendChild(new_node);
}

function updateVisibility() {
  let grid = document.querySelector("a-grid");

  let show_XY = document.querySelector(`[name="show_XY"]`);
  let show_YZ = document.querySelector(`[name="show_YZ"]`);
  let show_XZ = document.querySelector(`[name="show_XZ"]`);

  let visibility = {
    XY: `${show_XY.checked}`,
    YZ: `${show_YZ.checked}`,
    XZ: `${show_XZ.checked}`,
  }

  grid.setAttribute("show_XY", `${show_XY.checked}`);
  grid.setAttribute("show_YZ", `${show_YZ.checked}`);
  grid.setAttribute("show_XZ", `${show_XZ.checked}`);
}
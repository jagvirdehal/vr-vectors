// Initialize localStorage variables
// TODO: Save across sessions
//       Add a clear button
function init() {
  localStorage.setItem("objects", JSON.stringify([]));
  localStorage.setItem("objectCount", 0);
}

// Add a vector to the scene
// TODO: Adjust input methods
//       Add more object details for storage
function addVector() {
  // Grab grid component and create a vector
  let grid = document.querySelector("a-grid");
  let vector = document.createElement("a-vector3");

  // Get objects from localStorage
  let objects = JSON.parse(localStorage.getItem("objects"));
  let objectCount = parseInt(localStorage.getItem("objectCount"));

  // Getting values from input boxes *TODO(1)
  let x = document.getElementsByName('vector_x')[0].value;
  let y = document.getElementsByName('vector_y')[0].value;
  let z = document.getElementsByName('vector_z')[0].value;
  
  // Create the object variable for storage *TODO(2)
  let id = `v${objectCount}`
  let newObject = {id: id, type: "vector"};

  vector.setAttribute('location', `${x} ${y} ${z}`);
  vector.setAttribute('id', `${id}`);
  objects.push(newObject);

  // Update localStorage
  localStorage.setItem("objectCount", objectCount + 1);
  localStorage.setItem("objects", JSON.stringify(objects));

  // Add vector to scene
  grid.appendChild(vector);
}

// Adjust an existing object in the scene
// TODO: Input modes
//       
function updateObject(event) {
  // ID of target (element that called this function)
  let id = event.target.id;
  let vector = document.querySelector(`a-vector3#${id}`);
  
  let location = vector.getAttribute('location').split(' ');
  
  let x = location[0];
  let y = location[1];
  let z = location[2];

  // Check target name
  if (event.target.name == "update_x") {
    x = event.target.value;
  } else if (event.target.name == "update_y") {
    y = event.target.value;
  } else if (event.target.name == "update_z") {
    z = event.target.value;
  }

  vector.setAttribute('location', `${x} ${y} ${z}`);
}

function updateDisplay() {
  // Find display element and clear its contents
  let display = document.getElementById("display");
  display.textContent = '';

  // Get localStorage variables
  let objects = JSON.parse(localStorage.getItem("objects"));
  let objectCount = JSON.parse(localStorage.getItem("objectCount"));
  
  // Loop through each element in objects
  objects.forEach(element => {
    // Create elements for display
    let container = document.createElement("div");
    let title = document.createElement("span");
    let inputX = document.createElement("input");
    let inputY = document.createElement("input");
    let inputZ = document.createElement("input");

    let location = document.querySelector(`a-vector3#${element.id}`).getAttribute('location').split(' ');

    // Container
    container.setAttribute("id", `${element.id}`);
    container.setAttribute("class", "display-item");

    // Title
    title.innerHTML = element.id;

    // Input X
    inputX.setAttribute("type", "number");
    inputX.setAttribute("name", "update_x");
    inputX.setAttribute("id", `${element.id}`);
    inputX.setAttribute("min", "-99");
    inputX.setAttribute("max", "99");
    inputX.setAttribute("placeholder", "X");
    inputX.setAttribute("onchange", "updateObject(event)");
    inputX.value = location[0];

    // Input Y
    inputY.setAttribute("type", "number");
    inputY.setAttribute("name", "update_y");
    inputY.setAttribute("id", `${element.id}`);
    inputY.setAttribute("min", "-99");
    inputY.setAttribute("max", "99");
    inputY.setAttribute("placeholder", "Y");
    inputY.setAttribute("onchange", "updateObject(event)");
    inputY.value = location[1];
    
    // Input Z
    inputZ.setAttribute("type", "number");
    inputZ.setAttribute("name", "update_z");
    inputZ.setAttribute("id", `${element.id}`);
    inputZ.setAttribute("min", "-99");
    inputZ.setAttribute("max", "99");
    inputZ.setAttribute("placeholder", "Z");
    inputZ.setAttribute("onchange", "updateObject(event)");
    inputZ.value = location[2];

    // Add everything to the display
    container.appendChild(title);
    container.appendChild(inputX);
    container.appendChild(inputY);
    container.appendChild(inputZ);
    display.appendChild(container);
  });
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
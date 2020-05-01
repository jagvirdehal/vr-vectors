function init() {
  localStorage.setItem("objects", JSON.stringify([]));
  localStorage.setItem("objectCount", 0);
}

function addVector() {
  let vector = document.createElement("a-vector3");
  let grid = document.querySelector("a-grid");

  let objects = JSON.parse(localStorage.getItem("objects"));
  let objectCount = parseInt(localStorage.getItem("objectCount"));

  let x = document.getElementsByName('vector_x')[0].value;
  let y = document.getElementsByName('vector_y')[0].value;
  let z = document.getElementsByName('vector_z')[0].value;
  let id = `v${objectCount}`

  vector.setAttribute('location', `${x} ${y} ${z}`);
  vector.setAttribute('id', `${id}`);

  objects.push(id);

  localStorage.setItem("objectCount", objectCount + 1);
  localStorage.setItem("objects", JSON.stringify(objects));

  grid.appendChild(vector);
}

function updateObject(event) {
  let id = event.target.id;
  let vector = document.querySelector(`a-vector3#${id}`);

  // console.log(`a-vector3#${id}`);
  // console.log(vector);
  
  let location = vector.getAttribute('location').split(' ');
  
  let x = location[0];
  let y = location[1];
  let z = location[2];

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
  let display = document.getElementById("display");

  let item = document.createElement("div");

  display.appendChild()
}
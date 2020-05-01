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

  let newObject = {id: id, type: "vector"};

  objects.push(newObject);

  localStorage.setItem("objectCount", objectCount + 1);
  localStorage.setItem("objects", JSON.stringify(objects));

  grid.appendChild(vector);
}

function updateObject(event) {
  let id = event.target.id;
  let vector = document.querySelector(`a-vector3#${id}`);
  
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

  display.textContent = '';

  let objects = JSON.parse(localStorage.getItem("objects"));
  let objectCount = JSON.parse(localStorage.getItem("objectCount"));
  
  objects.forEach(element => {
    console.log(element);
    
    let container = document.createElement("div");
    let title = document.createElement("span");
    let inputX = document.createElement("input");
    let inputY = document.createElement("input");
    let inputZ = document.createElement("input");

    container.setAttribute("id", `${element.id}`);
    container.setAttribute("class", "display-item");

    title.innerHTML = element.id;

    let location = document.querySelector(`a-vector3#${element.id}`).getAttribute('location').split(' ');

    inputX.setAttribute("type", "number");
    inputX.setAttribute("name", "update_x");
    inputX.setAttribute("id", `${element.id}`);
    inputX.setAttribute("min", "-99");
    inputX.setAttribute("max", "99");
    inputX.setAttribute("placeholder", "X");
    inputX.setAttribute("onchange", "updateObject(event)");
    inputX.value = location[0];

    inputY.setAttribute("type", "number");
    inputY.setAttribute("name", "update_y");
    inputY.setAttribute("id", `${element.id}`);
    inputY.setAttribute("min", "-99");
    inputY.setAttribute("max", "99");
    inputY.setAttribute("placeholder", "Y");
    inputY.setAttribute("onchange", "updateObject(event)");
    inputY.value = location[1];
    
    inputZ.setAttribute("type", "number");
    inputZ.setAttribute("name", "update_z");
    inputZ.setAttribute("id", `${element.id}`);
    inputZ.setAttribute("min", "-99");
    inputZ.setAttribute("max", "99");
    inputZ.setAttribute("placeholder", "Z");
    inputZ.setAttribute("onchange", "updateObject(event)");
    inputZ.value = location[2];

    container.appendChild(title);
    container.appendChild(inputX);
    container.appendChild(inputY);
    container.appendChild(inputZ);

    display.appendChild(container);
  });
}
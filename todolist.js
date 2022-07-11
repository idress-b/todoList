//on stoque dans des variables les éléments necessaires
const form = document.querySelector("#form");
const input = document.querySelector("#form input");
const taskList = document.getElementById("todo-list");
const trashIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd" clip-rule="evenodd">
                            <path
                                d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z" />
                        </svg>`;
const outlineIcon = `<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z" fill-rule="nonzero"/></svg>`;

const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/></svg>`;

function init()
{
    // on récupère les infos du localstorage

    memorisedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!memorisedTasks) {
        memorisedTasks = {};
    }
    
    for (const item in memorisedTasks) {
        createTask(memorisedTasks[item][0], item, memorisedTasks[item][1]);
    }
    // on crée une nouvelle tache lors du clique sur le bouton du formulaire
}

init();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const dataKey = Date.now();

    memorisedTasks[dataKey] = [input.value, false];

    localStorage.setItem("tasks", JSON.stringify(memorisedTasks));

    createTask(input.value, dataKey);
  }
});

function createTask(taskText, dataKey, done = false) {
  // on créer l'element task on y ajoute tout les éléments necessaires
  const task = document.createElement("li");
  task.setAttribute("data-key", dataKey);

  const newText = document.createElement("span");

  task.append(newText);
  newText.innerText = taskText;
  // création et gestion du bouton de validation de tache
  if (done) {
    newText.classList.add("strike");
  }
  const divButtons = document.createElement("div");
  task.append(divButtons);
  const doneButton = document.createElement("button");
  divButtons.append(doneButton);
  if (done) {
    doneButton.innerHTML += checkIcon;
  } else {
    doneButton.innerHTML += outlineIcon;
  }

  // on toggle sur le bouton done et undone

  doneButton.addEventListener("click", () => {
    if (!done) {
      done = !done;
      doneButton.innerHTML = checkIcon;
      newText.classList.add("strike");
      memorisedTasks[task.getAttribute("data-key")][1] = true;
      localStorage.setItem("tasks", JSON.stringify(memorisedTasks));
    } else {
      done = !done;
      doneButton.innerHTML = outlineIcon;
      newText.classList.remove("strike");
      memorisedTasks[task.getAttribute("data-key")][1] = false;
      localStorage.setItem("tasks", JSON.stringify(memorisedTasks));
    }
  });

  // bouton de suppression
  const trashButton = document.createElement("button");
  divButtons.append(trashButton);
  trashButton.innerHTML += trashIcon;

  // on ajoute la task à la liste
  taskList.append(task);

  // on vide le input
  input.value = "";

  // on gère la suppression , en ajoutant un addeventlistener sur le bouton de suppression
  trashButton.addEventListener("click", () => {
    delete memorisedTasks[task.getAttribute("data-key")];
    localStorage.setItem("tasks", JSON.stringify(memorisedTasks));
    task.remove();
  });
}

// permet de supprimer la liste
function reset()
{
    localStorage.clear();
    memorisedTasks={};
    location.reload();
}

// on gère le bouton de suppression de la liste
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click',reset);
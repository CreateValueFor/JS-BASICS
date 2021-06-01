const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
}
// local엔 string만 저장할수있기 때문에 JSON의 stringify메소드를 이용한다.
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌"
    delBtn.addEventListener("click",deleteTodo);
    const span = document.createElement("span");
    const newId = toDos.length+ 1;
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value="";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
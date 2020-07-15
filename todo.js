const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
} 
/* filter 안에 익명함수로 들어가있는 function 의 역할은 runs all of toDos and return if 
id of toDo does not match with the id of li 
*/

//parseInt 의 기능 : 데이터값 string을 number 로 바꿔준다. 
  
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "🗑";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; // li 의 id 는 newId야. li에 id가 만들어짐. 위에서 newId는 정의됨. 
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };  
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) { 
            paintToDo(toDo.text);   
        })
// toDo의 text를 가지고 paintToDo라는 이름의 function를 parsedToDos Araay 에다가 실행.
    }  
}

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit", handleSubmit)
    }

    init();
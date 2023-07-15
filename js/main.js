const formSubmit = document.querySelector(".form-submit")

formSubmit.addEventListener("click" , handleSubmit)
var counter = 0
const nameInput = document.querySelector(".todoName")
const timeInput = document.querySelector(".todoTime")
const dateInput = document.querySelector(".todoDate")
const captionInput = document.querySelector(".todoCaption")
var todosArray=[]
function handleSubmit(event){
  event.preventDefault()
  if(formSubmit.getAttribute("edit") === "true"){
    const id = parseInt(formSubmit.getAttribute("id"))
    const editedTodo = todosArray.find(todo => todo.id === id)
    editedTodo.name = nameInput.value
    editedTodo.date = dateInput.value

    editedTodo.time = timeInput.value
    editedTodo.caption = captionInput.value
    formSubmit.removeAttribute("edit")
    formSubmit.removeAttribute("id")
  } else {
    const todo = {name:nameInput.value , time:timeInput.value , date:dateInput.value , caption : captionInput.value , isDone:false , id:counter}
    todosArray.push(todo)
    counter++
  }
  renderTodos()
}

function renderTodos(){
  const todosContainer= document.querySelector(".todos")
  todosContainer.innerHTML=""
  todosArray.map(todo=>{
    const todoName = document.createElement("h1")
    todoName.innerHTML=todo.name
    todosContainer.appendChild(todoName)

    const todoDate = document.createElement("h2")
    todoDate.innerHTML=todo.date
    todosContainer.appendChild(todoDate)

    const todoTime = document.createElement("h3")
    todoTime.innerHTML=todo.time
    todosContainer.appendChild(todoTime)

    const todoCaption = document.createElement("h4")
    todoCaption.innerHTML=todo.caption
    todosContainer.appendChild(todoCaption)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML="delete"
    deleteBtn.setAttribute("id" , todo.id)
    deleteBtn.addEventListener("click" , ()=>{
      handleDelete(deleteBtn)
    })
    todosContainer.appendChild(deleteBtn)

    const editBtn = document.createElement("button")
    editBtn.innerHTML="edit"
    editBtn.setAttribute("id" , todo.id)
    editBtn.addEventListener("click" , ()=>{
      handleEdit(editBtn)
    })
    todosContainer.appendChild(editBtn)
  })
}

function handleDelete(btn){
  const id = parseInt(btn.getAttribute("id"))
  const filterTodos = todosArray.filter(todo=>{
    return todo.id!==id
  })
  todosArray = filterTodos
  renderTodos()
}

function handleEdit(btn){
  const id = parseInt(btn.getAttribute("id"))
  const editedTodo = todosArray.find(todo => todo.id === id)
  nameInput.value = editedTodo.name
  dateInput.value = editedTodo.date
  timeInput.value = editedTodo.time
  captionInput.value = editedTodo.caption
  formSubmit.setAttribute("edit", true)
  formSubmit.setAttribute("id", id)
}

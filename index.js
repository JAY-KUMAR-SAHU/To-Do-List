const todoitems = document.querySelector(".list ul");
const input = document.querySelector(".input input");
let listitems=[];

// It is meant to render all the items on the web page.
const render=()=>{
    listitems=JSON.parse(localStorage.getItem("listitems"));
    listitems=(listitems===null) ? []  : [...listitems];
    todoitems.innerHTML="";

    if(listitems.length===0){
        todoitems.textContent="Create Today's Work";
    }
    else{
        listitems.forEach(item=>{
            // console.log(item);
            const newElement=document.createElement("li");
            newElement.innerHTML=`<span id=${item.id} class="span"></span><p>${item.data}</p> <i id=${item.id} class="icon fas fa-trash"></i>`;
            if(item.isFinished === true){
                newElement.classList.add("change");
            }
            todoitems.append(newElement);
        });
    }
}
render();

input.addEventListener("keypress", (event)=>{
    if(event.key=="Enter"){
        const task = {
            data : event.target.value,
            id : Date.now(),
            isFinished : false
        };
        listitems.push(task);

        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
        event.target.value="";
    }
});

// function to delete the li from the tasks
document.body.addEventListener("click", (e)=>{
    if(e.target.classList.contains("icon")){
        const newlistitems = listitems.filter((item)=>{
            return item.id != e.target.id
        });
        listitems = [...newlistitems];
        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
    }
});

// function to change list color to
// determine if the task is completed
document.body.addEventListener("click", (e)=>{
    if(e.target.classList.contains("span")){
        // console.log('Span is clicked');
        e.target.parentNode.classList.toggle("change");
        listitems.forEach((item)=>{
            if(item.id == e.target.id && e.target.parentNode.classList.contains("change")){
                item.isFinished=true;
            }
            else if(item.id == e.target.id && e.target.parentNode.classList.contains("change") == false){
                item.isFinished=false;
            }
            // console.log(item);
        });
        // implementation of local storage
        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
    }
});
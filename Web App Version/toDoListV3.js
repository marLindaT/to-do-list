

//countdown time to end of day
function updateClock(){
let date = new Date();
let hoursLeft = 23 - date.getHours();
let minutesLeft = 59 - date.getMinutes();
let secondsLeft = 60 - date.getSeconds();

return (`${hoursLeft} : ${minutesLeft} : ${secondsLeft} until tomorrow`);
};

//paint clock to DOM
function paintClock(){
	let clock = document.getElementById("clock");
	let time = updateClock();
		clock.innerHTML = time;
};

//add item to list	
function addItem(){
	//if input field is not empty take that value and store as item
	let input = document.getElementById("itemInput");
	let item;
	if(input.value != ""){
		 item = input.value;
//create li and assign class 
	let LI = document.createElement("LI");
		LI.className = "listItem";
//take value from input and append it as text node to li
	let text = document.createTextNode(item);
	LI.appendChild(text);
//create a button with text and append to li
	let btn =document.createElement("BUTTON");
		btn.className ="completeBtn";
	let btnTxt=document.createTextNode("complete");
		btn.appendChild(btnTxt);
		LI.appendChild(btn);
//append li with button to list
	let list=document.getElementById("list");
		list.appendChild(LI);
	}	
//reset input field to empty string		
	input.value ="";
};

//hide list items that have been completed by clicking on the item
//consider changing this to remove elements by clicking on complete button
let ulist = document.getElementById("list");


ulist.addEventListener("click", function(e){
	if(e.target.tagName ==="LI"){
		e.target.classList.toggle("strikeout");
	}
}, false)

//work in progress for strikeout effect on text after clicking complete

ulist.addEventListener("click", function(ev){
	if(ev.target.tagName ==="BUTTON"){
		ev.target.parentNode.classList.toggle("done");
	}

})



//event listener wont work without any instances of the class
// let items = document.getElementsByClassName("completeBtn");
// items.addEventListener("click", removeItem, false);

let addItemBtn = document.getElementById("addItemBtn");
addItemBtn.addEventListener("click", addItem, false);

setInterval(paintClock, 1000);

function settingStorage(){

	let saved = document.getElementsByTagName("LI");
	let savedList = [...saved];
	for(let i=0; i<savedList.length; i++){
	console.log(savedList[i]);
}
}

//use #saveBtn to store all list items in localStorage
// do not store items with .done

let saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function(){
	let counter = 0;
	let item = document.getElementsByClassName("listItem");
	let items = [...item];
	//each list item
	for(let i=0;i< items.length;i++){
		//each item without .done
		if(!items[i].classList.contains("done")){
			counter+=1;
			localStorage.setItem(`item${counter}`,items[i].childNodes[0].nodeValue );
		}
	}
}, false);


/*********************LOCAL STORAGE PROTOCOL


localStorage.setItem('myCat', 'Tom');

var cat = localStorage.getItem('myCat');

localStorage.removeItem('myCat');

// Clear all items
localStorage.clear();


********************************/
//                     /*
//below for testing


let clearBtn = document.getElementById("clearAll");
clearBtn.addEventListener("click", function(){
	localStorage.clear();
});

function populateList(){

let input = document.getElementById("itemInput");

let needAutoValues = false;

	for(let h =0; h<99; h++){
		if(localStorage.getItem(`item${h}`)){
			let current = localStorage.getItem(`item${h}`);
			input.value = current;
			addItem();
			needAutoValues = true;
		}
	}
if(needAutoValues){
	let str = "Hello_World";
	for(let i=0; i<5; i++){
		input.value = str;
		addItem();
	}
}	
};

let body = document.getElementsByTagName("BODY")[0];

body.onload = populateList();

//               */


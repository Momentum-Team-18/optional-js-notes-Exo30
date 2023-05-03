
let mainContainer= document.getElementById("mainContainer")
let headerDiv = document.getElementById("header");
let bodyDiv = document.getElementById("body");


//----------------JSON fetcher -------------------

let dataFetch = function(noteUrl, requestOption) {
    fetch (noteUrl, requestOption)
    .then(r => r.json(console.log(requestOption.body)))
    .then((noteData) => {
if (requestOption.method === 'POST') {
    console.log(noteData.body)
}
        if (requestOption.method === "GET"){
     mainContainer.innerHTML = ""
        for (let note in noteData){
            let currentNote = noteData[note];

            //create a post it note to place data in ------------
            let noteDiv = document.createElement('div');

            //add title and body of note -------------------
            let titleDiv = document.createElement('div');
            let bodyDiv = document.createElement("div");
            noteDiv.classList.add("note");
            titleDiv.classList.add("title");
            bodyDiv.classList.add("body");
            titleDiv.setAttribute('data-type', 'title');
            bodyDiv.setAttribute('data-type', 'body')
            titleDiv.append("Note #" + (Number(note) + 1) + " " + currentNote.title)
            bodyDiv.append(currentNote.body + " " + currentNote.id)

            //create a delete button inside of every note---------------
            let deleteButton = document.createElement("button");
            deleteButton.append("delete")
            deleteButton.setAttribute('id', currentNote.id);
            deleteButton.setAttribute('data-action', 'deleteButton')

            //create edit button inside of every note -----------------
            let editButton = document.createElement("button");
            editButton.append("Edit");
            editButton.setAttribute('data-id', currentNote.id);
            editButton.setAttribute('data-action', 'editButton')

            //append all elements to noteDiv-------------------------
            noteDiv.append(titleDiv)
            noteDiv.append(deleteButton)
            noteDiv.append(editButton)
            noteDiv.append(bodyDiv)

            //append noteDiv to page------------------------------
            mainContainer.append(noteDiv);
        }} else {
           
        }
    })
}

//---------------takes which request it's handling and feeds it todataFetch as appropriate//
let fetchSystem = function(request, titleOrNum, text) {
    var noteUrl = '';
    var requestOption = {};
    if (request === "GET") {
        noteUrl = 'http://localhost:3000/notes/';
        requestOption = {
            method: "GET",
            headers: { 'Content-type': 'application.json'}
        }
    }

    if (request ==="POST") {
        noteUrl = 'http://localhost:3000/notes/';
     requestOption = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'title': titleOrNum, 'body': text})
     } 


    }
     if (request === "DELETE"){
        noteUrl = 'http://localhost:3000/notes/' + titleOrNum;
        requestOption = {
            method: "DELETE"
        }
        
     }

dataFetch(noteUrl, requestOption)
    if (request !== "GET"){
        fetchSystem("GET")
    }
}

let postNote = function() {
    fetchSystem("POST", header.value, body.value)
}

//-------click event listners -------------------
mainContainer.onclick = function(event) {
    let target = event.target;
    if (target.tagName != 'BUTTON') return;
    if (target.dataset.action === 'deleteButton'){
    fetchSystem("DELETE", target.id)
    }

    if (target.dataset.action === 'editButton'){
        let note = event.target.closest('div');
        let body = note.lastChild;
        let bodyText = body.innerHTML
        let title = note.firstChild;

        note.removeChild(body);
        let newBody = document.createElement('input')
        newBody.setAttribute('type', 'text');
        newBody.value = bodyText;

        note.append(newBody)
    }
}

let createNoteCard = function(noteData) {

}

//addNote();
//getNotes();

fetchSystem("GET")
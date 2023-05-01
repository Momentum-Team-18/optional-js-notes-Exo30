
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

            let noteDiv = document.createElement('div');
            noteDiv.classList.add("note");
            noteDiv.append((Number(note) + 1) + " " + currentNote.title + ": " + currentNote.body + " " + currentNote.id);
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

let deleteNote = function() {
    console.log(mainContainer)
    fetchSystem("DELETE", header.value)
}

let createNoteCard = function(noteData) {

}

//addNote();
//getNotes();

fetchSystem("GET")
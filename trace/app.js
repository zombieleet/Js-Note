{
  class GetNotes {
    constructor() {
      this.getNotes = window.localStorage;
    }

    searchNote() {
      if ( ! this.getNotes.getItem("jsNote") ) { return false };
      try {
          let noNote = document.querySelector('.note-no-note');
          noNote.setAttribute('data-display', 'note-nodisplay');
      } catch(ex) {}

      for (var i = 0; i < this.getNotes.length; i++) {
        let title = this.getNotes.key(i);
        let note = this.getNotes.getItem(title);
        try {
            let [noteTitle, noteTime, noteDetails] = [title.match(/(Title:.*)-/i)[0].replace(/(-.*|title:)/ig,""), title.match(/(\d+\/\d+\/\d+)-/)[0].replace(/-/,""), title.match(/(\d+:\d+:\d+)/)[0].replace(/-/,"")]
            this.formatNote(noteTitle, noteTime, noteDetails, note);
        }catch(ex){}

      }

    }

    formatNote(title, date, time, note) {
      let noteInfo = document.createElement('div');
      let noteTitle = document.createElement('p');
      let noteDate = document.createElement('p');
      let noteTime = document.createElement('span');
      let noteNote = document.createElement('div');
      let noteDelete = document.createElement('span');
      let noteArray = [{domObject: noteTitle, value: title},
                      {domObject: noteDelete, value: ""},
                      {domObject: noteDate, value: date},
                      {domObject: noteTime, value: time},
                      {domObject: noteNote, value: note}];

      // let noteArray = [{noteTitle, title},{noteDate, date}, {noteTime, time}];
              noteInfo.setAttribute('class', 'note-info')
              noteTitle.setAttribute('class', 'note-title');
              noteDelete.setAttribute('class', 'fa fa-close fa-pull-right note-close');
              noteDate.setAttribute('class', 'note-date pull-right');
              noteTime.setAttribute('class', 'note-time');
              noteNote.setAttribute('class', "note-note");

      noteArray.forEach((info) => {
        info["domObject"].innerHTML = info.value;
        noteInfo.appendChild(info["domObject"])
      })

      document.body.appendChild(noteInfo);
    }
  }

  class NoteFile {
    constructor() {
      // super()
      let file = document.querySelector('.file');
      this.file = () => file
    }

    createNote() {
      this.file().addEventListener('click', () => {
        location.assign('../createFile.html')
      });
    }

  }
  window.addEventListener("load", () => {

    if ( new NoteFile().file() ) {

      let file = new NoteFile();
      file.createNote();

      let getNotes = new GetNotes();
      getNotes.searchNote()

    }

  })
}
document.body.addEventListener("click", (e) => {

  let targetSrc = e.target;
  let noteNote;
  let noteTitle;
  let noteTime;
  if ( (targetSrc.getAttribute("class") === "note-info") || (targetSrc.parentNode.getAttribute("class") === "note-info") ) {

    if ( targetSrc.className.toString().indexOf('fa-close') > 0 ) {
        let date = targetSrc.parentNode.querySelector(".note-date").textContent;
        let title = targetSrc.parentNode.querySelector(".note-title").textContent;
        let time = targetSrc.parentNode.querySelector(".note-time").textContent;
        window.localStorage.removeItem(`Title:${title}-${date}-${time}`)
        targetSrc.parentNode.remove();
        if ( ! document.querySelector(".note-info") ) {
            window.localStorage.removeItem("jsNote");
            location.assign("../index.html");
        }
        return false;
    } else if ( targetSrc.className !== "note-info") {
      targetSrc = targetSrc.parentNode;
    }

    noteNote = targetSrc.querySelector(".note-note").textContent;
    noteTitle = targetSrc.querySelector(".note-title").textContent;
    noteTime = targetSrc.querySelector(".note-time").textContent;
    window.localStorage.setItem("Read:noteNote",noteNote)
    window.localStorage.setItem("Read:noteTitle",noteTitle);
    window.localStorage.setItem("Read:noteTime",noteTime);
    location.assign("../readnote.html");
  }
})

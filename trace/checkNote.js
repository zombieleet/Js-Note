{
  class NoteRead {
    constructor() {
      let edit = document.querySelector('.note-edit');
      let save = document.createElement('button');
      let noteRead = document.createElement('div');
      let noteTitle = document.createElement('p');
      let titleContainer = document.createElement('div');
      let cancel = document.querySelector('.note-back');
      this.edit = () => edit;
      this.save = () => save;
      this.noteRead = () => noteRead;
      this.noteTitle = () => noteTitle;
      this.storage = () => window.localStorage;
      this.cancel = () => cancel;
      this.titleContainer = () => titleContainer;
    }
    noteNoteTitle() {
      let noteTitle = this.storage().getItem("Read:noteTitle");
      this.noteTitle().textContent = noteTitle;
      this.noteTitle().setAttribute("class", "note-title-note");
      this.titleContainer().setAttribute("class", "note-title-container");
      this.titleContainer().appendChild(this.noteTitle());
      return this.titleContainer();
    }
    noteNoteRead() {
      let noteContent = this.storage().getItem("Read:noteNote");
      this.noteRead().textContent = noteContent;
      this.noteRead().setAttribute("class","note-read-note");
      return this.noteRead()
    }
    loadNote() {
        document.body.appendChild(this.noteNoteTitle());
        document.body.appendChild(this.noteNoteRead());
        return this;
    }
    saveNote() {
      this.save().textContent = "Save";
      this.save().setAttribute('class', 'note-read-save');
      document.body.appendChild(this.save());
    }
    saveEditedNote() {
      this.save().addEventListener('click', () => {
        let storageItem = this.storage().getItem("Read:noteTime");
        for (let i = 0; i <= this.storage().length; i++ ) {

          if ( /\d+:\d+:\d+/.test(this.storage().key(i))) {

            let editedStorageKey = this.storage().key(i).replace(storageItem, new Date().toLocaleTimeString())
            let editedStorageItem = this.noteRead().textContent
            if ( editedStorageItem === "" ) {
                /*                                                      *\
                It seems like you are not ready to edit your note properly
                \*                                                      */
                if ( document.querySelector('[data-display="displayError"]' )) {
                  document.querySelector('[data-display="displayError"]' ).remove();
                }
                let errorEl = document.createElement('p');
                errorEl.innerHTML = 'Invalid Note Or Title'
                errorEl.setAttribute('data-display', 'displayError')
                document.body.appendChild(errorEl);
                setTimeout(() => {
                  errorEl.remove();
                }, 2000)
                
                return false;

            }

            this.deleteStorage(this.storage().key(i));

            this.storage().setItem(editedStorageKey, editedStorageItem);

            this.deleteStorage();

            location.assign("index.html");

          }

        }
      })
    }
    editNote() {

      this.edit().addEventListener('click', () => {
        this.noteRead().setAttribute('contenteditable',true);
        this.noteRead().setAttribute('data-bottom-border', 'note-read-border')
        this.saveNote()
      });
      // return this;
    }
    cancelReadNote() {
        this.cancel().addEventListener('click', () => {
            this.deleteStorage();
        })
        return this;
    }
    deleteStorage( storeToDelete = undefined ) {
        if ( storeToDelete ) {
          this.storage().removeItem(storeToDelete);
          return true;
        }
        this.storage().removeItem("Read:noteNote");
        this.storage().removeItem("Read:noteTitle");
        this.storage().removeItem("Read:noteTime");
    }
  }

  let loadnote = new NoteRead();
  loadnote.loadNote().cancelReadNote().editNote();
  loadnote.saveEditedNote();
}

{
  class Save {
  constructor() {
    let save = document.querySelector('.note-save');
    this.save = () => {
      return save;
    }
  }
  saveText() {
    this.save().addEventListener('click', () => {
      let textField = document.querySelector(".note-write-note");
      let noteTileNote = document.querySelector(".note-title-note");
      if( textField.textContent.length === 0  || ((noteTileNote.value.length === 0 ) || (noteTileNote.value.toLowerCase() === "add title"))) {
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
      {
        let note = textField.textContent;
        let date = new Date();
        let datestr = date.toLocaleDateString();
        let timestr = date.toLocaleTimeString();
        let title = noteTileNote.value;
        localStorage.setItem("jsNote", "jsNote");
        localStorage.setItem(`Title:${title}-${datestr}-${timestr}`, note);
        location.assign("../index.html");
      }
    })
  }
}
// class NoteSelectContent {
//   constructor() {
//     let noteSelect = document.querySelector('.note-write-note');
//     // let execCommand = document.execCommand;
//     this.noteSelect = () => noteSelect;
//     // this.execCommand = () => execCommand;
//   }
  // static link(element) {
  //   let regexp = /http.*(.com)/;
  //   let link;
  //   try { link = element.textContent.match(regexp)[0]; }catch(ex){ }
  //   // console.log(element.textContent.match(regexp) );
  //   if ( link ) {
  //       element.textContent = element.textContent.replace(link,"");
  //       // document.execCommand("createlink", false, link);
  //   }
  // }
//   majorStyling() {
//     this.noteSelect().addEventListener('selectstart', (e) => {
//         let selection = window.getSelection();
//         console.log(selection.toString());
//     }, false)
//   }
// }
class Title {
  constructor() {
    let title = document.querySelector(".note-title-note");
    let err = document.querySelector(".note-title-error");
    this.title = () => {
      return title;
    }
    this.err = () => {
      return err;
    }
  }
  editTitle() {
    var _this = this;
    this.title().addEventListener('click',function(){
      if ( this.hasAttribute("readonly" ) ) {
          if ( this.value.length >= 20 ) {
            this.removeAttribute("readonly")
          }
      }
        this.parentNode.setAttribute('data-border', 'border-style')
      });
      this.title().addEventListener('keyup', function(e) {
          this.value = this.value.toUpperCase();
          if ( this.value.length >= 20 ) {
              if ( this.value.length !== 20 ) {
                /*                          *\
                    DID THIS TO FIX A BUG
                \*                          */
                  this.value = this.value.slice(0, 20 - this.value.length);
              }
            if ( e.keyCode !== 8 ) {

              _this.err().setAttribute("data-display", "displayError");
              setTimeout(() => {
                _this.err().removeAttribute("data-display");
              }, 2000)
              this.setAttribute("readonly", "readonly");

            }

          }

          if ( e.keyCode === 8 ) {

            if ( this.hasAttribute("readonly") ) {
              this.removeAttribute("readonly");
              this.value = this.value.slice(0, -1);
            }


          }
      });
    }
  }
  class Cancel {
    constructor() {
      let cancel = document.querySelector('.note-cancel')
      this.cancel = () => cancel
    }
    cancelNoteCreate() {
      this.cancel().addEventListener('click', () => {
        location.assign("../index.html");
      });
    }
  }
  let save = new Save();
  save.saveText()

  let title = new Title();
  title.editTitle();

  let cancel = new Cancel();
  cancel.cancelNoteCreate();

  // let noteSelect = new NoteSelectContent();
  // noteSelect.majorStyling();
}

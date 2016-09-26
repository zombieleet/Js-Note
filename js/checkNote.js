$traceurRuntime.registerModule("../trace/checkNote.js", [], function() {
  "use strict";
  var __moduleName = "../trace/checkNote.js";
  {
    var NoteRead = function() {
      function NoteRead() {
        var edit = document.querySelector('.note-edit');
        var save = document.createElement('button');
        var noteRead = document.createElement('div');
        var noteTitle = document.createElement('p');
        var titleContainer = document.createElement('div');
        var cancel = document.querySelector('.note-back');
        this.edit = function() {
          return edit;
        };
        this.save = function() {
          return save;
        };
        this.noteRead = function() {
          return noteRead;
        };
        this.noteTitle = function() {
          return noteTitle;
        };
        this.storage = function() {
          return window.localStorage;
        };
        this.cancel = function() {
          return cancel;
        };
        this.titleContainer = function() {
          return titleContainer;
        };
      }
      return ($traceurRuntime.createClass)(NoteRead, {
        noteNoteTitle: function() {
          var noteTitle = this.storage().getItem("Read:noteTitle");
          this.noteTitle().textContent = noteTitle;
          this.noteTitle().setAttribute("class", "note-title-note");
          this.titleContainer().setAttribute("class", "note-title-container");
          this.titleContainer().appendChild(this.noteTitle());
          return this.titleContainer();
        },
        noteNoteRead: function() {
          var noteContent = this.storage().getItem("Read:noteNote");
          this.noteRead().textContent = noteContent;
          this.noteRead().setAttribute("class", "note-read-note");
          return this.noteRead();
        },
        loadNote: function() {
          document.body.appendChild(this.noteNoteTitle());
          document.body.appendChild(this.noteNoteRead());
          return this;
        },
        saveNote: function() {
          this.save().textContent = "Save";
          this.save().setAttribute('class', 'note-read-save');
          document.body.appendChild(this.save());
        },
        saveEditedNote: function() {
          var $__2 = this;
          this.save().addEventListener('click', function() {
            var storageItem = $__2.storage().getItem("Read:noteTime");
            var $__3 = function(i) {
              if (/\d+:\d+:\d+/.test($__2.storage().key(i))) {
                var editedStorageKey = $__2.storage().key(i).replace(storageItem, new Date().toLocaleTimeString());
                var editedStorageItem = $__2.noteRead().textContent;
                if (editedStorageItem === "") {
                  if (document.querySelector('[data-display="displayError"]')) {
                    document.querySelector('[data-display="displayError"]').remove();
                  }
                  var errorEl = document.createElement('p');
                  errorEl.innerHTML = 'Invalid Note Or Title';
                  errorEl.setAttribute('data-display', 'displayError');
                  document.body.appendChild(errorEl);
                  setTimeout(function() {
                    errorEl.remove();
                  }, 2000);
                  return {v: false};
                }
                $__2.deleteStorage($__2.storage().key(i));
                $__2.storage().setItem(editedStorageKey, editedStorageItem);
                $__2.deleteStorage();
                location.assign("index.html");
              }
            },
                $__4;
            for (var i = 0; i <= $__2.storage().length; i++) {
              $__4 = $__3(i);
              if ((typeof $__4 === 'undefined' ? 'undefined' : $traceurRuntime.typeof($__4)) === "object")
                return $__4.v;
            }
          });
        },
        editNote: function() {
          var $__2 = this;
          this.edit().addEventListener('click', function() {
            $__2.noteRead().setAttribute('contenteditable', true);
            $__2.noteRead().setAttribute('data-bottom-border', 'note-read-border');
            $__2.saveNote();
          });
        },
        cancelReadNote: function() {
          var $__2 = this;
          this.cancel().addEventListener('click', function() {
            $__2.deleteStorage();
          });
          return this;
        },
        deleteStorage: function() {
          var storeToDelete = arguments[0];
          if (storeToDelete) {
            this.storage().removeItem(storeToDelete);
            return true;
          }
          this.storage().removeItem("Read:noteNote");
          this.storage().removeItem("Read:noteTitle");
          this.storage().removeItem("Read:noteTime");
        }
      }, {});
    }();
    var loadnote = new NoteRead();
    loadnote.loadNote().cancelReadNote().editNote();
    loadnote.saveEditedNote();
  }
  return {};
});
$traceurRuntime.getModule("../trace/checkNote.js" + '');

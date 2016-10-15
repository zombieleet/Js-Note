$traceurRuntime.registerModule("../trace/app.js", [], function() {
  "use strict";
  var __moduleName = "../trace/app.js";
  {
    var GetNotes = function() {
      function GetNotes() {
        this.getNotes = window.localStorage;
      }
      return ($traceurRuntime.createClass)(GetNotes, {
        searchNote: function() {
          var $__3,
              $__4;
          if (!this.getNotes.getItem("jsNote")) {
            return false;
          }
          ;
          try {
            var noNote = document.querySelector('.note-no-note');
            noNote.setAttribute('data-display', 'note-nodisplay');
          } catch (ex) {}
          for (var i = 0; i < this.getNotes.length; i++) {
            var title = this.getNotes.key(i);
            var note = this.getNotes.getItem(title);
            try {
              var $__2 = [title.match(/(Title:.*)-/i)[0].replace(/(-.*|title:)/ig, ""), title.match(/(\d+\/\d+\/\d+)-/)[0].replace(/-/, ""), title.match(/(\d+:\d+:\d+)/)[0].replace(/-/, "")],
                  noteTitle = ($__3 = $__2[Symbol.iterator](), ($__4 = $__3.next()).done ? void 0 : $__4.value),
                  noteTime = ($__4 = $__3.next()).done ? void 0 : $__4.value,
                  noteDetails = ($__4 = $__3.next()).done ? void 0 : $__4.value;
              this.formatNote(noteTitle, noteTime, noteDetails, note);
            } catch (ex) {}
          }
        },
        formatNote: function(title, date, time, note) {
          var noteInfo = document.createElement('div');
          var noteTitle = document.createElement('p');
          var noteDate = document.createElement('p');
          var noteTime = document.createElement('span');
          var noteNote = document.createElement('div');
          var noteDelete = document.createElement('span');
          var noteArray = [{
            domObject: noteTitle,
            value: title
          }, {
            domObject: noteDelete,
            value: ""
          }, {
            domObject: noteDate,
            value: date
          }, {
            domObject: noteTime,
            value: time
          }, {
            domObject: noteNote,
            value: note
          }];
          noteInfo.setAttribute('class', 'note-info');
          noteTitle.setAttribute('class', 'note-title');
          noteDelete.setAttribute('class', 'fa fa-close fa-pull-right note-close');
          noteDate.setAttribute('class', 'note-date pull-right');
          noteTime.setAttribute('class', 'note-time');
          noteNote.setAttribute('class', "note-note");
          noteArray.forEach(function(info) {
            info["domObject"].innerHTML = info.value;
            noteInfo.appendChild(info["domObject"]);
          });
          document.body.appendChild(noteInfo);
        }
      }, {});
    }();
    var NoteFile = function() {
      function NoteFile() {
        var file = document.querySelector('.file');
        this.file = function() {
          return file;
        };
      }
      return ($traceurRuntime.createClass)(NoteFile, {createNote: function() {
          this.file().addEventListener('click', function() {
            location.assign('../www/createFile.html');
          });
        }}, {});
    }();
    window.addEventListener("load", function() {
      if (new NoteFile().file()) {
        var file = new NoteFile();
        file.createNote();
        var getNotes = new GetNotes();
        getNotes.searchNote();
      }
    });
  }
  document.body.addEventListener("click", function(e) {
    var targetSrc = e.target;
    var noteNote;
    var noteTitle;
    var noteTime;
    if ((targetSrc.getAttribute("class") === "note-info") || (targetSrc.parentNode.getAttribute("class") === "note-info")) {
      if (targetSrc.className.toString().indexOf('fa-close') > 0) {
        var date = targetSrc.parentNode.querySelector(".note-date").textContent;
        var title = targetSrc.parentNode.querySelector(".note-title").textContent;
        var time = targetSrc.parentNode.querySelector(".note-time").textContent;
        window.localStorage.removeItem(("Title:" + title + "-" + date + "-" + time));
        targetSrc.parentNode.remove();
        if (!document.querySelector(".note-info")) {
          window.localStorage.removeItem("jsNote");
          location.assign("../www/index.html");
        }
        return false;
      } else if (targetSrc.className !== "note-info") {
        targetSrc = targetSrc.parentNode;
      }
      noteNote = targetSrc.querySelector(".note-note").textContent;
      noteTitle = targetSrc.querySelector(".note-title").textContent;
      noteTime = targetSrc.querySelector(".note-time").textContent;
      window.localStorage.setItem("Read:noteNote", noteNote);
      window.localStorage.setItem("Read:noteTitle", noteTitle);
      window.localStorage.setItem("Read:noteTime", noteTime);
      location.assign("../www/readnote.html");
    }
  });
  return {};
});
$traceurRuntime.getModule("../trace/app.js" + '');

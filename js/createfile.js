$traceurRuntime.registerModule("../trace/createfile.js", [], function() {
  "use strict";
  var __moduleName = "../trace/createfile.js";
  {
    var Save = function() {
      function Save() {
        var save = document.querySelector('.note-save');
        this.save = function() {
          return save;
        };
      }
      return ($traceurRuntime.createClass)(Save, {saveText: function() {
          this.save().addEventListener('click', function() {
            var textField = document.querySelector(".note-write-note");
            var noteTileNote = document.querySelector(".note-title-note");
            if (textField.textContent.length === 0 || ((noteTileNote.value.length === 0) || (noteTileNote.value.toLowerCase() === "add title"))) {
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
              return false;
            }
            {
              var note = textField.textContent;
              var date = new Date();
              var datestr = date.toLocaleDateString();
              var timestr = date.toLocaleTimeString();
              var title$__4 = noteTileNote.value;
              localStorage.setItem("jsNote", "jsNote");
              localStorage.setItem(("Title:" + title$__4 + "-" + datestr + "-" + timestr), note);
              location.assign("../index.html");
            }
          });
        }}, {});
    }();
    var Title = function() {
      function Title() {
        var title = document.querySelector(".note-title-note");
        var err = document.querySelector(".note-title-error");
        this.title = function() {
          return title;
        };
        this.err = function() {
          return err;
        };
      }
      return ($traceurRuntime.createClass)(Title, {editTitle: function() {
          var _this = this;
          this.title().addEventListener('click', function() {
            if (this.hasAttribute("readonly")) {
              if (this.value.length >= 20) {
                this.removeAttribute("readonly");
              }
            }
            this.parentNode.setAttribute('data-border', 'border-style');
          });
          this.title().addEventListener('keyup', function(e) {
            this.value = this.value.toUpperCase();
            if (this.value.length >= 20) {
              if (this.value.length !== 20) {
                this.value = this.value.slice(0, 20 - this.value.length);
              }
              if (e.keyCode !== 8) {
                _this.err().setAttribute("data-display", "displayError");
                setTimeout(function() {
                  _this.err().removeAttribute("data-display");
                }, 2000);
                this.setAttribute("readonly", "readonly");
              }
            }
            if (e.keyCode === 8) {
              if (this.hasAttribute("readonly")) {
                this.removeAttribute("readonly");
                this.value = this.value.slice(0, -1);
              }
            }
          });
        }}, {});
    }();
    var Cancel = function() {
      function Cancel() {
        var cancel = document.querySelector('.note-cancel');
        this.cancel = function() {
          return cancel;
        };
      }
      return ($traceurRuntime.createClass)(Cancel, {cancelNoteCreate: function() {
          this.cancel().addEventListener('click', function() {
            location.assign("../index.html");
          });
        }}, {});
    }();
    var save = new Save();
    save.saveText();
    var title = new Title();
    title.editTitle();
    var cancel = new Cancel();
    cancel.cancelNoteCreate();
  }
  return {};
});
$traceurRuntime.getModule("../trace/createfile.js" + '');

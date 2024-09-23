import Notes from "../script/data/notes.js";
import card from "../script/view/card.js";

class HeaderContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="header-content">
          <div class="input-container">
            <input type="text" id="search-input" class="search" placeholder="Search menu" />
            <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          </div>
          <button onclick="MegaDialog.showModal()" class="btn" id="btn-create">
            Create Note
            <i class="fa-solid fa-plus fa-lg" style="padding-left: 5px"></i>
          </button>
          <button class="btn" id="btn-archive" data-state="archive">
            Archive
            <i class="fa-solid fa-archive fa-lg" style="padding-left: 5px"></i>
          </button>
        </div>
      `;
  }
}

class NoteCard extends HTMLElement {
  set noteData(note) {
    const createdAt = moment(note.createdAt);
    this.innerHTML = `
        <div class="card">
          <h3 class="card-info_title">${note.title}</h3>
          <label class="card-info_date">${createdAt.format("dddd, DD MMMM YYYY")} | ${createdAt.format("HH:mm")}</label>
          <p class="card-info_body">${note.body}</p>
          <div class="btn-card">
            <button class="like-btn">
              <i class="fa fa-regular fa-heart fa-1x fa-hover-hidden"></i>
              <i class="fa fa-solid fa-heart fa-1x fa-hover-show"></i>
            </button>
            <div class="right-icon">
              <button class="archive-btn" id="card-archive">
                <i class="bi bi-box-arrow-in-down" style="font-size: 20px; padding-right:15px"></i>
              </button>
              <button class="trash-btn">
                <i class="bi bi-trash" style="font-size: 18px"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    this.querySelector(".trash-btn").addEventListener("click", () => {
      document.getElementById("confirmDeleteDialog").showModal();
      document.getElementById("confirm-delete-btn").dataset.id = note.id;
    });

    const archiveBtn = this.querySelector(".archive-btn");
    archiveBtn.addEventListener("click", async () => {
      if (document.getElementById("btn-archive").dataset.state === "back") {
        await Notes.unarchiveNote(note.id);
        card(true);
        // renderCards(filteredNotes.filter((n) => n.id !== note.id));
      } else {
        await Notes.archiveNote(note.id);
        card(false);
      }
      card();
    });
  }
}

class NoteDialog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <dialog class="show-dialog" id="MegaDialog" modal-mode="mega">
          <form method="dialog">
            <header class="header-dialog">
              <h3>Create note</h3>
              <button onclick="this.closest('dialog').close('close')">
                <i class="fa-solid fa-circle-xmark fa-xl"></i>
              </button>
            </header>
            <body class="body-form">
              <div class="form-group">
                <label for="input-title">Title</label>
                <input class="input" type="text" id="input-title" name="input-title" />
              </div>
              <div class="form-group">
                <label for="input-body">Note</label>
                <textarea class="input" name="input-body" id="input-body" rows="10"></textarea>
              </div>
              <menu class="menu-dialog">
                <button id="save-btn" class="btn" type="submit" value="save" style="width: 200px">
                  Save
                  <i class="fa-solid fa-check fa-xl" style="padding-left: 5px"></i>
                </button>
              </menu>
            </body>
          </form>
        </dialog>
      `;
  }
}

class NoteList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div id="noteListContainer" class="note-list-container">
          <div class="card-list" id="cardList">
            <div class="list"></div>
          </div>
        </div>
      `;
  }
}

class ConfirmDeleteDialog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <dialog id="confirmDeleteDialog">
          <form method="dialog">
            <header class="header-dialog">
              <h3>Confirm Delete</h3>
              <button onclick="this.closest('dialog').close('close')">
                <i class="fa-solid fa-circle-xmark fa-xl"></i>
              </button>
            </header>
            <p>Are you sure to delete this note?</p>
            <menu class="menu-dialog">
              <button class="btn" id="confirm-delete-btn" value="confirm" style="width: 100px">
                Yes
              </button>
              <button class="btn" type="button" onclick="document.getElementById('confirmDeleteDialog').close()" style="width: 100px">
                No
              </button>
            </menu>
          </form>
        </dialog>
      `;
  }
}

customElements.define("header-content", HeaderContent);
customElements.define("note-card", NoteCard);
customElements.define("note-dialog", NoteDialog);
customElements.define("note-list", NoteList);
customElements.define("confirm-delete-dialog", ConfirmDeleteDialog);

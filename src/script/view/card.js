import Notes from "../data/notes.js";

const card = async (showArchived = false) => {
  const searchInput = document.getElementById("search-input");
  const cardList = document.getElementById("cardList");
  const mainTitle = document.getElementById("main-title");
  const btnArchive = document.getElementById("btn-archive");
  const btnCreate = document.getElementById("btn-create");

  loading.style.display = "block";
  cardList.style.display = "none";

  let notes = showArchived
    ? await Notes.getArchivedNotes()
    : await Notes.getAll();
  notes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const renderCards = (filteredNotes) => {
    cardList.innerHTML = "";

    if (filteredNotes.length === 0) {
      cardList.innerHTML = showArchived
        ? "<label>Your archives are empty</label>"
        : "<label>Your notes are not found</label>";
    } else {
      filteredNotes.forEach((note) => {
        const noteCard = document.createElement("note-card");
        noteCard.noteData = note;
        if (showArchived) {
          const archiveBtn = noteCard.querySelector(".archive-btn");
          if (archiveBtn) {
            archiveBtn.innerHTML =
              '<i class="bi bi-box-arrow-up" style="font-size: 20px; padding-right:15px"></i>';
            archiveBtn.addEventListener("click", async () => {
              await Notes.unarchiveNote(note.id);
              renderCards(filteredNotes.filter((n) => n.id !== note.id));
              card(true);
            });
          }
        }
        cardList.appendChild(noteCard);

        gsap.from(noteCard, {
          duration: 1,
          opacity: 0,
          y: 60,
          delay: 0.1,
          ease: "power2.out",
        });
      });
    }
    loading.style.display = "none";
    cardList.style.display = "grid";
  };

  const searchNotes = (query) => {
    const filteredNotes = notes.filter((note) => {
      const title = note.title.toLowerCase();
      const body = note.body.toLowerCase();
      const queryLower = query.toLowerCase();
      return title.includes(queryLower) || body.includes(queryLower);
    });

    if (filteredNotes.length === 0) {
      cardList.innerHTML = "<label>Your notes are not found</label>";
    } else {
      renderCards(filteredNotes);
    }
  };

  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", async (e) => {
      const noteId = e.target.dataset.id;

      const loading = document.getElementById("loading");
      loading.style.display = "block";
      cardList.style.display = "none";
      try {
        await Notes.deleteNote(noteId);
        notes = notes.filter((note) => note.id !== noteId);
        renderCards(notes);
        document.getElementById("confirmDeleteDialog").close();
      } catch (error) {
        console.error("Error deleting note:", error);
      } finally {
        loading.style.display = "none";
        cardList.style.display = "grid";
      }
    });

  searchInput.addEventListener("input", (e) => {
    searchNotes(e.target.value);
  });

  if (btnArchive && !btnArchive.dataset.listenerAttached) {
    btnArchive.addEventListener("click", async () => {
      if (btnArchive.dataset.state === "archive") {
        mainTitle.textContent = "Your Archive";
        btnArchive.innerHTML =
          '<i class="fa-solid fa-arrow-left fa-lg" style="padding-right: 5px"></i> Back';
        btnArchive.dataset.state = "back";
        btnCreate.style.display = "none";
        card(true);
      } else if (btnArchive.dataset.state === "back") {
        mainTitle.textContent = "Your Notes";
        btnArchive.innerHTML =
          'Archive <i class="fa-solid fa-archive fa-lg" style="padding-left: 5px"></i>';
        btnArchive.dataset.state = "archive";
        btnCreate.style.display = "block";
        card(false);
      }
    });
    btnArchive.dataset.listenerAttached = true;
  }

  renderCards(notes);
};

document.addEventListener("DOMContentLoaded", () => {
  card();
});

export default card;

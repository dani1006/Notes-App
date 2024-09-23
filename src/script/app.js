import Notes from "../script/data/notes.js";
import card from "../script/view/card.js";
import "../view/component.js";
import "../style/style.css";

document.addEventListener("DOMContentLoaded", async () => {
  await card();

  const dialog = document.getElementById("MegaDialog");
  const form = document.querySelector("form");

  const titleInput = document.getElementById("input-title");
  const bodyInput = document.getElementById("input-body");
  const errorMessage = document.createElement("div");
  errorMessage.style.color = "red";
  errorMessage.style.display = "none";
  form.appendChild(errorMessage);

  const validateInputs = () => {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title || !body) {
      errorMessage.textContent = "Title and Note must be filled in";
      errorMessage.style.display = "block";
      return false;
    }
    errorMessage.style.display = "none";
    return true;
  };

  titleInput.addEventListener("input", validateInputs);
  bodyInput.addEventListener("input", validateInputs);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    await Notes.createNote({ title, body });
    await card();

    titleInput.value = "";
    bodyInput.value = "";

    dialog.close();
  });
});

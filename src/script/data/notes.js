const BASE_URL = "https://notes-api.dicoding.dev/v2";

class Notes {
  static async getAll() {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        return result.data;
      } else {
        console.error("Failed to fetch notes:", result.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Failed to load notes. Please try again later.");
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        return result.data;
      } else {
        console.error("Failed to fetch archive notes:", result.message);
      }
    } catch (error) {
      console.error("Error fetching  archive notes:", error);
      alert("Failed to load archive notes. Please try again later.");
    }
  }

  static async createNote({ title, body }) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      const result = await response.json();
      if (response.ok) {
        return result.data;
      } else {
        console.error("Failed to create note:", result.message);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create notes. Please try again later.");
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        return result.message;
      } else {
        console.error("Failed to delete note:", result.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete notes. Please try again later.");
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: "POST",
      });
      const result = await response.json();
      if (response.ok) {
        return result.message;
      } else {
        console.error("Failed to archive note:", result.message);
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      alert("Failed to archive notes. Please try again later.");
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
      });
      const result = await response.json();
      if (response.ok) {
        return result.message;
      } else {
        console.error("Failed to unarchive note:", result.message);
      }
    } catch (error) {
      console.error("Error unarchiving note:", error);
      alert("Failed to unarchive. Please try again later.");
    }
  }
}

export default Notes;

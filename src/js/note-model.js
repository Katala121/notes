import uuid from './utils/uuid';

const createEmptyNote = () => ({
  id: uuid(),
  text: '#Новая заметка',
});

class NoteModel {
  constructor() {
    // this.notes = [];
    // localStorage.setItem('notes', JSON.stringify([]));

    // this.selectedItemId = null;
    // localStorage.setItem('currentNote', JSON.stringify(null));
  }

  get notes() {
    return JSON.parse(localStorage.getItem('notes'));
  }

  get SelectedItemId() {
    return JSON.parse(localStorage.getItem('currentNote'));
  }

  set SelectedItemId(id) {
    localStorage.setItem('currentNote', JSON.stringify(id));
  }

  /**
   * Create note
   *
   * @returns {{ id: string; text: string; }}
   */
  create() {
    const newNote = createEmptyNote();
    let localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    localStorageNotes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(localStorageNotes));

    // this.notes.unshift(newNote);

    return newNote;
  }

  /**
   * Update note
   * 
   * @param {{ id: string; text: string; }} note 
   */
  update(note) {
    let localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    localStorageNotes = localStorageNotes.map((item) => (item.id === note.id ? note : item));
    localStorage.setItem('notes', JSON.stringify(localStorageNotes));
    // this.notes = this.notes.map((item) => (item.id === note.id ? note : item));
  }


  /**
   * Remove note
   * 
   * @param {{ id: string; text: string; }} note 
   */
  remove(note) {
    let localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    const noteIndex = localStorageNotes.findIndex((item) => (item.id === note.id));
    localStorageNotes.splice(noteIndex, 1);
    if(localStorageNotes.length == 0) {
      localStorageNotes.unshift(createEmptyNote());
    }
    localStorage.setItem('notes', JSON.stringify(localStorageNotes));
    // const noteIndex = this.notes.findIndex((item) => (item.id === note.id));

    // this.notes.splice(noteIndex, 1);
  }


  /**
   * Load notes
   *
   * @returns {Array.<{id: string; text: string;}>}
   */
  load() {
    let localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    if( localStorageNotes == undefined) {
      localStorage.setItem('notes', JSON.stringify([]));      
      localStorageNotes = JSON.parse(localStorage.getItem('notes'));
      let emptyNote = createEmptyNote();
      localStorageNotes.unshift(emptyNote);
      localStorage.setItem('notes', JSON.stringify(localStorageNotes));
      localStorage.setItem('currentNote', JSON.stringify(emptyNote.id));
    }
    // this.notes.unshift(createEmptyNote());

    return localStorageNotes;
  }

}

export default NoteModel;

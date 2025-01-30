```mermaid
flowchart LR
    A[Form submitted in Browser] --> |Prevent defaulting| B[Create new note variable]
    B --> D[Push new note variable to the notes array]
    D --> E[Redraw html using reDrawNotes]
    E --> F[Browser send data to Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa/]

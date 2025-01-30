```mermaid
flowchart LR
    A[Form submitted in Browser] --> |Prevent defaulting| B[Create new note based on defaulting]
    B --> C[Create new note variable]
    C --> D[Push new note variable to the notes array]
    D --> E[Redraw html using reDrawNotes()]
    E --> F(Browser --> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa/)

    Note right of F: Updates database with the new note added, but does not need to request back information. The new addition is locally stored immediately.

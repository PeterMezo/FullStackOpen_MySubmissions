```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>asd
  
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: URL redirect /notes
    deactivate server

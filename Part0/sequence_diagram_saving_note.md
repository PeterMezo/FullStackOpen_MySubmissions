```mermaid
savingNoteSequence
    participant browser
    participant server
  
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: URL redirect /notes
    deactivate server
  
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
  
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server
  
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server
  
     Note right of browser: browser executes JS and gets JSON
  
     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
     activate server
     server-->>browser: DATA.JSON file (Object i{content:``, date:``}
     deactivate server
  
     Note right of browser: JS renders the data accordingly
  

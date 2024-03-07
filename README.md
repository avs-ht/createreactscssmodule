
# Create React Style Module
This extension allows you to create modular styles for .tsx and .jsx files

### Author - [@r0bch4k](https://t.me/r0bch4k) 

## Features
- Added 2 buttons to explorer context menu for .tsx/.jsx files: 
    - Add SCSS module
    - Add CSS module
- Config:
    - startOfStyle (default: "styles") - this setting is needed while browsing the file for styles, to then add them to the style file. Also this setting is needed for hotkeys 
- Hotkeys:
    - Ctrl/cmd + U - Add a construct such as "className={startOfStyle.$0}"
    - Ctrl/cmd + K - Add a construct such as "className={startOfStyle["$0"]}"
    - $0 - cursor position
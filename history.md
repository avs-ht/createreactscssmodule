# v1.0
- Added 2 buttons to explorer context menu for .tsx/.jsx files: 
    - Add SCSS module
    - Add CSS module
- Config:
    - startOfStyle (default: "styles") - this setting is needed while browsing the file for styles, to then add them to the style file. Also this setting is needed for hotkeys 
- Hotkeys:
    - Ctrl/cmd + Q - Adds a construct such as "className={yourStartOfStyle.$0}" and moves the cursor to $0

# v1.1
- Hotkeys:
    - Ctrl/cmd + U - Add a construct such as "className={startOfStyle.$0}"
    - Ctrl/cmd + K - Add a construct such as "className={startOfStyle["$0"]}"
- Fix:
    - Removed repetition of the same names
    - In addition to startOfStyle.className, the startOfStyle["className"] construct has been added
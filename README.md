# Twitch Fullscreen Chat Extension
Adds a chat overlay to fullscreen window in Twitch.
![Fullscreen example](https://github.com/exploder2013/TwitchFullscreenChat/blob/master/fullscreen_example.PNG)

# Supported browsers
  * Chrome

# What does it do
- The extension adds a small button on bottom of the Twitch player which goes into fullscreen mode with chat.
- If the user exits the fullscreen mode, the chat is automatically removed from the player.
- Ability to move/resize the window.
- Automatically loaded whenever user goes to a new streamer.
- Dragging/resizing ability (transparent bar on top of the chat to drag around).
- Fixes the bug with Twitch player where your mouse cursor doesn't dissaper after some time (in both fullscreen/windowed). 

# How to use
- If installed correctly, click the "FS"(transparent) button on bottom right corner to go fullscreen with chat. 
- All other Twitch buttons will retain their default functionality.
![Button example](https://github.com/exploder2013/TwitchFullscreenChat/blob/master/fullscreen_button.PNG)

# How to install manually (chrome extension)

* Using as a Tampermonkey script
- ![Navigate to the Tampermonkey branch on this repo](https://github.com/exploder2013/TwitchFullscreenChat/tree/tampermonkey).
- Get Tampermonkey Chrome extension.
- Once installed, navigate to Tampermonkeys dashboard by using its extension icon in Chrome.
- Click the '+' button to the left of 'Installed userscripts' button on the upper right side.
- Copy&paste chat_fullscreen.js inside the editor and press Ctrl+S.
- The script should be added and should work.

* Using as a Chrome Extension (not recommeneded, unless you're using Chrome Developer/Canary)
- Download all files and put them into same folder.
- Go to chrome://extensions/ then tick "Developer mode" in the top right corner.
- Click the "Load unpacked extension..." button in the top left and select the folder you moved all files into.
- The extension should now be installed. Check if you see the button on Twitch player.

# Initial credits
- peluche (https://github.com/peluche/twitch-chat-overlay) for initial/simplified version.

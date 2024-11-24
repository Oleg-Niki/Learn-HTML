/* General Styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: url('win98-bg.png') no-repeat center center fixed;
  background-size: cover;
  color: #000;
}

/* Desktop Icon Styles */
#desktop {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: flex-start; /* Align icons to the left */
  gap: 20px; /* Add space between the icons */
  padding: 20px;
  position: relative;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 80px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.desktop-icon img {
  width: 64px;
  height: 64px;
  margin-bottom: 5px;
}

.desktop-icon p {
  font-size: 14px;
  margin: 0;
}

.desktop-icon:hover {
  transform: scale(1.1);
}

/* Taskbar Styles */
#taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, #245DDA, #245DDA); /* XP-like gradient */
  border-top: 2px solid #5a6988;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.5);
  z-index: 100;
}
/* Start Button */
#start-button {
  width: 120px; /* Adjust based on your image dimensions */
  height: 100px; /* Adjust based on your image dimensions */
  background: url('start-xp-icon.png') no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 5px;
  transition: transform 0.2s ease-in-out;
}

#start-button:hover {
  transform: scale(1.15); /* Slight zoom effect on hover */
}

#start-button:active {
  transform: scale(0.95); /* Pressed effect */
}
#start-button::after {
  content: "Start";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-family: 'Tahoma', sans-serif;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 5px;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

#start-button:hover::after {
  opacity: 1;
}

/* Start Menu */
#start-menu {
  position: fixed;
  bottom: 60px;
  left: 10px;
  width: 200px;
  background: #f0f0f0;
  border: 2px solid #3e7bb6;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  z-index: 200;
}
#taskbar-clock {
  margin-left: auto;
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  color: #ffffff; /* White for XP */
  text-shadow: 1px 1px 0 #2b4f7b; /* Subtle shadow for XP feel */
  padding-right: 27px;
}


#start-menu ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}

#start-menu li {
  padding: 5px 10px;
}

#start-menu li button {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  color: #000;
  font-family: 'Tahoma', sans-serif;
  transition: background 0.2s ease;
}

#start-menu li button:hover {
  background: #cce5f6;
}

/* Main Content Styles */
#main-content {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 60%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #2b4f7b; /* XP-style border color */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 10;
  overflow-y: auto;
}

.hidden {
  display: none;
}
#window-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(to bottom, #4a76a8, #35679a); /* XP gradient */
  color: white; /* Text color */
  padding: 5px;
  border-bottom: 2px solid #2b4f7b; /* Match the XP border color */
}

#window-controls button {
  width: 25px;
  height: 25px;
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  text-align: center;
  background: #e0e0e0;
  border: 1px solid #808080;
  cursor: pointer;
  margin: 0 2px;
  transition: background 0.2s ease-in-out, transform 0.1s ease-in-out;
}

#window-controls button:hover {
  background: #d0d0d0;
}

#window-controls button:active {
  transform: translateY(1px);
  background: #c0c0c0;
}

#minimized-windows {
  display: flex;
  flex-direction: row; /* Align minimized windows horizontally */
  gap: 5px; /* Space between minimized windows */
  max-width: 50%; /* Limit the width of the minimized windows container */
  overflow-x: auto; /* Add horizontal scroll if items overflow */
  padding: 0 10px;
}

.taskbar-item {
  background: #bfcde0;
  border: 1px solid #808080;
  padding: 5px 10px;
  color: black;
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
}

.taskbar-item:hover {
  background: #d0d0d0;
}

/* Popup Games Window */
#popup-games {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.9); /* Simulate a folder window background */
  border: 2px solid #808080;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

#popup-games.hidden {
  display: none;
}

/* Window Controls */
#window-controls {
  display: flex;
  justify-content: flex-end;
  background: #245DDA;
  padding: 5px;
  border-bottom: 1px solid #808080;
}

#window-controls button {
  width: 25px;
  height: 25px;
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  text-align: center;
  background: #e0e0e0;
  border: 1px solid #808080;
  cursor: pointer;
  margin: 0 2px;
  transition: background 0.2s ease-in-out, transform 0.1s ease-in-out;
}

#window-controls button:hover {
  background: #d0d0d0;
}

#window-controls button:active {
  transform: translateY(1px);
  background: #c0c0c0;
}

/* Games Folder Content */
#games-folder {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

.game-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 80px;
  text-align: center;
  cursor: pointer;
}

.game-icon img {
  width: 48px;
  height: 48px;
  margin-bottom: 5px;
}

.game-icon p {
  font-size: 12px;
  margin: 0;
  color: black;
}

.game-icon:hover img {
  transform: scale(1.1);
  transition: transform 0.2s;
}
.game-icon img:hover {
  filter: brightness(1.2);
}

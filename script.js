function toggleStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.classList.toggle('hidden');
}

function navigate(page) {
  const contentArea = document.getElementById('window-content'); // Target the content area inside the window
  const mainContent = document.getElementById('main-content');
  const startMenu = document.getElementById('start-menu');
  
  startMenu.classList.add('hidden');
  mainContent.classList.remove('hidden');

  switch (page) {
    case 'about':
      contentArea.innerHTML = `
        <h1>About Me</h1>
        <p>Highly skilled Project Engineer with experience...</p>
      `;
      break;
    case 'gallery':
      contentArea.innerHTML = `
        <h1>Project Gallery</h1>
        <p>Details about projects...</p>
      `;
      break;
    case 'contact':
      contentArea.innerHTML = `
        <h1>Contact</h1>
        <p>Email: <a href="mailto:oleg@oleg-nik.com">oleg@oleg-nik.com</a></p>
      `;
      break;
  }
}

function toggleGames() {
  const popup = document.getElementById('popup-games');
  popup.classList.toggle('hidden');
}
setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;
  document.getElementById('taskbar-clock').textContent = formattedTime;
}, 1000);

let isWindowMinimized = false; // Track window state

// Function to minimize the window
function minimizeWindow() {
  const mainContent = document.getElementById('main-content');
  const minimizedWindows = document.getElementById('minimized-windows');

  // Hide the window
  mainContent.classList.add('hidden');

  // Add a taskbar item for the minimized window
  if (!isWindowMinimized) {
    const taskbarItem = document.createElement('div');
    taskbarItem.classList.add('taskbar-item');
    taskbarItem.innerHTML = `
      <img src="window-icon.png" alt="Window Icon" style="width:16px; height:16px; margin-right:5px;"> 
      Window
    `; // Add icon and text
    taskbarItem.onclick = () => {
      // Restore the window when the taskbar item is clicked
      mainContent.classList.remove('hidden');
      taskbarItem.remove();
      isWindowMinimized = false;
    };
    minimizedWindows.appendChild(taskbarItem);
    isWindowMinimized = true;
  }
}

// Function to close the window
function closeWindow() {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.add('hidden');
  isWindowMinimized = false; // Reset minimized state
}

let isMaximized = false;

function toggleMaximize() {
  const mainContent = document.getElementById('main-content');
  if (isMaximized) {
    mainContent.style.width = '70%';
    mainContent.style.height = '60%';
    isMaximized = false;
  } else {
    mainContent.style.width = '100%';
    mainContent.style.height = '100%';
    isMaximized = true;
  }
}

// Ensure the game window is hidden on page load
document.addEventListener('DOMContentLoaded', () => {
  const popupGames = document.getElementById('popup-games');
  popupGames.classList.add('hidden'); // Hide games window by default
});

// Toggle Start Menu
function toggleStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.classList.toggle('hidden');
}

// Navigate to Different Pages
function navigate(page) {
  const contentArea = document.getElementById('window-content'); // Target content area
  const mainContent = document.getElementById('main-content');
  const startMenu = document.getElementById('start-menu'); // Close Start Menu
  startMenu.classList.add('hidden'); // Ensure Start Menu closes
  mainContent.classList.remove('hidden'); // Show main content window

  // Load content dynamically based on the selected page
  switch (page) {
    case 'about':
      contentArea.innerHTML = `
        <h1>About Me</h1>
        <p>Hello! My name is Oleg Nikitashin. I am a second-year STEM student at the College of San Mateo, pursuing a career that blends mechanical engineering, robotics, and software development. I hold a bachelor’s degree in computer science with a focus on local area network hardware and a master’s degree in computer science specializing in software for economics. These qualifications, combined with my practical experience, enable me to tackle interdisciplinary challenges with a unique perspective.

My diverse experience includes co-founding an auto parts business, managing construction projects, and excelling in competitive motorsport as a race car designer, engineer, and champion. As the treasurer of the CSM Robotics Club, I’ve spearheaded projects such as building AI-driven robotics systems for waste management and designing interactive exhibits to educate about clean energy.

I am passionate about advancing sustainability and technology by bridging disciplines and delivering innovative solutions to real-world problems. With a proven track record of leadership and technical expertise, I am dedicated to driving impactful results in dynamic environments.</p>
      `;
      break;

    case 'gallery':
      contentArea.innerHTML = `
        <h1>Project Gallery</h1>
        <p>Here you can find my project images and descriptions...</p>
      `;
      break;

    case 'contact':
      contentArea.innerHTML = `
        <h1>Contact</h1>
        <p>Email: <a href="mailto:oleg@oleg-nik.com">oleg@oleg-nik.com</a></p>
        <p>Phone: +1-650-123-4567</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/oleg-nikitashin-2b038a20a/" target="_blank">linkedin.com/in/oleg-nikitashin</a></p>
      `;
      break;

    default:
      contentArea.innerHTML = `<p>Page not found!</p>`;
  }
}

// Toggle Popup Games Menu
function toggleGames() {
  const popupGames = document.getElementById('popup-games');
  popupGames.classList.toggle('hidden'); // Toggle the hidden class
}

// Close the Popup Games Menu
function closeGames() {
  const popupGames = document.getElementById('popup-games');
  popupGames.classList.add('hidden'); // Add the hidden class
}

// Update Taskbar Clock Every Second
setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;
  document.getElementById('taskbar-clock').textContent = formattedTime;
}, 1000);

// Minimize, Maximize, and Close Functionality
let isWindowMinimized = false; // Track window state
let isMaximized = false; // Track maximize state

// Minimize Window
function minimizeWindow() {
  const mainContent = document.getElementById('main-content');
  const minimizedWindows = document.getElementById('minimized-windows');

  // Hide the main content window
  mainContent.classList.add('hidden');

  // Add a taskbar item for the minimized window
  if (!isWindowMinimized) {
    const taskbarItem = document.createElement('div');
    taskbarItem.classList.add('taskbar-item');
    taskbarItem.textContent = 'Window'; // Display name of the window
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

// Maximize/Restore Window
function toggleMaximize() {
  const mainContent = document.getElementById('main-content');
  if (isMaximized) {
    // Restore to default size and position
    mainContent.style.width = '70%';
    mainContent.style.height = '60%';
    mainContent.style.top = '100px';
    mainContent.style.left = '50%';
    mainContent.style.transform = 'translateX(-50%)';
    isMaximized = false;
  } else {
    // Maximize to full screen
    mainContent.style.width = '100%';
    mainContent.style.height = '100%';
    mainContent.style.top = '0';
    mainContent.style.left = '0';
    mainContent.style.transform = 'none';
    isMaximized = true;
  }
}

// Close Window
function closeWindow() {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.add('hidden'); // Hide the main content window
  isWindowMinimized = false; // Reset minimized state
}

import { data } from "./data.js";

window.addEventListener("load", function () {
  dizme_tm_my_load();
});

window.addEventListener("scroll", function () {
  dizme_tm_progress_line();
});

const index = {};

index.menu = document.querySelector("#sideMenu");
index.navItems = document.querySelectorAll(".navItem");
index.navItemNames = document.querySelectorAll(".navItemName");
index.home = document.querySelector("#home");
index.about = document.querySelector("#about");
index.skills = document.querySelector("#skills");
index.works = document.querySelector("#works");
index.contact = document.querySelector("#contact");
index.menuButton = document.querySelector("#menuButton");
index.scrollDown = document.querySelector("#scrollDown");
index.isOpen = false;

// Scroll function
index.scroll = function (target) {
  window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth",
  });
};

// Menu button function
index.showHideMenu = function () {
  index.menu.classList.toggle("sideMenuHide");
  index.menu.classList.toggle("sideMenuShow");
  index.isOpen = !index.isOpen;
};

// Mobile class changes on initial load
if (window.innerWidth <= 990) {
  index.menu.classList.add("sideMenuHide");
  index.menu.classList.remove("sideMenuShow");
  index.scrollDown.style.display = "none";
}

index.eventListeners = function () {
  // when window resizes between large and small displays
  window.addEventListener("resize", function () {
    if (window.innerWidth > 990) {
      index.menu.classList.remove("sideMenuHide");
      index.menu.classList.add("sideMenuShow");
      index.scrollDown.style.display = "block";
      index.isOpen = false;
    } else {
      index.menu.classList.remove("sideMenuShow");
      index.menu.classList.add("sideMenuHide");
      index.scrollDown.style.display = "none";
      index.isOpen = false;
    }
  });

  // Nav menu click events for scroll function
  index.navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute("href"));
      if (target) {
        index.scroll(target);
      }
    });
  });

  // Menu button click event
  index.menuButton.addEventListener("click", index.showHideMenu);

  // Hide menu when clicking a link
  index.navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (index.isOpen) {
        index.showHideMenu();
      }
    });
  });

  // Menu button ENTER key event
  index.menuButton.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      index.showHideMenu();
    }
  });
};

// init method
index.init = function () {
  index.eventListeners();
};

// Document Ready
document.addEventListener("DOMContentLoaded", function () {
  index.init();
});

// Preloader
function dizme_tm_my_load() {
  var speed = 500;
  setTimeout(function () {
    dizme_tm_preloader();
  }, speed);
}

function dizme_tm_preloader() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );
  var preloader = document.querySelector("#preloader");
  if (!isMobile) {
    setTimeout(function () {
      preloader.classList.add("preloaded");
    }, 800);
    setTimeout(function () {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}

function dizme_tm_progress_line() {
  var line = document.querySelector(".progressbar .line");
  var documentHeight = document.documentElement.scrollHeight;
  var windowHeight = window.innerHeight;
  var winScroll = window.pageYOffset;
  var value = (winScroll / (documentHeight - windowHeight)) * 100;
  var position = value;
  // line.style.height = position + "%";
}

let projects = document.querySelector(".worksContainer");
data.forEach(function (project) {
  let workBox = document.createElement("article");
  workBox.className = "workBox";

  let workImageContainer = document.createElement("div");
  workImageContainer.className = "workImageContainer";
  let image = document.createElement("img");
  image.src = project.img;
  image.alt = "netlify.";
  workImageContainer.appendChild(image);

  let workDescribeContainer = document.createElement("div");
  workDescribeContainer.className = "workDescribeContainer";
  let heading = document.createElement("h3");
  heading.textContent = project.name;
  let technologies = document.createElement("h4");
  technologies.innerHTML = `Technologies Used: <span class="techStack">${project.technology}</span>`;

  let ul = document.createElement("ul");
  project.info.forEach(function (info) {
    let li = document.createElement("li");
    li.textContent = info;
    ul.appendChild(li);
  });

  let workLinks = document.createElement("div");
  workLinks.className = "workLinks";
  let liveLink = document.createElement("a");
  liveLink.href = project.live;
  liveLink.target = "_blank";
  liveLink.rel = "noopener noreferrer";
  liveLink.textContent = "Live";
  let repoLink = document.createElement("a");
  repoLink.href = project.repo;
  repoLink.target = "_blank";
  repoLink.rel = "noopener noreferrer";
  repoLink.textContent = "Repo";

  workLinks.appendChild(liveLink);
  workLinks.appendChild(repoLink);

  workDescribeContainer.appendChild(heading);
  workDescribeContainer.appendChild(technologies);
  workDescribeContainer.appendChild(ul);
  workDescribeContainer.appendChild(workLinks);

  workBox.appendChild(workImageContainer);
  workBox.appendChild(workDescribeContainer);

  projects.appendChild(workBox);
});

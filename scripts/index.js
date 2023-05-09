import { data } from "./data.js";
  
  jQuery(window).load('body', function () {
      dizme_tm_my_load();
  });
  jQuery(window).on('scroll', function () {
      dizme_tm_progress_line();
  });


const index = {};



index.$menu = $('sideMenu');
index.$navItem = $('.navItem');
index.$navItemName = $('.navItemName')
index.$home = $('home');
index.$about=$('about');
index.$skills = $('skills');
index.$works = $('works');
index.$contact = $('contact');
index.$menuButton = $('menuButton');
index.$scrollDown = $('scrollDown');
index.isOpen = false;

// Scroll function
index.scroll = function(target) {
  $('html,body').animate({ scrollTop: $(target).offset().top }, 500);
}

// Menu button function
index.showHideMenu = function() {
  index.$menu.toggleClass('sideMenuHide sideMenuShow');
  index.isOpen = !index.isOpen;
}

// Mobile class changes on initial load
if ($(window).width() <= 990) {
  index.$menu.addClass('sideMenuHide').removeClass('sideMenuShow');
  index.$scrollDown.hide();
}

index.eventListeners = function() {
  // when windox resizes between large and small displayes
  $(window).on('resize', function() {
    if ($(window).width() > 990) {
      index.$menu.removeClass('sideMenuHide').addClass('sideMenuShow')
      index.$scrollDown.show();
      index.isOpen= false;
    } else {
      index.$menu.removeClass('sideMenuShow').addClass('sideMenuHide');
      index.isOpen = false;
      index.$scrollDown.hide();
    }
  });

  // Nav menu click events for scroll function
  $('a[href*=\\#]').on('click', function () {
    index.scroll(this.hash);
  });

  // Menu button click event
  index.$menuButton.on('click', index.showHideMenu);

  // Hide menu when clicking a link
  index.$navItem.on('click', function() {
    if (index.isOpen) {// Hide menu when clicking a link
      index.showHideMenu();
    }
  });

  // Menu button ENTER key event
  index.$menuButton.on('keypress', function(e){
    if (e.which === 13) {
      $(this).trigger('click');
    }
  })
}

// init method
index.init = function() {
  index.eventListeners();
}

// Document Ready
$(function() {
  index.init();
})


// Preloader
function dizme_tm_my_load() {
  "use strict";
  var speed = 500;
  setTimeout(function () {
      dizme_tm_preloader();
  }, speed);
}

function dizme_tm_preloader() {
  "use strict";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
  var preloader = $('#preloader');
  if (!isMobile) {
      setTimeout(function () {
          preloader.addClass('preloaded');
      }, 800);
      setTimeout(function () {
          preloader.remove();
      }, 2000);
  } else {
      preloader.remove();
  }
}



function dizme_tm_progress_line() {
  "use strict";
  var line = jQuery('.progressbar .line');
  var documentHeight = jQuery(document).height();
  var windowHeight = jQuery(window).height();
  var winScroll = jQuery(window).scrollTop();
  var value = (winScroll / (documentHeight - windowHeight)) * 100;
  var position = value;
  line.css('height', position + "%");
}

let projects = document.querySelector('.worksContainer')
let showProjects  = data.map(project=>{
  projects.innerHTML +=`<article class="workBox">
  <div class="workImageContainer">
    <img src=${project.img} alt="netlify.">
  </div>
  <div class="workDescribeContainer">
    <h3>${project.name}</h3>
    <h4>Technologies Used: <span class="techStack">${project.technology}</span>

    </h4>
    <ul>
      ${(() => {
        let list = '';
        for (let i = 0; i < project.info.length; i++) {
          list += `<li>${project.info[i]}</li>`;
        }
        return list;
      })()}
      

    </ul>
    <div class="workLinks">
      <a href=${project.live} class="liveLink" target="_blank"
        rel="noopener noreferrer">Live</a>
      <a href=${project.repo} class="repoLink" target="_blank"
        rel="noopener noreferrer">Repo</a>
    </div>
  </div>
</article>`

})


  




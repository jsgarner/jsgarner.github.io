$(document).ready(function () {
      function applyColors($link) {
        const bgColor = $link.data('color') || '';
        const textColor = $link.data('text') || '';
        $link.css({
          'background-color': bgColor,
          'color': textColor
        });
      }
      function resetColors($link) {
        $link.css({
          'background-color': '',
          'color': ''
        });
      }
      function activateTab($link) {
        const tabId = $link.data('tab');
        // Reset all tab links
        $('.tab_link, .tab_link-menu')
          .removeClass('active')
          .each(function () {
            resetColors($(this));
          });
        // Reset all tab contents
        $('.tab_content').removeClass('active');
        // Activate the clicked tab link
        $link.addClass('active');
        applyColors($link);
        // Activate matching tab content
        $('.tab_content[data-tab="' + tabId + '"]').addClass('active');
        // Also activate the other corresponding tab link
        const $matchingLinks = $('.tab_link[data-tab="' + tabId + '"], .tab_link-menu[data-tab="' + tabId + '"]').not($link);
$matchingLinks.addClass('active').each(function () {
  applyColors($(this));
});

        // Close Webflow mobile nav if open
        const $navMenu = $('.w-nav-menu');
        const $navButton = $('.w-nav-button');
        if ($navMenu.hasClass('w--open') && $navButton.length) {
          $navButton.click();
        }
      }
      // Click handler for all tab links
      $('.tab_link, .tab_link-menu, .w-layout-cell.link').on('click', function (e) {
        e.preventDefault();
        activateTab($(this));
      });
      // Hover effect for all tab links
      $('.tab_link, .tab_link-menu').hover(
        function () {
          if (!$(this).hasClass('active')) {
            applyColors($(this));
          }
        },
        function () {
          if (!$(this).hasClass('active')) {
            resetColors($(this));
          }
        }
      );
      // Initialize colors for the tab marked active on load
      $('.tab_link.active, .tab_link-menu.active').each(function () {
        applyColors($(this));
      });
    
      // Fine-tuning the mobile menu
      const menuIcon = document.getElementById('menuIcon');
      const navButton = document.querySelector('.w-nav-button');
      const menuLinks = document.querySelectorAll('.tab_link-menu');

      // Handle menu button clicks
      if (menuIcon && navButton) {
        navButton.addEventListener('click', function () {
          menuIcon.src = this.classList.contains('w--open')
            ? 'images/Icon-chevron-down.svg'
            : 'images/Icon-chevron-up.svg';
        });
      }
      // Handle menu link clicks
      menuLinks.forEach(link => {
        link.addEventListener('click', function () {
          menuIcon.src = 'images/Icon-chevron-down.svg';
        });
      });

      // Encourage browsers to hide the address bar
      window.addEventListener("load", function () {
        setTimeout(function () {
          window.scrollTo(0, 1);
        }, 0);
      });
    
      // Add keyboard navigation
  $(document).on('keydown', function(e) {
    // Only handle keyboard nav when a tab link has focus
    const $focused = $(':focus');
    if (!$focused.hasClass('tab_link') && !$focused.hasClass('tab_link-menu')) return;

    const $allTabs = $('.tab_link, .tab_link-menu');
    const currentIndex = $allTabs.index($focused);
    let $targetTab;

    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        $targetTab = $allTabs.eq((currentIndex + 1) % $allTabs.length);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        $targetTab = $allTabs.eq(currentIndex - 1 >= 0 ? currentIndex - 1 : $allTabs.length - 1);
        break;
      case 'Home':
        e.preventDefault();
        $targetTab = $allTabs.first();
        break;
      case 'End':
        e.preventDefault();
        $targetTab = $allTabs.last();
        break;
      default:
        return;
    }

    if ($targetTab && $targetTab.length) {
      $targetTab.focus();
      $targetTab.click(); // Use existing click handler
    }
  });

  // Make tabs focusable
  $('.tab_link, .tab_link-menu').attr('tabindex', '0');
    });
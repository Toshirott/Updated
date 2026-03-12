document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic (Global for dashboard config-tabs)
    const tabGroups = document.querySelectorAll('.config-tabs');
    
    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('.tab');
        
        // Find adjacent config-panes (assuming they follow the tab group in container)
        // A better approach is tying them via data-target, but here we can just use index
        // if they are inside a common parent with the tabs. 
        // Or simply finding all .config-pane within the same parent/main container.
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                // Remove active from all tabs in this group
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Find panes. Try to find local panes first
                // Easiest robust way without adding data-targets to all HTML:
                // Find all closest panes. Let's assume all .config-pane siblings after the group
                const container = group.parentElement;
                const panes = container.querySelectorAll('.config-pane');
                
                if(panes.length > 0) {
                    panes.forEach(p => p.style.display = 'none');
                    if(panes[index]) {
                        panes[index].style.display = 'block';
                    }
                }
            });
        });
    });

    // Search button interaction
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if(query) {
                alert(`Searching for: ${query} \n(This is a UI clone demonstration)`);
            } else {
                alert('Please enter a location to search.');
                searchInput.focus();
            }
        });
    }

    // Contact button interaction
    const contactBtns = document.querySelectorAll('.btn-contact');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.listing-card');
            if (card) {
                const addressEl = card.querySelector('.listing-address');
                if (addressEl) {
                    alert(`Contacting property at: ${addressEl.innerText}`);
                }
            }
        });
    });
});

    // Enhanced Search Button for index.html to redirect to search-results.html
    const heroBtnSearch = document.querySelector('.hero .btn-search');
    if (heroBtnSearch) {
        // Remove previous alert listener by cloning or overriding it
        heroBtnSearch.replaceWith(heroBtnSearch.cloneNode(true));
        const newHeroBtnSearch = document.querySelector('.hero .btn-search');
        
        newHeroBtnSearch.addEventListener('click', () => {
             const input = document.querySelector('.hero .search-input');
             const query = input.value.trim();
             if(query) {
                  window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
             } else {
                  // Default to near me
                  window.location.href = 'search-results.html';
             }
        });
    }

    // Favorite heart toggle
    const favButtons = document.querySelectorAll('.btn-favorite');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#ff385c';
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = ''; // reset
            }
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    // Global Sidebar Menu Toggle
    const menuToggleBtns = document.querySelectorAll('.menu-toggle-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const sideMenu = document.getElementById('globalSideMenu');
    const overlay = document.getElementById('globalMenuOverlay');

    function openMenu() {
        if(sideMenu && overlay) {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeMenu() {
        if(sideMenu && overlay) {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    menuToggleBtns.forEach(btn => btn.addEventListener('click', openMenu));
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);
});

document.addEventListener('DOMContentLoaded', () => {
    // Advanced Filters Modal Logic
    const filtersModalOverlay = document.getElementById('filtersModalOverlay');
    const allFiltersBtn = document.getElementById('allFiltersBtn');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    function openFilters() {
        if(filtersModalOverlay) filtersModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFilters() {
        if(filtersModalOverlay) filtersModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(allFiltersBtn) allFiltersBtn.addEventListener('click', openFilters);
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeFilters);
    if(filtersModalOverlay) {
        filtersModalOverlay.addEventListener('click', (e) => {
            if(e.target === filtersModalOverlay) closeFilters(); // close when clicking outside
        });
    }

    // Interactive Pills
    const pillGroups = document.querySelectorAll('.pill-group');
    pillGroups.forEach(group => {
        const pills = group.querySelectorAll('.pill-btn');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                // If it's a single-select group (like rating or beds), remove from others
                // For multi-select (like property type), toggle
                // Let's implement multi-select logic toggling for all except 'Any'
                pill.classList.toggle('selected');
                // Optional: add logic to unselect 'Any' if a specific item is selected, etc.
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // PDP Scroll Spy and Smooth Scroll
    const sections = document.querySelectorAll('.pdp-section-anchor');
    const navLinks = document.querySelectorAll('.page-nav-link');
    const navBar = document.querySelector('.pdp-page-nav');
    
    if (sections.length > 0 && navLinks.length > 0) {
        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        // Calculate offset for sticky nav and global header
                        const headerOffset = 140; // Approx height of headers + nav
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Scroll Spy
        window.addEventListener('scroll', () => {
            let current = '';
            
            // Allow for bottom of page leeway
            const scrollPos = window.scrollY + 200; 

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                        // Optional: Center the active link in the scrollable nav if it overflows
                        if(navBar) {
                           // navBar.querySelector('.nav-container').scrollLeft = link.offsetLeft - 20; 
                        }
                    }
                });
            }
        });
    }

    // Favorite heart toggle for PDP and other places
    const allFavBtns = document.querySelectorAll('.pdp-gallery-actions .btn-icon:last-child');
    allFavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-regular')) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    icon.style.color = '#ff385c';
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                    icon.style.color = ''; // reset
                }
            }
        });
    });
    // Dashboard Config Tabs functionality
    const configTabs = document.querySelectorAll('.config-tabs .tab');
    const configPanes = document.querySelectorAll('.config-pane');
    
    if (configTabs.length > 0 && configPanes.length > 0) {
        configTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs & hide all panes
                configTabs.forEach(t => t.classList.remove('active'));
                configPanes.forEach(p => {
                    p.style.display = 'none';
                    p.classList.remove('active-pane');
                });
                
                // Add active class to clicked tab & show corresponding pane
                tab.classList.add('active');
                if (configPanes[index]) {
                    configPanes[index].style.display = 'block';
                    configPanes[index].classList.add('active-pane');
                }
            });
        });
    }
});

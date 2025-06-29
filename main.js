document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Simple menu data
    const menuData = {
        appetizers: [],
        breakfast: [],
        drinks: []
    };

    // Generate dummy items for demo
    function generateMenuItems(category, count) {
        const items = [];
        for (let i = 1; i <= count; i++) {
            const price = (Math.random() * 10 + 5).toFixed(2);
            let name = '', description = '';
            switch (category) {
                case 'appetizers':
                    name = `Appetizer Delight ${i}`;
                    description = `A flavorful appetizer for a perfect start to your meal.`;
                    break;
                case 'breakfast':
                    name = `Morning Feast ${i}`;
                    description = `A delicious and energizing breakfast option.`;
                    break;
                case 'drinks':
                    name = `Thirst Quencher ${i}`;
                    description = `A refreshing beverage to complement any dish.`;
                    break;
            }
            items.push({ name, price, description });
        }
        return items;
    }
    menuData.appetizers = generateMenuItems('appetizers', 50);
    menuData.breakfast = generateMenuItems('breakfast', 50);
    menuData.drinks = generateMenuItems('drinks', 50);

    // Show page by ID
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (pageId.includes('-external-page')) {
                const category = pageId.split('-')[0];
                const menuContent = targetPage.querySelector('.menu-items-scroll');
                if (menuContent) renderMenu(category, menuContent);
            }
        }
    }

    // Render menu items
    function renderMenu(category, container) {
        container.innerHTML = '';
        menuData[category].forEach(item => {
            const menuItemHtml = `
                <div class="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:scale-102 border border-gray-100">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="text-xl md:text-2xl font-semibold text-gray-800">${item.name}</h4>
                        <span class="text-orange-600 text-lg md:text-xl font-bold">$${item.price}</span>
                    </div>
                    <p class="text-gray-600 text-base">${item.description}</p>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', menuItemHtml);
        });
    }

    // Navigation logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.dataset.page;
            if (targetId && targetId.includes('-page') && !targetId.includes('home-')) {
                showPage(targetId);
            } else if (targetId) {
                showPage('home-page');
                setTimeout(() => {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        });
    });

    // Back to Top Button
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Start at home page
    showPage('home-page');
});
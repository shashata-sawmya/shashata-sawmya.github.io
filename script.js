document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Publication filters
    const filterButtons = document.querySelectorAll('.filter');
    const publications = document.querySelectorAll('.publication');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            publications.forEach(pub => {
                if (filterValue === 'all' || pub.classList.contains(filterValue)) {
                    pub.style.display = 'flex';
                } else {
                    pub.style.display = 'none';
                }
            });
        });
    });
    
    // Neural network background animation for research section
    function createNeuralNetwork() {
        const researchSection = document.getElementById('research');
        if (!researchSection) return;
        
        const neuralNetwork = document.createElement('div');
        neuralNetwork.classList.add('neural-network');
        researchSection.appendChild(neuralNetwork);
        
        const width = researchSection.offsetWidth;
        const height = researchSection.offsetHeight;
        
        // Create nodes
        const nodeCount = 20;
        const nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            
            const x = Math.random() * width;
            const y = Math.random() * height;
            
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            
            neuralNetwork.appendChild(node);
            nodes.push({ element: node, x, y });
        }
        
        // Create connections between nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() > 0.7) continue; // Only create some connections
                
                const connection = document.createElement('div');
                connection.classList.add('connection');
                
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                connection.style.width = `${distance}px`;
                connection.style.left = `${nodes[i].x}px`;
                connection.style.top = `${nodes[i].y + 5}px`;
                connection.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
                
                neuralNetwork.appendChild(connection);
            }
        }
    }
    
    createNeuralNetwork();
    
    // Recreate neural network on window resize
    window.addEventListener('resize', function() {
        const neuralNetwork = document.querySelector('.neural-network');
        if (neuralNetwork) {
            neuralNetwork.remove();
            createNeuralNetwork();
        }
    });
    
    // Memories Carousel
    function initMemoriesCarousel() {
        const track = document.querySelector('.carousel-track');
        const cards = document.querySelectorAll('.memory-card');
        const prevButton = document.querySelector('.carousel-control.prev');
        const nextButton = document.querySelector('.carousel-control.next');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        
        if (!track || cards.length === 0) return;
        
        let currentIndex = 0;
        let cardWidth = cards[0].offsetWidth + 20; // Card width + gap
        
        // Create indicators
        cards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToCard(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        // Set initial active card
        cards[0].classList.add('active');
        
        // Update carousel on window resize
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + 20;
            goToCard(currentIndex);
        });
        
        // Previous button click
        prevButton.addEventListener('click', () => {
            goToCard(currentIndex - 1);
        });
        
        // Next button click
        nextButton.addEventListener('click', () => {
            goToCard(currentIndex + 1);
        });
        
        // Card click
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                goToCard(index);
            });
        });
        
        function goToCard(index) {
            // Handle circular navigation
            if (index < 0) index = cards.length - 1;
            if (index >= cards.length) index = 0;
            
            currentIndex = index;
            
            // Calculate visible cards based on container width
            const containerWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.floor(containerWidth / cardWidth);
            
            // Calculate position to center the active card
            let position;
            if (visibleCards >= cards.length) {
                // All cards are visible, no need to scroll
                position = 0;
            } else {
                // Center the active card
                position = -currentIndex * cardWidth + (containerWidth - cardWidth) / 2;
                
                // Limit scrolling to keep cards within view
                const maxPosition = 0;
                const minPosition = -(cards.length * cardWidth - containerWidth);
                position = Math.max(minPosition, Math.min(maxPosition, position));
            }
            
            // Update track position
            track.style.transform = `translateX(${position}px)`;
            
            // Update active states
            cards.forEach(card => card.classList.remove('active'));
            cards[currentIndex].classList.add('active');
            
            // Update indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    // Initialize memories carousel
    initMemoriesCarousel();
});
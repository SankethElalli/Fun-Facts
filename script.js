// Array of fun facts
const facts = [
    "I love hiking and have traveled to five national parks.",
    "I am an avid reader and read around 20 books per year.",
    "I once baked a 3-tiered cake for a family gathering!",
    "I speak three languages fluently.",
    "I'm learning to play the guitar in my free time."
];

// DOM elements
const factDisplay = document.getElementById('current-fact');
const newFactBtn = document.getElementById('new-fact-btn');
const shareBtn = document.getElementById('share-btn');

// Track current fact
let currentFactIndex = -1;

// Function to get random fact
function getRandomFact() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * facts.length);
    } while (newIndex === currentFactIndex && facts.length > 1);
    
    currentFactIndex = newIndex;
    return facts[currentFactIndex];
}

// Event listeners
newFactBtn.addEventListener('click', () => {
    const fact = getRandomFact();
    factDisplay.textContent = fact;
    factDisplay.classList.add('fade-in');
    setTimeout(() => factDisplay.classList.remove('fade-in'), 500);
});

shareBtn.addEventListener('click', async () => {
    const fact = factDisplay.textContent;
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Fun Fact About Me',
                text: fact,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            await navigator.clipboard.writeText(fact);
            alert('Fact copied to clipboard!');
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
});

// Display initial fact on load
window.addEventListener('load', () => {
    factDisplay.textContent = getRandomFact();
});

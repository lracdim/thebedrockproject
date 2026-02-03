// Faith Compression Logic

document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('article.essay');
    if (!article) return;

    const buttons = document.querySelectorAll('.compression-controls button');
    if (buttons.length === 0) return;

    // Function to set mode
    window.setMode = (mode) => {
        // Remove all mode classes
        article.classList.remove('mode-full', 'mode-5min', 'mode-1min');

        // Add new mode class
        article.classList.add(`mode-${mode}`);

        // Update active button state
        buttons.forEach(btn => {
            // Simple logic to highlight active button
            if (btn.innerText.toLowerCase().includes(mode === 'full' ? 'full' : (mode === '5min' ? '5-min' : 'bedrock'))) {
                btn.style.fontWeight = 'bold';
                btn.style.borderBottom = '2px solid var(--color-text-charcoal)';
            } else {
                btn.style.fontWeight = 'normal';
                btn.style.borderBottom = '1px solid #ccc';
            }
        });

        console.log(`Switched to ${mode} mode.`);
    };

    // Set default mode
    setMode('full');
});

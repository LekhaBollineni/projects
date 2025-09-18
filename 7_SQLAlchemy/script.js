function generateNumbers() {
    fetch('http://localhost:8000/generate')
        .then(response => response.json())
        .then(data => {
            const numbers = data.numbers;
            const numbersDiv = document.getElementById('numbers');
            numbersDiv.innerHTML = '';
            numbers.slice(0, 5).forEach(n => {
                const el = document.createElement('div');
                el.className = 'number';
                el.textContent = n;
                numbersDiv.appendChild(el);
            });
            const lastEl = document.createElement('div');
            lastEl.className = 'number last';
            lastEl.textContent = numbers[5];
            numbersDiv.appendChild(lastEl);
        })
        .catch(() => {
            // fallback to local generation if backend fails
            console.error('Failed to fetch from backend, pick yourself.');
        });
}
// Generate on load
generateNumbers();

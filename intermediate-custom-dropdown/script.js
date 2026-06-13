const dropdown = document.querySelector('.dropdown');
const header = document.querySelector('.dropdown-header');
const list = document.querySelector('.dropdown-list');
const items = document.querySelectorAll('.dropdown-item');

const selected = document.getElementById('selectedText');
const arrow = document.getElementById('arrow');


header.addEventListener('click', () => {
    dropdown.classList.toggle('active');

    if(dropdown.classList.contains('active')) {
        arrow.textContent = '▲';
    } else {
        arrow.textContent = '▼';
    }
});

items.forEach(item => {
    item.addEventListener('click', () => {
        selected.textContent = item.textContent;
        items.forEach(item => {item.classList.remove('selected');
        });
        item.classList.add("selected");
        dropdown.classList.remove('active');
        arrow.textContent = '▼';
    });
});

document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
        arrow.textContent = '▼';
    }
});
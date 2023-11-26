const page = document.querySelectorAll('.page-item');
const cards = document.querySelectorAll('a.cardItem')
page.forEach(element => {
    element.addEventListener('click', (e) => {
        page.forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');
        cards.forEach(item => {
            item.style.display = "none";
        });
        const currentPage = e.target.innerText;

        console.log(e.target.innerText);
        const startIndex = (currentPage - 1) * 8;
        const endIndex = startIndex + 8;

        cards.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = "inline";
            }
        });
    })

});
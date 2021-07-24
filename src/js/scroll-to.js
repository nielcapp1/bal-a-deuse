(function () {
    const elements = document.querySelectorAll('[data-scroll]');
    if (elements) {
        Array.from(elements).forEach(el => {
            const element = el.dataset.scroll || 'body';

            el.addEventListener('click', event => {
                event.stopPropagation();
                event.preventDefault();

                document.querySelector(element).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
})();

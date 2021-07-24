import * as bodyScrollLock from 'body-scroll-lock';

function toggleNavigation(element) {
    const elements = {
        nav: document.querySelector(element),
        toggle: document.querySelector(`${element} > .Navigation-toggle`),
        parent: document.querySelector('html'),
        main: document.querySelector('.Nav--main')
    }

    elements.toggle.addEventListener('click', e => {
        const isOpen = elements.parent.classList.contains('show-nav');

        if (isOpen) {
            bodyScrollLock.enableBodyScroll(elements.main);
            elements.parent.classList.remove('show-nav');
        } else {
            bodyScrollLock.disableBodyScroll(elements.main);
            elements.parent.classList.add('show-nav');
        }
    });
}
toggleNavigation('.Navigation');


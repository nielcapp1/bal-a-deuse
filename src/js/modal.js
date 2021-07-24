/* Modal */
(function () {
    let $parent, $thisModal;
    const elements = {
        links: document.querySelectorAll('.js-showModal'),
        modals: document.querySelectorAll('.js-modal'),
        inner: document.querySelectorAll('.Modal-inner'),
        close: document.querySelectorAll('.js-closeModal'),
    };

    if (elements.links) {
        Array.from(elements.links).forEach(element => {

            element.addEventListener('click', e => {
                // Prevent redirect
                e.stopPropagation();
                e.preventDefault();

                // Set id & scrollbar Width
                const id = e.target.dataset.modal;
                const sbWidth = getScrollbarWidth();

                // Get modal & parent
                $thisModal = document.querySelector(`.js-modal[data-id="${id}"]`);
                $parent = $thisModal.parentNode;

                // Prevent scroll and attach to HTML
                bodyScrollLock.disableBodyScroll($thisModal);
                $thisModal.remove();
                document.querySelector('body').appendChild($thisModal);

                // Timeout
                setTimeout(() => {
                    // Scrollbar
                    document.querySelector('html').style.paddingRight = sbWidth;
                    document.querySelector('html').classList.add('hide-scroll');

                    // Hide all active
                    Array.from(elements.modals).forEach(modal => modal.classList.remove('is-active'));

                    // Show current modal
                    $thisModal.style.paddingRight = sbWidth;
                    $thisModal.classList.add('is-active');
                }, 100);
            });
        });
    }

    if (elements.inner) {
        Array.from(elements.inner).forEach(element => {
            element.addEventListener('click', e => {
                const target = e.target.closest('.Modal-inner-body');

                if (!target) {
                    e.preventDefault();
                    e.stopPropagation();

                    closeModal();
                }
            });
        });
    }

    if (elements.close) {
        Array.from(elements.close).forEach(element => {
            element.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();

                closeModal();
            });
        });
    }

    document.addEventListener('keyup', e => {
        if (e.keyCode == 27) {
            closeModal();
        }
    });

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function closeModal() {
        setTimeout(() => {
            document.querySelector('html').removeAttribute('style');
            document.querySelector('html').classList.remove('hide-scroll');

            // Hide current modal
            $thisModal.removeAttribute('style');
            $thisModal.remove();
            $parent.appendChild($thisModal);
        }, 200);

        // Hide modal and allow scroll
        $thisModal.classList.remove('is-active');
        bodyScrollLock.enableBodyScroll($thisModal);
    }
})();

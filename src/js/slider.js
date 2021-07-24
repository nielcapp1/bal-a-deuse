// Slider
let s = [];
function slider(element, options) {
    const defaultOptions = {
        a11y: {
            notificationClass: 'Slider-notification'
        },
        // Classes
        noSwipingClass: 'has-noSwiping',
        containerModifierClass: 'Slider--',
        slideClass: 'Slider-item',
        slideBlankClass: 'is-blank',
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-duplicate-active',
        slideVisibleClass: 'is-visible',
        slideDuplicateClass: 'is-duplicate',
        slideNextClass: 'is-next',
        slideDuplicateNextClass: 'is-duplicate is-next',
        slidePrevClass: 'is-prev',
        slideDuplicatePrevClass: 'is-duplicate is-prev',
        wrapperClass: 'Slider-items'
    };

    if (options != undefined) {
        if (options.navigation) {
            var optionNavigation = {
                nextEl: options.navigation.nextEl || '.Slider-button--next',
                prevEl: options.navigation.prevEl || '.Slider-button--prev',
                hideOnClick: (options.navigation.hideOnClick == true) ? true : false
            }

            options.navigation = {
                nextEl: optionNavigation.nextEl,
                prevEl: optionNavigation.prevEl,
                hideOnClick: optionNavigation.hideOnClick,
                disabledClass: 'is-disabled',
                hiddenClass: 'is-hidden',
            }
        }

        if (options.pagination) {
            var optionsPagination = {
                el: options.pagination.el || '.Slider-pagination',
                type: options.pagination.type || 'bullets',
                bulletElement: options.pagination.bulletElement || 'span',
                dynamicBullets: (options.pagination.dynamicBullets == true) ? true : false,
                dynamicMainBullets: options.pagination.dynamicMainBullets || 1,
                hideOnClick: (options.pagination.hideOnClick == true) ? true : false,
                clickable: (options.pagination.clickable == false) ? false : true,
                progressbarOpposite: (options.pagination.progressbarOpposite == true) ? true : false,
                formatFractionCurrent: options.pagination.formatFractionCurrent || (number => number),
                formatFractionTotal: options.pagination.formatFractionTotal || (number => number),
                renderBullet: options.pagination.renderBullet || null,
                renderFraction: options.pagination.renderFraction || null,
                renderProgressbar: options.pagination.renderProgressbar || null,
                renderCustom: options.pagination.renderCustom || null,
            }

            options.pagination = {
                el: optionsPagination.el,
                type: optionsPagination.type,
                bulletElement: optionsPagination.bulletElement,
                dynamicBullets: optionsPagination.dynamicBullets,
                dynamicMainBullets: optionsPagination.dynamicMainBullets,
                hideOnClick: optionsPagination.hideOnClick,
                clickable: optionsPagination.clickable,
                progressbarOpposite: optionsPagination.progressbarOpposite,
                formatFractionCurrent: optionsPagination.formatFractionCurrent,
                formatFractionTotal: optionsPagination.formatFractionTotal,
                renderBullet: optionsPagination.renderBullet,
                renderFraction: optionsPagination.renderFraction,
                renderProgressbar: optionsPagination.renderProgressbar,
                renderCustom: optionsPagination.renderCustom,
                bulletClass: 'Slider-pagination-item',
                bulletActiveClass: 'is-active',
                modifierClass: 'Slider-pagination--',
                currentClass: 'is-current',
                totalClass: 'is-total',
                hiddenClass: 'is-hidden',
                progressbarFillClass: 'Slider-pagination-fill',
                clickableClass: 'is-clickable',
                lockClass: 'is-locked'
            };
        }

        if (options.scrollbar) {
            var optionsScrollbar = {
                el: options.scrollbar.el || '.Slider-scrollbar',
                hide: (options.scrollbar.hide == false) ? false : true,
                draggable: (options.scrollbar.draggable == true) ? true : false,
                snapOnRelease: (options.scrollbar.snapOnRelease == false) ? false : true,
                dragSize: options.scrollbar.dragSize || 'auto',
            }

            options.scrollbar = {
                el: optionsScrollbar.el,
                hide: optionsScrollbar.hide,
                draggable: optionsScrollbar.draggable,
                snapOnRelease: optionsScrollbar.snapOnRelease,
                dragSize: optionsScrollbar.dragSize,
                lockClass: 'is-locked',
                dragClass: 'Slider-scrollbar-drag'
            }
        }

        if (options.lazy) {
            var optionsLazy = {
                loadPrevNext: (options.lazy.loadPrevNext == true) ? true : false,
                loadPrevNextAmount: options.lazy.loadPrevNextAmount || 1,
                loadOnTransitionStart: (options.lazy.loadOnTransitionStart == true) ? true : false
            }

            options.lazy = {
                loadPrevNext: optionsLazy.loadPrevNext,
                loadPrevNextAmount: optionsLazy.loadPrevNextAmount,
                loadOnTransitionStart: optionsLazy.loadOnTransitionStart,
                elementClass: 'is-lazy',
                loadingClass: 'is-loading',
                loadedClass: 'is-loaded',
                preloaderClass: 'has-preloader'
            }
        }

        if (options.thumbs) {
            var optionsThumbs = {
                swiper: options.thumbs.swiper || null
            }

            options.thumbs = {
                swiper: optionsThumbs.swiper,
                slideThumbActiveClass: 'is-active',
                thumbsContainerClass: 'Swiper--thumbnails'
            }
        }

        if (options.zoom) {
            var optionsZoom = {
                maxRatio: options.zoom.maxRatio || 3,
                minRatio: options.zoom.minRatio || 1,
                toggle: (options.zoom.toggle == false) ? false : true
            }

            options.zoom = {
                maxRatio: optionsZoom.maxRatio,
                minRatio: optionsZoom.minRatio,
                toggle: optionsZoom.numbertoggle,
                containerClass: 'Slider--zoom',
                zoomedSlideClass: 'is-zoomed'
            }
        }

        if (options.a11y) {
            optionsA11y = {
                enabled: (options.a11y.enabled == true) ? true : false,
                prevSlideMessage: options.a11y.prevSlideMessage || 'Previous slide',
                nextSlideMessage: options.a11y.nextSlideMessage || 'Next slide',
                firstSlideMessage: options.a11y.firstSlideMessage || 'This is the first slide',
                lastSlideMessage: options.a11y.lastSlideMessage || 'This is the last slide',
                paginationBulletMessage: options.a11y.paginationBulletMessage || 'Go to slide {{index}}',
            }

            options.a11y = {
                enabled: optionsA11y.enabled,
                prevSlideMessage: optionsA11y.prevSlideMessage,
                nextSlideMessage: optionsA11y.nextSlideMessage,
                firstSlideMessage: optionsA11y.firstSlideMessage,
                lastSlideMessage: optionsA11y.lastSlideMessage,
                paginationBulletMessage: optionsA11y.paginationBulletMessage,
                notificationClass: 'Slider-notification'
            }
        }
    }

    options = Object.assign({}, defaultOptions, options);
    s[element] = new Swiper(element, options);
}

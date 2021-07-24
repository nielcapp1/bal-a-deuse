(function () {
    const elements = document.querySelectorAll('.Form-field--file');
    if (elements) {
        Array.from(elements).forEach(element => {
            const $input = element.querySelector('input');
            const $label = element.querySelector('.Form-indicator');
            const labelValue = $label.dataset.fileText;

            $input.addEventListener('change', e => {
                let fileName = null;
                const label = e.target.closest('.Form-field--file').querySelector('.Form-indicator');
                if ($input.files && $input.files.length > 1) {
                    fileName = (label.getAttribute('data-file-multiple') || '').replace('{count}', $input.files.length);
                } else if (e.target.value) {
                    fileName = e.target.value.split('\\').pop();
                }

                if (fileName) {
                    $label.dataset.fileText = fileName;
                } else {
                    $label.dataset.fileText = labelValue;
                }
            })
        })
    }
})();
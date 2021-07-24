(function () {
    const header = document.querySelector(".Header");
    if (header) {
        var headroom = new Headroom(header, {
            offset: 0,
            classes: {
                initial : "Header--sticky",
                pinned : "is-pinned",
                unpinned : "is-unpinned",
                top : "is-top",
                notTop : "is-notTop",
                bottom : "is-bottom",
                notBottom : "is-notBottom"
            },
            onPin : function() {},
            onUnpin : function() {},
            onTop : function() {},
            onNotTop : function() {},
        });
        headroom.init();
    }
})();

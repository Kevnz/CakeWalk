define(["jquery", "hammer"], function galleryDefine($) {




    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch (ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                //var loaded_panes = $('.image-wrap img', container).length;
                //var pane_offset = -(100 / pane_count) * current_pane;
                //var pane_offset = -(100 / 6) * current_pane;
               // var drag_offset = ((100 / pane_width) * ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                //if ((current_pane === 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
               // (current_pane == pane_count - 1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
                    //drag_offset *= 0.4;
                //}
                //console.log(drag_offset + pane_offset);
                //setContainerOffset(drag_offset + pane_offset);
                console.log('drag');
                break;
            case 'swipeleft':
                self.next();
                console.log('swipe');
                ev.gesture.stopDetect();
                //$('.swipe-instruct').fadeOut(800);
                break;
            case 'swiperight':
            console.log('swipe');
                self.prev();
                ev.gesture.stopDetect();
                break;
            case 'release':
                console.log('release');
                if (ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                break;
        }
    }


    var imagePanes, container, contentBox, windowWidth, self;
    var Gallery = function gallery() {
        self = this;
        this.init();
    };
    Gallery.prototype.init = function() {
        imagePanes = $('.gallery .image-pane'),
        container = $('.gallery'),
        contentBox = $('.gallery .contentBox'),
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        this.render();
        this.bind();
        this.sync();
    };
    Gallery.prototype.next = function() {
        console.log('next');
        var currLeft = contentBox.css('left');
        var currNoPixLeft = currLeft.replace('px', '');
        if(currLeft == 'auto') currNoPixLeft = 0;
        var newLeft = (parseInt(currNoPixLeft, 10) - parseInt(windowWidth, 10));
 
        contentBox.css('left', newLeft+'px');

    };
    Gallery.prototype.prev = function() {
        var currLeft = contentBox.css('left');
        var currNoPixLeft = currLeft.replace('px', '');
        if(currLeft == 'auto') currNoPixLeft = 0;
        var newLeft = (parseInt(currNoPixLeft, 10) + parseInt(windowWidth, 10));
        contentBox.css('left', newLeft+'px');
    };
    Gallery.prototype.render = function() {
        imagePanes.css('width', windowWidth);
    };
    Gallery.prototype.bind = function() {
        contentBox.hammer({ drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
    };
    Gallery.prototype.sync = function() {
        
    };











    
    return Gallery;
});







/* app/ui/lightbox/mobile */

define(
    'app/ui/lightbox/mobile',[
        'jquery',
        'hammer'
    ],
    function ($) {

        var lightboxHtml = '<div id="mobile-carousel-wrap" style="display: none;">' +
                                '<div id="mobile-carousel">' +
                                    '<div class="swipe-instruct">' +
                                        '<img src="/content/images/interface/lightbox/mobile/touch-instruct.20131122.png" /> ' +
                                        '<h3 class="uppercase heading">Swipe to view more images</h3>' +
                                    '</div>' +
                                    '<div id="close-carosel"><span aria-hidden="true" class="iconf-close iconf--kilo"></span><span class="visuallyhidden">Close</span></div>' +
                                    '<ul class="slides"></ul>' +
                                '</div>' +
                                '<ul class="controls">' +
                                    '<li class="scroll-left"><span class="visuallyhidden">Previous</span></li>' +
                                    '<li class="scroll-right"><span class="visuallyhidden">Next</span></li>' +
                                '</ul>' +
                            '</div>';

        $('body').append(lightboxHtml);

        $(".js-lightbox-gallery").on('click', '.js-lightbox-image', function (event) {
            event.preventDefault();
            var gallerySelector = $(this).attr('rel');
            var carousel = new Carousel("#mobile-carousel", gallerySelector, "gallery");

            $("#mobile-carousel-wrap").show();
            carousel.init();
        });

        $('.js-lightbox-single').on('click', '.js-lightbox-image', function (event) {
            event.preventDefault();
            var carousel = new Carousel("#mobile-carousel", $(this), "image");

            $("#mobile-carousel-wrap").show();
            carousel.init();
        });

        $("#close-carosel").on('click', function (ev) {
            ev.preventDefault();
            $("#mobile-carousel-wrap").hide();
            $("#mobile-carousel").find('.slides').empty()
                .removeAttr('style')
                .removeClass('animate');
        });


        function Carousel(element, reference, type) {
            var self = this;
            element = $(element);
            var imageUrl = "";
            var imageDetails = "";


            if (type === "gallery") {
                var index = 1;

                $('.controls').show();
                $('.swipe-instruct').show();
                var paneHolder = [];
                var imageLinks = $('.js-lightbox-gallery a[rel="' + reference + '"]');
                var total = imageLinks.length;
                imageLinks.each(function galleryPaneBuilder(itemIndex) {
                    var generatedPane = "";
                    index++;
                    var currentItem = $(this);
                    if (index > 6) {
                        imageUrl = currentItem.attr('href');
                        imageDetails = currentItem.find('img').attr('alt') ? currentItem.find('img').attr('alt') : "";
                        generatedPane = "<li class='pane" + itemIndex + "' style='width: 14px;'><div class='image-wrap not-loaded' data-src='" +
                            imageUrl +
                                "'></div>" +
                                    "<div class='detail'><p>" + imageDetails + "</p><span style='float:right;'>Image " + (index-1) + " of "+total+"</span></div></li></div></li>";
                    } else {
                        imageUrl = currentItem.attr('href');
                        imageDetails = currentItem.find('img').attr('alt') ? currentItem.find('img').attr('alt') : "";
                        generatedPane = "<li class='pane" + itemIndex + "'><div class='image-wrap' data-src='" + imageUrl +
                                "'><img src='" +
                                imageUrl +
                                "' alt='test'/></div>" +
                                    "<div class='detail'><p>" + imageDetails + "</p><span style='float:right;'>Image " + (index-1) + " of "+total+"</span></div></li>";
                    }
                    paneHolder.push(generatedPane);

                });
                var holderPane = "<li class='pane" + index + "' style='width: 14px;'><div class='image-wrap not-loaded' data-src='" +
                             '' +
                                "'></div>" +
                                    "<div class='detail'><p></p></div></li>";
                paneHolder.push(holderPane);
                $('#mobile-carousel').find('.slides').append(paneHolder.join(''));
            }
            if (type == "image") {
                $('.controls').hide();
                $('.swipe-instruct').hide();
                imageUrl = reference.attr('href');
                imageDetails = reference.find('img').attr('alt') ? reference.find('img').attr('alt') : "";
                generatedPane = "<li><div class='image-wrap'><img src='" +
                    imageUrl +
                        "' alt='test'/></div>" +
                            "<div class='detail'><h2>" + imageDetails + "</h2></div></li>";
                $('#mobile-carousel').find('.slides').append(generatedPane);
            }
            var container = $(">ul", element);
            var panes = $(">ul>li", element);

            var pane_width = 0;
            var pane_count = panes.length;

            var current_pane = 0;


            /**
            * initial
            */
            this.init = function () {
                setPaneDimensions();

                $(window).on("load resize orientationchange", function () {
                    setPaneDimensions();
                    //updateOffset();
                });
            };


            /**
            * set the pane dimensions and scale the container
            */

            function setPaneDimensions() {
                pane_width = element.width();
                var imgPaneCount = 0;
                panes.each(function () {
                    if ($('img', this).length > 0) {
                        $(this).width(pane_width);
                        imgPaneCount++;
                    } else {
                        $(this).width(0);
                    }

                });
                container.width(pane_width * imgPaneCount);

            }


            /**
            * show pane by index
            * @param   {Number}    index
            */
            this.showPane = function (index) {
                // between the bounds
                index = Math.max(0, Math.min(index, pane_count - 1));
                current_pane = index;
                //var loaded_panes = $('.image-wrap img', container).length;

                //var offset = -((100 / loaded_panes) * current_pane);
                setContainerOffset(0, true);
                pruneTail();
                loadNext();

                //console.log(offset);
                //var offset = -((100 / pane_count) * current_pane);

                setPaneDimensions();

            };
            function pruneTail() {
                var pn = $(panes[current_pane - 2]);
                if (pn.length > 0) { 
                    var wrap = $('.image-wrap', panes[current_pane - 2]);
                    wrap.empty()
                        .addClass('not-loaded');
                    //wrap.parent('li').width(0);
                }
            }
            function loadNext() {

                if (panes[current_pane + 1]) {
                    var nextPane = $('img', panes[current_pane + 1]);
                    var previosPane = $('img', panes[current_pane - 1]);
                    if (nextPane.length > 0) {

                    } else {
                        var imageHolder = $('.image-wrap', panes[current_pane + 1]);
                        imageHolder.removeClass('not-loaded');
                        var imgUrl = imageHolder.attr('data-src');
                        var img = "<img src='" + imgUrl + "' alt='test'/>";
                        imageHolder.append(img);
                        imageHolder.parent('li').width(pane_width);
                    }
                    if (previosPane.length < 1) {
                        var prev_imageHolder = $('.image-wrap', panes[current_pane - 1]);
                        prev_imageHolder.removeClass('not-loaded');
                        var prev_imgUrl = prev_imageHolder.attr('data-src');
                        var prev_img = "<img src='" + prev_imgUrl + "' alt='test'/>";
                        prev_imageHolder.append(prev_img);
                        prev_imageHolder.parent('li').width(pane_width);
                    }
                } else {

                }
            }
            function setContainerOffset(percent, animate) {
                container.removeClass("animate");
                //console.log(pane_width);
                if (animate) {
                    container.addClass("animate");
                }
                if (Modernizr.csstransforms3d) {
                    if (animate) container.css("transform", "translate(" + pane_width + "px,0,0) scale3d(1,1,1)");
                    else container.css("transform", "translate(" + percent + "%,0,0) scale3d(1,1,1)");
                } else if (Modernizr.csstransforms) {
                    if (animate) container.css("transform", "translate(" + pane_width + "px,0)");
                    else container.css("transform", "translate(" + percent + "%,0)");
                } else {
                    var px = ((pane_width * pane_count) / 100) * percent;
                    container.css("left", px + "px");
                }
            }

            this.next = function () {
                return this.showPane(current_pane + 1, true);
            };
            this.prev = function () {
                return this.showPane(current_pane - 1, true);
            };
            function handleHammer(ev) {
                // disable browser scrolling
                ev.gesture.preventDefault();

                switch (ev.type) {
                    case 'dragright':
                    case 'dragleft':
                        // stick to the finger
                        //var loaded_panes = $('.image-wrap img', container).length;
                        //var pane_offset = -(100 / pane_count) * current_pane;
                        var pane_offset = -(100 / 6) * current_pane;
                        var drag_offset = ((100 / pane_width) * ev.gesture.deltaX) / pane_count;

                        // slow down at the first and last pane
                        if ((current_pane === 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
                        (current_pane == pane_count - 1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
                            drag_offset *= 0.4;
                        }
                        setContainerOffset(drag_offset + pane_offset);
                        break;
                    case 'swipeleft':
                        self.next();
                        ev.gesture.stopDetect();
                        $('.swipe-instruct').fadeOut(800);
                        break;
                    case 'swiperight':
                        self.prev();
                        ev.gesture.stopDetect();
                        break;
                    case 'release':
                        // more then 50% moved, navigate
                        if (Math.abs(ev.gesture.deltaX) > pane_width / 2) {
                            if (ev.gesture.direction == 'right') {
                                self.prev();
                            } else {
                                self.next();
                            }
                        } else {
                            self.showPane(current_pane, true);
                        }
                        break;
                }
            }

            element.hammer({ drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);

            //scroll left control
            $('.scroll-left').on('click', function () {
                self.prev();
                $('.swipe-instruct').fadeOut(800);
            });
            //scroll right control
            $('.scroll-right').on('click', function () {
                self.next();
                $('.swipe-instruct').fadeOut(800);
            });
        }
    }
);
$(function() {
    (function() {
        var param_urls = [];

        $.map($(".hatebu-count"), function (val, i) {
            var url = $(val).data("permalink");
            param_urls.push(url);
        });

        window.setHatebuCount = function(counts) {
            $.each(param_urls, function(index, url) {
                $(".hatebu-count[data-permalink='" + url + "']").text(counts[url]);
            });
        };

        $.ajax({
            url: "http://api.b.st-hatena.com/entry.counts?callback=setHatebuCount&url=" + encodeURI(param_urls.join("&url=")),
            type: 'GET',
            dataType: 'jsonp'
        });


        var $sidebar = $("#sidebar"),
            $sidebar_last_widgets = $sidebar.children("div:last-child"),
            $sidebar_last_widget;

        if ($sidebar_last_widgets.length > 0) {
            $sidebar_last_widget = $($sidebar_last_widgets[0]);
            var last_widget_top = $sidebar_last_widget.offset().top
                ,last_widget_width = $sidebar_last_widget.outerWidth()
                ,last_widget_height = $sidebar_last_widget.outerHeight()
                ,footer_offset_top = $("#footer").offset().top
                ,last_top = 0;
            var scroll_state = 'normal';

            if (last_widget_top + last_widget_height >= footer_offset_top) {
                return;
            }

            $sidebar_last_widget.addClass('hidden-xs')
                .addClass('hidden-sm');

            $(window).on("resize", function() {
                // last_widget_top = $sidebar_last_widget.offset().top;
                last_widget_width = $sidebar_last_widget.outerWidth();
                last_widget_height = $sidebar_last_widget.outerHeight();
            });

            $(window).on("scroll", function() {
                var scrollY = getScrollPosition()[1];
                var footer_offset_top = $("#footer").offset().top;

                if (last_widget_top < scrollY && scroll_state == 'normal') {
                    $sidebar_last_widget.css('position', 'fixed')
                        .css('top', '0')
                        .css('width', last_widget_width);

                    scroll_state = 'fixed';
                } else if (footer_offset_top < (scrollY + last_widget_height) && scroll_state == 'fixed') {
                    last_top = -(scrollY + last_widget_height - footer_offset_top);
                    $sidebar_last_widget.css('top', last_top + 'px');
                } else if (last_widget_top < scrollY && scroll_state == 'fixed' && last_top != 0) {
                    last_top = 0;
                    $sidebar_last_widget.css('top', '0');
                } else if (last_widget_top > scrollY && scroll_state == 'fixed') {
                    $sidebar_last_widget.css('position', '')
                        .css('top', '')
                        .css('width', '');

                    scroll_state = 'normal';
                }


            });
        }

    })();

    function getScrollPosition(){
        if(window.pageYOffset!= undefined){
            return [pageXOffset, pageYOffset];
        }
        else{
            var sx, sy, d= document, r= d.documentElement, b= d.body;
            sx= r.scrollLeft || b.scrollLeft || 0;
            sy= r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }
});

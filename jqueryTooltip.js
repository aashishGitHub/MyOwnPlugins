(function ($) {
    $.fn.jqueryToolTip = function (toolTipOptions) {

        // default settings for the plugin
        var toolTipDefaults = {
            position: "bottom"
        },

            // extending default settings
            toolTipSettings = $.extend({}, toolTipDefaults, toolTipOptions);

        // HTML markup for tooltip plugin
        var toolTipTemplate = '<div id="jqueryToolTip_wrapper">' +
            '<h5 class="jqueryToolTip_text">Title for tooltip</h5>' +
            '<p class="content"> More additional text </p>' +
            '<span><button class="tipClose">OK</span>' +
            '<span class="jqueryToolTip_arrow"></span>' +
            '</div>';

        // appending the markup
        // Append at any place in the body, display is set to none.
        $('body').append(toolTipTemplate);

        // No need to return this for method chaining, as each() itself returns the same object this.
        $(this).each(function () {
            // on hover function
            $(this).hover(function () {

                var toolTipTitle = $(this).attr("data-title") || "No Title"; // getting current link title
                var toolTipDesc = $(this).attr("data-content") || "No content";

                $('#jqueryToolTip_wrapper').css("display", "none");
                $('.jqueryToolTip_text').html(toolTipTitle); // changing tooltip text to current link title
                $('.content').html(toolTipDesc); // changing tooltip text to current link title


                // $('.jqueryToolTip_text').html(toolTipTitle.substring(0,40)); // changing tooltip text to current link title
                // $('.content').html(toolTipDesc.substring(0,50)); // changing tooltip text to current link title

                var windowHeight = $(window).height();
                var windowWidth = $(window).width();

                var top = $(this).offset().top; // Also this.offsetTop works, getting current link Y axis
                var left = $(this).offset().left; // this.offsetLeft, getting current link X axis

                var itemHeight = $(this).height(); // Also this works, $(this).css("height"); getting link Height
                var itemWidth = $(this).width();


                var toolTipHeight = $('#jqueryToolTip_wrapper').height(); // getting toolTip Height
                var toolTipWidth = $('#jqueryToolTip_wrapper').width();
                var yPos, xPos = left;

                // Find out the position to place with larger space of the screen, and place the tooltip
                if (toolTipSettings.position == 'auto') {                   
                    var bottom = windowHeight - top - itemHeight;
                    var right = windowWidth - left - itemWidth;

                    // Find position, Whichever is greater, top or bottom: We will show the tooltip there. 
                    var topbottom = (top < bottom) ? bottom : top;
                    //Find position, Whichever is greater, left or right: We will show the tooltip there.
                    var leftright = (left < right) ? right : left;

                    $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').removeClass('arrow_down').removeClass('arrow_top').removeClass('arrow_right').removeClass("arrow_left");
                    // Position tooltip to bottom right of hovered/applied parent
                    if (topbottom == bottom && leftright == right) {
                        yPos = top;
                        xPos = left + itemWidth + 10;
                        $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').addClass('arrow_left');

                    } else if (topbottom == bottom && leftright == left) // Position tooltip to bottom left of hovered/applied parent
                    {
                        yPos = top;
                        xPos = right + itemWidth + 10;
                        $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').addClass('arrow_right');
                    } else if (topbottom == top && leftright == right) // Position tooltip to top right of hovered/applied parent
                    {
                        xPos = left + itemWidth+10;
                        yPos = top - toolTipHeight/2 - (itemHeight/ 2);
                        $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').addClass('arrow_left');
                    } else if (topbottom == top && leftright == left) { // Position tooltip to top left of hovered/applied parent
                        xPos = left - itemWidth/2 - toolTipWidth/2; // -10;
                        yPos = top - (itemHeight/2) - toolTipHeight/2;
                        $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').addClass('arrow_right');
                    }
                    
                }

                if (toolTipSettings.position == 'top') {
                    $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').addClass('arrow_down');
                    yPos = parseInt(top) - parseInt(toolTipHeight) - 20;
                }
                else if (toolTipSettings.position == 'bottom') {
                    var yPos = parseInt(top) + parseInt(itemHeight) + 10;
                    $('#jqueryToolTip_wrapper').find('.jqueryToolTip_arrow').removeClass('arrow_down');
                }

                $('#jqueryToolTip_wrapper').css("display", "block"); // setting tooltip display to block
                // $('#jqueryToolTip_wrapper').css({   // setting tooltip left and top position to the current link position
                //     top: topFinal,
                //     left: xPos
                // });
                $("#jqueryToolTip_wrapper").css("top", yPos + "px");
                $("#jqueryToolTip_wrapper").css("left", xPos + "px");
            },
                function () {
                    $(".tipClose").click(function () {
                        $('#jqueryToolTip_wrapper').css("display", "none");
                    });
                    // $('#jqueryToolTip_wrapper').css("display","none");  // hiding tooltip after hover is done
                });
        });
    }
})(jQuery);
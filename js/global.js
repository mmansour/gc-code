$(document).ready(function($) {


    // Accordion
    $(".toggle").on('click', function(e){
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(150);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(150);
            $this.next().toggleClass('show');
            $this.next().slideToggle(150);
        }
    });

    
    // New Arrivals
    $.ajax({
        url: 'json/new-arrivals.json',
            success: function(result){
                $.each(result.newArrivals, function(index, arrival) {
                    $('#tab2').append(
                        '<div class="arrival">' + 
                            '<img src="' + arrival.image + '" alt="' + arrival.title + '">' +
                            '<div class="arrival-data">' +
                                '<strong>' + arrival.title + '</strong>' +
                                '<p>' + arrival.description + '</p>' +
                                '<a href="' + arrival.url + '" class="arrival-cta">Learn more</a>' +
                            '</div>' + 
                        '</div>'
                    );      
                });
            },
            error: function(result){
                console.log("Error getting new arrivals");
            }
    });


    // Tabs
    $('ul.tabs').each(function(){
        // For each tab keep track of the active tab and its content
        var $active, $content, $links = $(this).find('a');

        // Flag as active when location.hash matches link
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        $(this).on('click', 'a', function(e){
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('active');
            $content.show();

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });


    // Top Nav
    $('nav li ul').hide().removeClass('menu');
    $('nav li').hover(
        function () {
            $('ul', this).stop().slideDown(150);
        },
        function () {
            $('ul', this).stop().slideUp(150);
        }
    );
});
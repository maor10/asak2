
// Preloader
$(window).on("load", function() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({'overflow':'visible'});
});

$(document).ready(function() {

    $("#fullPage").fullpage();

    $("#arrowDown").on("click", function(){
       $.fn.fullpage.moveSectionDown();
    });

    // Image background
    $.vegas({
        src:'https://i.ytimg.com/vi/wexEOx-8QQE/maxresdefault.jpg'
    });

    var countdown =  $('.countdown-time');

    createTimeCircles();

    $(window).on('resize', windowSize);

    function windowSize(){
        countdown.TimeCircles().destroy();
        createTimeCircles();
        countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
            countdown.removeClass('animated bounceIn');
        });
    }

    // TimeCicles - Create and Options
    function createTimeCircles() {
        countdown.addClass('animated bounceIn');
        countdown.TimeCircles({
            bg_width: 1,
            fg_width: 0.04,
            circle_bg_color: '#bbb',
            time: {
                Days: {color: '#fff'}
                ,	   Hours: {color: '#fff'}
                ,	 Minutes: {color: '#fff'}
                ,	 Seconds: {color: '#fff'}
            }
        });
        countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
            countdown.removeClass('animated bounceIn');
        });
    }

    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener

        });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '#mattress',
        overlap: 0.92,

        // listen for drop related events:

        ondragenter: function (event) {
            var draggableElement = event.relatedTarget,
                dropzoneElement = event.target;

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
            swal("Definitely not segel!", "The asak website will be up soon, get pictures and stories ready ;) ", "success");
        },
        ondrop: function (event) {
            console.log("dropped");
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
        }
    });

});

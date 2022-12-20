// Slider

$('.slider__inner').slick({
    slidesToShow: 3,
    slidesToScroll: 2,
    centerMode: true,
    arrows: false,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 768,
            settings: "unslick"
        },
    ]
})

// Modal

$('[data-modal=modal-window-btn]').on('click', function() {
    $('.overlay, #modal-window').fadeIn();
});
$('.modal__close').on('click', function() {
    $('.overlay, #modal-window').fadeOut();
});
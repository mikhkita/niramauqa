$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        rowCountry = 0,
        countCards = 0,
        countOperators = $(".b-operators-list .b-operators-item").length,
        arrCards = [],
        arrOperators = [],
        arrActiveCards = [],
        cardTimer = undefined;

    function resize(){
        if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

        if( myWidth > 1024 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }

        if( myWidth > 1090 ){
            rowCountry = 4;
        }else if( myWidth > 850 ){
            rowCountry = 3;
        }else{
            rowCountry = 2;
        }

        var checkCards = countCards;
        if( myWidth > 1024 ){
            countCards = 6;
        }else if( myWidth > 767 ){
            countCards = 4;
        }else{
            countCards = 3;
        }
        if(countCards != checkCards){//если количество карточек изменилось
            reinitCards();
        }

        $(".no-margin").removeClass("no-margin");
        if(isMobile){
            if(!$('.b-statistics-slider').hasClass("slick-initialized")){
                $('.b-statistics-slider').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 600,
                    autoplay: true,
                    autoplaySpeed: 3000,
                });
            }
            if(!$('b-country-wrap').length){
                $('.b-popular .b-country-list > .b-country-item').wrapAll('<div class="b-country-wrap"></div>');
            }
            if(!$('.b-country-wrap').hasClass("slick-initialized")){
                $('.b-country-wrap').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 600,
                });
            }
            if(!$('.b-4-slider').hasClass("slick-initialized")){
                $('.b-4-slider').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 600,
                    //autoplay: true,
                    autoplaySpeed: 3000,
                });
            }
        }else{
            var nextRow = 0;
            $(".b-popular .b-country-list .b-country-item").each(function() {
                if($(this).parents(".b-country-slider").length){
                    nextRow = 2;
                }else{
                    nextRow++;
                }
                if(nextRow >= rowCountry){
                    $(this).addClass("no-margin");
                    nextRow = 0;
                }
            });
            if($('.b-statistics-slider').hasClass("slick-initialized")){
                $('.b-statistics-slider').slick('unslick');
                setTimeout(function(){
                    $('.b-statistics-slider').slick('unslick');
                },100);
            }
            if($('.b-country-wrap').hasClass("slick-initialized")){
                $('.b-country-wrap').slick('unslick');
                setTimeout(function(){
                    $('.b-country-wrap').slick('unslick');
                },100);
                $('.b-country-wrap').unwrap();
            }
            if($('.b-4-slider').hasClass("slick-initialized")){
                $('.b-4-slider').slick('unslick');
                setTimeout(function(){
                    $('.b-4-slider').slick('unslick');
                },100);
            }
        }

    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    $(window).scroll(function (){
        if ($(this).scrollTop() > 70){
            $('.b-menu').addClass("transform");
            $('.b-head .b-logo').addClass("hide-logo");
        } else{
            $('.b-menu').removeClass("transform");
            $('.b-head .b-logo').removeClass("hide-logo");
        }
    });

    var scene = document.getElementById('coin-parallax');
    if(scene && !isMobile){
        var parallax = new Parallax(scene);
    }

    // ==========flip-cards==========

    function randomCards() {
        var rand = Math.floor(Math.random() * countCards);
        arrCards.push(rand);
        for (var i = 0; i < 20; i++) {
            do{
                rand = Math.floor(Math.random() * countCards);
            }while(arrCards[arrCards.length - 1] == rand);
            arrCards.push(rand);
        };
    }
    function randomOperators() {
        for (var i = countOperators, j = 0; i > 0; i--, j++) {
            arrOperators.push(j);
        }
        shuffleArray(arrOperators);
    }
    function createCards() {
        var $template = $(".b-card-template"),
            $cont = $(".b-card-list");
        for (var i = 0; i < countCards; i++) {
            var $item = $template.clone().removeClass("b-card-template");
            $item.appendTo($cont);

            var nextOperator = getNextOperator();
            var $flip = $item.find(".flip-card-front");
            var $nextOperator = $(".b-operators-list .b-operators-item:eq("+nextOperator+")");
            $nextOperator.clone().appendTo($flip);
            arrActiveCards.push(nextOperator);

            nextOperator = getNextOperator();
            $flip = $item.find(".flip-card-back");
            $nextOperator = $(".b-operators-list .b-operators-item:eq("+nextOperator+")");
            $nextOperator.clone().appendTo($flip);
        }
    }
    // ==========
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    function getNextCard() {
        var next = arrCards[0];
        arrCards.splice(0, 1);
        arrCards.push(next);
        return next;
    }
    function getNextOperator() {
        var next = arrOperators[0];
        arrOperators.splice(0, 1);
        arrOperators.push(next);
        return next;
    }
    // ==========
    function reinitCards() {
        if(cardTimer){
            clearInterval(cardTimer);
        }
        arrActiveCards = [];
        arrOperators = [];
        arrCards = [];
        $(".b-card-list .b-card").remove();
        initCards();
    }
    function initCards() {
        if(countOperators > 0){

            randomCards();
            randomOperators();

            createCards();

            cardTimer = setInterval(function() {
                var nextCard = getNextCard(),
                    nextOperator = getNextOperator();
                while(arrActiveCards.indexOf(nextOperator) != -1){
                    nextOperator = getNextOperator();
                }
                var $nextCard = $(".b-card-list .b-card:eq("+nextCard+")");
                var $nextOperator = $(".b-operators-list .b-operators-item:eq("+nextOperator+")");
                if($nextCard.hasClass("flipped")){
                    //заменить front
                    var $cont = $nextCard.find(".flip-card-front");
                    $cont.find(".b-operators-item").remove();
                    $nextOperator.clone().appendTo($cont);
                    setTimeout(function() {
                        $nextCard.removeClass("flipped");
                    }, 800);
                }else{
                    //заменить back
                    var $cont = $nextCard.find(".flip-card-back");
                    $cont.find(".b-operators-item").remove();
                    $nextOperator.clone().appendTo($cont);
                    setTimeout(function() {
                        $nextCard.addClass("flipped");
                    }, 800);
                }
                arrActiveCards[nextCard] = nextOperator;
            }, 1000);
        }
    }

    // ====================

    $('.b-country-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        fade: true,
        cssEase: 'linear'
    });

    if($('.b-categories .b-country-list').length){
        var grid = $('.b-categories .b-country-list').isotope({
            itemSelector: '.b-country-item',
            layoutMode: 'fitRows'
        });
    }
    
    var step = 4,
        nowShow = 0,
        activeCategory = "";

    $(".b-categories-item").click(function () {
        $(".b-categories-item.active").removeClass("active");
        $(this).addClass("active");
        activeCategory = $(this).attr("data-class");
        nowShow = 0;
        reinitGrid();
    });

    $(".b-categories .show-more").click(function () {
        nowShow += step;
        reinitGrid();
        return false;
    });

    function reinitGrid () {
        var validCount = 0;
        $(".b-categories .show-more").removeClass("hide");
        grid.isotope({ filter: 
            function() {
                var checkClass = true;
                if(activeCategory){
                    checkClass = $(this).hasClass(activeCategory);
                }
                if(checkClass){
                    validCount++;
                }
                var checkCount = true;
                if(validCount > nowShow + step){
                    checkCount = false;
                    validCount--;
                }
                return checkClass && checkCount;
            } 
        });
        if(activeCategory){
            if(validCount == $(".b-country-item."+activeCategory).length){
                $(".b-categories .show-more").addClass("hide");
            }
        }else{
            if(validCount == $(".b-country-item").length){
                $(".b-categories .show-more").addClass("hide");
            }
        }
        
    }

    // $(".b-star-list").hover(function() {
    //     $(this).addClass("now-hover");
    // }, function() {
    //     $(this).removeClass("now-hover");
    // });

    // $(".b-star").hover(function() {
    //     $(this).addClass("highlight-h");
    //     $(this).prevAll(".b-star").addClass("highlight-h");
    // }, function() {
    //     $(this).removeClass("highlight-h");
    //     $(this).prevAll(".b-star").removeClass("highlight-h");
    // });

    // $(".b-star").click(function() {
    //     var $this = $(this);
    //     $this.parent().find(".b-star").each(function() {
    //         $(this).removeClass("highlight");
    //     });
    //     $this.addClass("highlight");
    //     $this.prevAll(".b-star").addClass("highlight");
    // });

    $(".b-select-chosen select").chosen({
        width: "100%",
        disable_search_threshold: 10000
    });

    // =========Турвизор=========

    if($(".b-tourvisor-header").length){
        var waitTourvisorH = setInterval(function(){
            if( $(".b-tourvisor-header .TVMainForm").length ){
                $(".b-tourvisor-header .tourvisor-preloader").hide();
                clearInterval(waitTourvisorH);
            }
        }, 30);
    }

    if($(".b-tourvisor-with-filter").length){
        //ждать пока турвизор загрузится
        var waitTourvisorF = setInterval(function(){
            if( $(".b-tourvisor-with-filter .TVSearchButton").length ){
                //нажать кнопку и ждать загрузки туров
                $(".b-tourvisor-with-filter .TVSearchButton").click();
                $(".b-tourvisor-with-filter .TVFilterForm").wrap("<div class='defaultTVFilterForm'></div>");
                $(".b-tourvisor-with-filter .defaultTVFilterForm .TVFilterForm").after($(".b-tourvisor-nav"));
                //заменить "Питание от"
                $(".b-tourvisor-with-filter .defaultTVFilterForm .TVMeal").after($(".b-TVMeal"));
                //заменить "Рейтинг"
                $(".b-tourvisor-with-filter .defaultTVFilterForm .TVRating").after($(".b-TVRating"));

                // Подписка в результатах поиска (после третьего отеля)
                setInterval(function(){
                    var $sub;
                    if( !$(".TVSRBodyContainer .b-search-subscribe-1").length && $(".blpricesort").length >= 3 ){
                        $sub = $("#b-search-subscribe-1").clone();
                        $sub.removeAttr("id");
                        $(".blpricesort").eq(2).after($sub);
                    }
                    if( !$(".TVSRBodyContainer .b-search-subscribe-2").length && $(".blpricesort").length >= 5 ){
                        $sub = $("#b-search-subscribe-2").clone();
                        $sub.removeAttr("id");
                        $(".blpricesort").eq(4).after($sub);
                    }
                    if( !$(".TVSRBodyContainer .b-search-pay").length && $(".blpricesort").length >= 7 ){
                        $sub = $("#b-search-pay").clone();
                        $sub.removeAttr("id");
                        $(".blpricesort").eq(6).after($sub);
                    }
                    bindValidate();
                }, 500);

                clearInterval(waitTourvisorF);
            }
        }, 30);

        $("input[name='food']").on('change', function(){
            var i = $(this).parent().index();
            $(".b-tourvisor-with-filter .TVMeal .TVOptionSelector").click();
            $(".tv_drop_panel").addClass("hidden");
            setTimeout(function () {
                $(".tv_drop_panel:not(.TVHide) .TVListBox .TVListBoxItem").eq(i).click();
                $(".tv_drop_panel").removeClass("hidden");
            }, 20)
        });

        $("input[name='rating']").on('change', function(){
            var i = $(this).parent().index();
            $(".b-tourvisor-with-filter .TVRating .TVOptionSelector").click();
            $(".tv_drop_panel").addClass("hidden");
            setTimeout(function () {
                if(i == 0){
                    $(".tv_drop_panel:not(.TVHide) .TVListBox .TVListBoxItem").eq(0).click();
                }else{
                    var count = $(".tv_drop_panel:not(.TVHide) .TVListBox .TVListBoxItem").length;
                    $(".tv_drop_panel:not(.TVHide) .TVListBox .TVListBoxItem").eq(count - i).click();
                }
                $(".tv_drop_panel").removeClass("hidden");
            }, 20)
        });
    }

    function bindValidate() {
        $(".TVSRBodyContainer .b-btn-submit.ajax").parents("form").each(function(){
            if(!$(this).hasClass("validate-on")){
                $(this).validate({
                    rules: {
                        email: 'email',
                        phone: 'customPhone'
                    },
                    errorElement : "span"
                });
                $(this).addClass("validate-on");
                if( $(this).find("input[name=phone]").length ){
                    $(this).find("input[name=phone]").each(function(){
                        var phoneMask = new IMask($(this)[0], {
                            mask: '+{7} (000) 000-00-00',
                            prepare: function(value, masked){
                                if( value == 8 && masked._value.length == 0 ){
                                    return "+7 (";
                                }

                                if( value == 8 && masked._value == "+7 (" ){
                                    return "";
                                }

                                tmp = value.match(/[\d\+]*/g);
                                if( tmp && tmp.length ){
                                    value = tmp.join("");
                                }else{
                                    value = "";
                                }
                                return value;
                            }
                        });
                    });
                }
            }
        });
    }

    function countryFind() {
        var country = $(".b-tourvisor-calendar").attr("data-country");
        $(".b-tourvisor-hidden .TVCalendarCountyList .TVCalendarRow").each(function() {
            if($(this).find(".TVCalendarCountryValue").text() == country){
                $(this).click();
                //чекать открытие попапа
                var waitCalendarPopup = setInterval(function(){
                    if($(".TVModalContainer .TVCalendarWindow").length){
                        //закрыть попап
                        $(".TVClosePopup").click();
                        //переместить календарь
                        $(".b-tourvisor-calendar-cont").append($(".TVCalendarWindowBody"));
                        clearInterval(waitCalendarPopup);
                        setTimeout(function() {
                            $("body").removeClass("TVHidePopup");
                        }, 400);
                        
                    }
                }, 10);
                return false;
            }
        });
    }

    if($(".b-tourvisor-hidden").length){
        $("body").addClass("TVHidePopup");
        var waitTourvisorHidden = setInterval(function(){
            if( $(".b-tourvisor-hidden .TVCalendar").length ){
                $(".calendar-preloader").hide();
                //подгрузить все страны
                if($(".b-tourvisor-hidden .TVCalendar .TVCalShowAll").length){
                    $(".b-tourvisor-hidden .TVCalendar .TVCalShowAll").click();
                    var waitCountryLoad = setInterval(function(){
                        if($(".b-tourvisor-hidden .TVCalendar .TVCalShowAll.TVExpanded").length){
                            countryFind();
                            clearInterval(waitCountryLoad);
                        }
                    }, 10);
                }else{
                    countryFind();
                }
                clearInterval(waitTourvisorHidden);
            }
        }, 30);
    }

    //переключение по месяцам
    $("body").on("click", ".b-tourvisor-calendar-cont .TVCalendarPrev, .b-tourvisor-calendar-cont .TVCalendarNext", function(){
        $("body").addClass("TVHidePopup");
        var waitPopup = setInterval(function(){
            if($(".TVModalContainer .TVCalendarWindow").length){
                $(".TVClosePopup").click();
                clearInterval(waitPopup);
                setTimeout(function() {
                    $("body").removeClass("TVHidePopup");
                }, 400);
                
            }
        }, 10);
    });

    $("body").on("click", ".TVCalDiagramItem", function(){
        if($(this).find(".TVCalDiagramNone").length == 0){
            $(".b-tourvisor-calendar-cont .b-btn").removeClass("hidden");
        }
    });

    $(".b-tourvisor-calendar-cont .b-btn").click(function() {
        $(".b-tourvisor-calendar-cont .TVCalShowTours a")[0].click();
        return false;
    });

    // // Первая анимация элементов в слайде
    // $(".b-step-slide[data-slick-index='0'] .slider-anim").addClass("show");

    // // Кастомные переключатели (тумблеры)
    // $(".b-step-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-tabs li.active").removeClass("active");
    //     $(".b-step-tabs li").eq(nextSlide).addClass("active");
    // });

    // // Анимация элементов в слайде
    // $(".b-step-slider").on('afterChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-slide .slider-anim").removeClass("show");
    //     $(".b-step-slide[data-slick-index='"+currentSlide+"'] .slider-anim").addClass("show");
    // });


    
	// var myPlace = new google.maps.LatLng(56.504379, 84.945910);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Моточки-клубочки"
	// });

});
$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false;

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

        if( myWidth > 1020 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
            rowCountry = 4;
        }else if( myWidth > 767 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
            rowCountry = 4;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
            rowCountry = 2;
        }

        var rowCountry = 4,
            nextRow = 0;
        $(".no-margin").removeClass("no-margin");
        $(".b-country-list .b-country-item").each(function() {
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
    if(scene){
        var parallax = new Parallax(scene);
    }

    var arrCards = [],
        arrOperators = [],
        arrActiveCards = [],
        countCards = 6,
        countOperators = $(".b-operators-list .b-operators-item").length;

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

    function initCards() {
        randomCards();
        randomOperators();
        $(".b-card").each(function(){
            var nextOperator = getNextOperator();
            var $cont = $(this).find(".flip-card-front");
            var $nextOperator = $(".b-operators-list .b-operators-item:eq("+nextOperator+")");
            $nextOperator.clone().appendTo($cont);
            arrActiveCards.push(nextOperator);

            nextOperator = getNextOperator();
            $cont = $(this).find(".flip-card-back");
            $nextOperator = $(".b-operators-list .b-operators-item:eq("+nextOperator+")");
            $nextOperator.clone().appendTo($cont);
        });
    }

    if(countOperators > 0){
        initCards();
        var cardTimer = setInterval(function() {
            var nextCard = getNextCard(),
                nextOperator = getNextOperator();
            while(arrActiveCards.indexOf(nextOperator) != -1){
                nextOperator = getNextOperator();
            }
            var $nextCard = $(".b-card:eq("+nextCard+")");
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

    $(".b-star-list").hover(function() {
        $(this).addClass("now-hover");
    }, function() {
        $(this).removeClass("now-hover");
    });

    $(".b-star").hover(function() {
        $(this).addClass("highlight-h");
        $(this).prevAll(".b-star").addClass("highlight-h");
    }, function() {
        $(this).removeClass("highlight-h");
        $(this).prevAll(".b-star").removeClass("highlight-h");
    });

    $(".b-star").click(function() {
        var $this = $(this);
        //здесь будет ajax-запрос
        $this.parent().find(".b-star").each(function() {
            $(this).removeClass("highlight");
        });
        $this.addClass("highlight");
        $this.prevAll(".b-star").addClass("highlight");
    });

    $(".b-select-chosen select").chosen({
        width: "100%",
        disable_search_threshold: 10000
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
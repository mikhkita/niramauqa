var clickToggle = false;

$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        isMobileSmall = false,
        rowCountry = 0,
        countCards = 0,
        countOperators = $(".b-operators-list .b-operators-item").length,
        arrCards = [],
        arrOperators = [],
        arrActiveCards = [],
        cardTimer = undefined,
        step = 16;

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
            isMobileSmall = false;
        }else if( myWidth > 767 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
            isMobileSmall = false;
        }else{
            isMobile = true;
            isMobileSmall = (myWidth <= 530);
        }

        var checkCards = countCards;
        if( isDesktop ){
            countCards = 6;
        }else if( isTablet ){
            countCards = 4;
        }else{
            countCards = 3;
            if( isMobileSmall ) countCards = 4;
        }
        if(countCards != checkCards){//если количество карточек изменилось
            reinitCards();
        }

        $(".no-margin").removeClass("no-margin");
        if(isMobile){
            step = 4;
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
                $('.b-popular .b-country-list > .b-country-item').wrapAll('<div class="b-country-wrap mobile-slider"></div>');
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
                    autoplay: true,
                    autoplaySpeed: 3000,
                });
            }
            if(!$('.b-review-slider').hasClass("slick-initialized")){
                $('.b-review-slider').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 600,
                });
            }
            if(!$('.b-article-slider').hasClass("slick-initialized")){
                $('.b-article-slider').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 600,
                    adaptiveHeight: true,
                    responsive: [
                        {
                          breakpoint: 530,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                          }
                        },
                      ]
                });
            }
            
        }else{
            step = 16;
            //удалить слайдеры
            $(".mobile-slider").each(function() {
                if($(this).hasClass("slick-initialized")){
                    $(this).slick('unslick');
                    if($(this).hasClass("b-country-wrap")){
                        $(".b-country-list").append($(".b-country-wrap .b-country-item"));
                        $('.b-country-wrap').remove();
                    }
                }
            });
            if( myWidth > 1090 ){
                rowCountry = 4;
            }else if( myWidth > 850 ){
                rowCountry = 3;
            }else{
                rowCountry = 2;
            }
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

    var slideoutRight = new Slideout({
        'panel': document.getElementById('panel-page'),
        'menu': document.getElementById('panel-menu'),
        'side': 'right',
        'padding': 300,
        'tolerance': 70
    });

    $('.b-menu-mobile').click(function() {
        slideoutRight.open();
        $('.b-menu-overlay').show();
        return false;
    });

    slideoutRight.disableTouch();

    slideoutRight.on('beforeopen', function() {
        slideoutRight.enableTouch();
    }).on('beforeclose', function() {
        slideoutRight.disableTouch();
        $(".b-menu-overlay").hide();
    }).on('close', function() {
        console.log("slideoutRight");
        $(window).scroll();
    });

    $('.b-menu-overlay').on('click', function() {
        if(slideoutRight.isOpen())
            slideoutRight.close();
        $(".b-menu-overlay").hide();
        return false;
    });

    $(window).scroll(function (){
        if ($(this).scrollTop() > 70 && isDesktop){
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

    var nowShow = 0,
        activeCategory = "";

    if($('.b-categories .b-country-list').length){
        var grid = $('.b-categories .b-country-list').isotope({
            itemSelector: '.b-country-item',
            layoutMode: 'fitRows'
        });
        reinitGrid();
    }

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

    function bindSearchForm(){
        // Клик по полю с выбором города
        $(".TVlocation, .TVDepFilter .TVTextBox").on("click", function(){
            if( !clickToggle ){
                $("a[href='#b-filter-city']").click();
                renderCities();
                clickToggleTrue();
            }
        });

        // Клик по полю с выбором страны
        $(".TVCountry").on("click", function(){
            if( !clickToggle ){
                $("a[href='#b-filter-country']").click();
                renderCountries();
                clickToggleTrue();
            }
        });
        
        // Клик по полю с выбором дат вылета
        $(".TVDates").on("click", function(){
            if( !clickToggle ){
                if( !$(".b-for-datepicker .tv_content").length ){
                    $(".b-for-datepicker").html($(".TVDataPicker .tv_content"));
                }
                $("a[href='#b-filter-dates']").click();

                setTimeout(function(){
                    $(".tv_dtp_left_button").click();
                    $(".tv_dtp_right_button").click();
                },200);
                renderDates();
                bindDates();
                clickToggleTrue();
            }
        });

        // Клик по полю с выбором количества дней
        $(".TVNights").on("click", function(){
            if( !clickToggle ){
                $("a[href='#b-filter-nights']").click();
                renderNights();
                bindNights();
                clickToggleTrue();
            }
        });

        // Клик по полю с выбором количества человек
        $(".TVTourists").on("click", function(){
            if( !clickToggle ){
                $("a[href='#b-filter-tourists']").click();
                renderTourists();
                bindTourists();
                clickToggleTrue();
            }
        });

        bindMoreFilters();
    }

    function renderCities(){
        $(".b-popup-city-list").html("");

        $(".TVLocationPanel .TVTableListBox .TVListBoxItem").each(function(){
            var col = $(this).parents(".TVCol").index(),
                row = $(this).parents(".TVTableBoxItem").index(),
                item = $(this).index(),
                className = ($(this).hasClass("TVDisabled"))?"class='disabled'":"",
                clickEvent = ($(this).hasClass("TVDisabled"))?("onclick='return false;'"):("onclick='chooseCity(\""+col+"\", \""+row+"\", \""+item+"\"); return false;'");

            $(".b-popup-city-list").append("<li><a href='#' "+className+" "+clickEvent+">"+$(this).text()+"</a></li>");
        });
    }

    function renderCountries(){
        $(".b-popup-country-list").html("");

        $(".TVChooseCountry .TVOtherCountries .TVListBoxItem, .TVChooseCountry .TVSimpleCountry .TVListBoxItem").each(function(){
            var col = $(this).parents(".TVListBox").index() - ( ($(this).parents(".TVSimpleCountry").length)?1:0 ),
                item = $(this).index();
            $(".b-popup-country-list").append("<li><a href='#' onclick='chooseCountry(\""+col+"\", \""+item+"\"); return false;'>"+$(this).text()+"</a></li>");
        });
    }

    function renderHotels(){
        if( !$(".b-for-hotels .TVHotel").length ){
            $(".b-for-hotels").html($(".TVSearch .TVHotel"));
        }
    }

    function renderNights(){
        // $(".b-nights-table").html($(".tv_dtp_calendar").html());
        var fromTo = $(".TVNights").text().split(" - ");
        renderNightsRange(fromTo[0], fromTo[1]);
    }

    function renderTourists(){
        if( !$(".b-tourists-popup .tv_content").length ){
            $(".b-tourists-popup").append($(".TVTouristDrop .tv_content"));
            //добавить свои селекты
            $(".TVChildAge").each(function(){
                var $select = $(".b-select-age #child-"+($(this).index()+1));
                $(this).append($select);
            });
        }
    }

    function renderNightsRange(from, to){
        $(".b-nights-table td").removeClass("active").removeClass("selected");
        $(".b-nights-popup .b-from-to .b-from, .b-nights-popup .b-from-to .b-to").text("");
        if( typeof to != "undefined" ){
            from = from*1;
            to = to*1;

            to = (to - from > 14)?(from + 14):to;

            to = (from - to > 14)?(from - 14):to;

            if( to < from ){
                var tmp = from;
                from = to;
                to = tmp;
            }

            $(".b-nights-popup .b-from-to .b-from").text(from);
            $(".b-nights-popup .b-from-to .b-to").text(to);

            for (var i = from + 1; i < to; i++) {
                $(".b-nights-table td:contains(#" + i + "#)").addClass("selected");
            }

            $(".b-nights-table td:contains(#"+from+"#), .b-nights-table td:contains(#"+to+"#)").addClass("active");
        }else{
            $(".b-nights-popup .b-from-to .b-from").text(from);
            $(".b-nights-table td:contains(#"+from+"#)").addClass("active");
        }
    }

    function renderDates(){
        var from = $(".TVDates").text().split(" - ").shift(),
            to = $(".TVDates").text().split(" - ").pop();

        $(".b-dates-popup .b-from-to .b-from").text(from);
        $(".b-dates-popup .b-from-to .b-to").text(to);
    }

    function bindRegions(){
        $(".b-regions-popup .b-btn").bind("click", function(){
            $.fancybox.close();

            renderHotels();

            $("a[href='#b-filter-hotels']").click();

            bindHotels();

            return false;
        });
    }

    function bindHotels(){
        $(".b-hotels-popup .b-btn").bind("click", function(){
            $.fancybox.close();

            return false;
        });
    }

    function bindNights(){
        $(".b-nights-table td, .b-nights-popup .b-btn").unbind("touchend");
        $(".b-nights-table td").unbind("touchend");

        $(".b-nights-table td").bind("touchend", function(){
            if( $(".b-nights-table td.active").length == 1 ){
                var from = $(".b-nights-table td.active").text().replace(/\D+/g,"");
                renderNightsRange(from, $(this).text().replace(/\D+/g,""));
            }else{
                renderNightsRange($(this).text().replace(/\D+/g,""));
            }
        });

        $(".b-nights-popup .b-btn").bind("click", function(){
            $(".b-nights-table td.active").each(function(){
                $(".tv_drop_panel.TVTable.TVChooseDrop .tv_dtp_calendar tr").eq($(this).parents("tr").index()).find("td").eq($(this).index()).click();
            });

            $.fancybox.close();

            return false;
        });
    }

    function bindTourists(){
        $("body").on("change", ".TVChildAge .b-select select", function(){
            $(this).parents(".TVChildAge").find(".TVTextBoxContent").text($(this).val()).attr("title", $(this).val());
        });
        $(".b-tourists-popup .TVTheme2Button").bind("click", function(){
            $.fancybox.close();
            return false;
        });
    }

    function bindDates(){
        $(".b-dates-popup .b-btn").bind("click", function(){
            $.fancybox.close();
            return false;
        });
    }

    $("body").on("touchend", ".tv_available_days", function(){
        setTimeout(renderDates, 100);
    });

    if( isMobile ){
        var locint = setInterval(function(){
            if( $(".tv-search-form.tv-loaded .TVlocation").length ){
                bindSearchForm();
                clearInterval(locint);
            }
        }, 1000);

    }

    var blockedDetail = false;
    function bindDetailPopup(){
        if( !blockedDetail ){
            blockedDetail = true;

            var hotInterval = setInterval(function(){
                if( $(".TVOrderHotelName").text() != "" ){
                    $(".TVOrderHotelName").html($(".TVOrderHotelName").html().replace(/\&nbsp\;/gi, ' '));

                    $(".TVSimpleImageSlider").after($(".TVCatHotelReviewBlock"));
                    $(".TVCatHotelReviewBlock").after($(".TVCatHotelTypeBlock"));

                    if( !$(".b-info-btn-cont").length ){
                        $(".TVOrderContinue").after("<div class='b-info-btn-cont'><a href='#' class='b-info-btn'>Вернуться к описанию отеля</a></div>");
                    }else{
                        $(".b-info-btn-cont").hide();
                    }

                    $(".TVSimpleImageSlider").touch();

                    $(".TVSimpleImageSlider").on("swipeLeft", function(){
                        $(".TVSNavRight").click();
                    });
                    $(".TVSimpleImageSlider").on("swipeRight", function(){
                        $(".TVSNavLeft").click();
                    });
                    $(".TVContractLink").replaceWith("<a href='/politics/' class='TVContractLink' target='_blank'></a>");
                    clearInterval(hotInterval);
                }
            }, 10);

            $("a[href='#b-detail-popup']").click();

            setTimeout(function(){
                blockedDetail = false;
            },50);
        }
    }

    if( isMobile ){
        var blocked3 = false,
            blockedTimeout3;

        $("body").on("click", ".TVHotButton", function(){
            blocked3 = true;

            clearTimeout(blockedTimeout3);
            blockedTimeout3 = setTimeout(function(){
                blocked3 = false;
            },50);
        });

        if( $(".b-content .tv-hot-tours").length ){
            setInterval(function(){
                if( $(".TVHotItem:not(.binded)").length ){
                    $(".TVHotItem:not(.binded)").on("click", function(e){
                        var $this = $(this);
                        setTimeout(function(){
                            if( !blocked3 ){
                                $this.find(".TVHotButton").click();

                                bindDetailPopup();
                            }
                        }, 10);
                    }).addClass("binded");
                }
            },300);
        }

        $("body").on("click", "div.TVTem2PriceContainer table tr, .TVTem2Name", function(e){
            bindDetailPopup();
        });

        var detailInterval = setInterval(function(){
            if( $(".TVModalContainer .TVOrderWindow").length ){
                $("#b-detail-popup .b-for-detail").html($(".TVModalContainer .TVOrderWindow"));
                clearInterval(detailInterval);
            }
        },100);

        $("body").on("click", ".b-info-btn", function(){
            $(".TVCatNavDesc").click();

            $(".b-info-btn-cont").hide();
        });
    }

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

function chooseCity(col, row, item){
    $(".TVLocationPanel .TVTableListBox .TVCol").eq(col).find(".TVTableBoxItem").eq(row).find(".TVListBoxItem").eq(item).click();
    $.fancybox.close();
}
function chooseCountry(col, item){
    $(".TVOtherCountries .TVListBox, .TVSimpleCountry .TVListBox").eq(col).find(".TVListBoxItem").eq(item).click();
    $.fancybox.close();
}
function scrollDropPanel(){
    if( !isMobile ){
        var rules = {
            ".TVLocationPanel" : ".TVLocationButton, .TVlocation",
            ".TVCountryCombo" : ".TVCountry",
            ".TVDataPicker" : ".TVDates",
            ".TVChooseDrop" : ".TVNights",
            ".TVTouristDrop" : ".TVTourists",
            ".TVSearch.TVTable" : "div.TVMiniForm.TVTheme2 div.TVSmartBox .TVArrow",
            ".TVSearch .TVDetailPanel" : "div.TVTheme2 .TVSmartBox .TVChoose"
        }
        if( $(".tv-search-form.tv-loaded").length ){
            for( var i in rules ){
                if( $(i).length && !$(i).hasClass("TVHide") ){
                    $(rules[i]).click();
                    $(rules[i]).click();
                    break;
                }
            }
        }
    }
}
function clickToggleTrue(){
    clickToggle = true;

    setTimeout(function(){
        clickToggle = false;
    }, 50);
}
function bindMoreFilters(){
    $(".TVRating .TVOptionSelector").unbind("click");
    $(".TVRating .TVOptionSelector").bind("click", function(){
        if( !clickToggle ){
            renderRating();
            $("a[href='#b-filter-rating']").click();
            clickToggleTrue();
        }
    });

    $(".TVMeal .TVOptionSelector").unbind("click");
    $(".TVMeal .TVOptionSelector").bind("click", function(){
        if( !clickToggle ){
            renderMeal();
            $("a[href='#b-filter-meal']").click();
            clickToggleTrue();
        }
    });

    $(".TVRegionHotel .TVOptionSelector").unbind("click");
    $(".TVRegionHotel .TVOptionSelector").bind("click", function(){
        if( !clickToggle ){
            renderResort();
            bindResort();
            $("a[href='#b-filter-resort']").click();
            clickToggleTrue();
        }
    });
}
function renderRating(){
    $(".b-popup-rating-list").html("");

    $(".tv_drop_panel:not(.TVHide) .TVListBoxItem").each(function(){
        var $this = $(this);
        $(".b-popup-rating-list").append("<li><a href='#' id='rating-"+$(this).index()+"'>"+$(this).text()+"</a></li>");
        $("#rating-"+$(this).index()).click(function(){
            $this.click();

            $.fancybox.close();
            return false;
        });
    });
}

function renderMeal(){
    $(".b-popup-meal-list").html("");

    $(".tv_drop_panel:not(.TVHide) .TVListBoxItem").each(function(){
        var $this = $(this);
        $(".b-popup-meal-list").append("<li><a href='#' id='meal-"+$(this).index()+"'>"+$(this).text()+"</a></li>");
        $("#meal-"+$(this).index()).click(function(){
            $this.click();

            $.fancybox.close();
            return false;
        });
    });
}

function renderResort(){
    if( !$(".b-resort-popup .tv_content").length ){
        $(".b-resort-popup").append($(".TVSearchCmbPanel .tv_content"));
        
    }
}
function bindResort() {
    $(".b-resort-popup .TVTheme2Button").bind("click", function(){
        $.fancybox.close();
        return false;
    });
}

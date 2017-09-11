'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, google */
app.partial.map = function() {


    var container = $('[role=main]');
    container.on('page:update:map', function(page, menu) {

        $('#twzipcode').twzipcode({language: '../zh-tw'});
        /* google maps api */
        window.initMap = initMap;
        var asyncApi = document.createElement('script');

        $(asyncApi)
            .attr('differ', '')
            .attr('async', '')
            .attr('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDjhRtBTGbo_5EgA9dl6qm3Q08Cd1_0NEM&callback=initMap');
        $('head').append(asyncApi);



        var map = null;
        var infowindow = null;
        $('form button').attr('disabled', 'disabled');

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14
            });
            setCenter();
            $('form button').on('click', function(e) {
                var zipcode = $('[name=zipcode]').val();
                setCenter();
                $('.branches ul li.br').removeClass('on');
                $('.branches ul li.br[data-zipcode=' + zipcode + ']').addClass('on');
                e.stopPropagation();
                e.preventDefault();
                return false;

            }).removeAttr('disabled');
            $.getJSON('../branches.txt', function(branches) {
                $('.branches ul li:not(.br.tpl)').remove();
                $(branches).each(function(i, branch) {
                    addMarker(branch);
                });
            });
            infowindow = new google.maps.InfoWindow({
                maxWidth: 600,
                maxHight: 600
            });
        }

        function setCenter(addr) {
            var addr = addr || 
                ($('[name=county]').val() + $('[name=district]').val() ) ||
                '台北市 內湖區';
            $.get('http://maps.google.com/maps/api/geocode/json?address=' + addr, function(coor) {
                // console.log(coor.results[0]);
                var latlng = coor.results[0].geometry.location;
                map.setCenter(latlng);
                map.setZoom(14);

            });
        }

        function addMarker(branch) {
            var icon = $('.marker').attr('data-src');
            var branches = [];
            // console.log(branch);
            function resolveAddr(addr){
                $.get('http://maps.google.com/maps/api/geocode/json?address=' + addr, function(coor) {
                    try{
                       add(coor.results[0].geometry.location, coor);
                    }catch(e){
                        setTimeout(function(){
                            resolveAddr(addr);
                        }, 1200);
                    }
                });
            }
            function add(latlng, coor){
                $.each(coor.results[0].address_components, function() {
                    if (this.types[0] == 'postal_code') {
                        branch.postalCode = this.short_name;
                    }
                });
                addBranch(branch);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latlng.lat, latlng.lng),
                    icon: new google.maps.MarkerImage(icon),
                    map: map
                });
                //設定當user縮放地圖時，若存在資訊視窗則關閉資訊視窗
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    if (infowindow) {
                        infowindow.close();
                    }
                });

                google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
                        infowindow.setContent('<p>' + branch.name + '</p><p>' + branch.addr + '</p><p>' + branch.tel + '</p>');
                        infowindow.open(map, marker);

                        // var click = 'Click_';
                        // if ($('html.mobile').length) {
                        //     click = 'Click_m_';
                        // }
                        // ga('send', 'event', 'Button', 'Click', click + locations[i].content);
                    };

                })(marker));
                google.maps.event.addListener(map, 'click', function() {
                    if (infowindow) {
                        infowindow.close();
                    }
                });
            }

            resolveAddr(branch.addr);
        }

        function addBranch(branch) {
            var tpl = $('.branches ul li.br.tpl');
            var br = tpl.clone().removeClass('tpl');
            var zipcode = $('[name=zipcode]').val();
            $('h3', br).html(branch.name);
            $('.tel', br).html(branch.tel);
            $('.addr', br).html(branch.addr);
            br.attr('data-zipcode', branch.postalCode);
            br.insertBefore(tpl);
            if (branch.postalCode == zipcode) {
                br.addClass('on');
            }
        }
    });

    if (container.hasClass('map')) {
        container.trigger('page:update:map', null);
    }

};

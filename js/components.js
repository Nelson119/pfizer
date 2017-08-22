"use strict";app.partial.home=function(){$("body").addClass("loading-done")},app.partial.map=function(){var e=$("[role=main]");e.on("page:update:map",function(e,a){function t(){l=new google.maps.Map(document.getElementById("map"),{zoom:14}),n(),$("form button").on("click",function(e){var a=$("[name=zipcode]").val();return n(),$(".branches ul li.br").removeClass("on"),$(".branches ul li.br[data-zipcode="+a+"]").addClass("on"),e.stopPropagation(),e.preventDefault(),!1}).removeAttr("disabled"),$.get("../branches.json",function(e){$(".branches ul li:not(.br.tpl)").remove(),$(e).each(function(e,a){o(a)})}),r=new google.maps.InfoWindow({maxWidth:600,maxHight:600})}function n(e){var e=e||$("[name=county]").val()+$("[name=district]").val()||"台北市 內湖區";$.get("http://maps.google.com/maps/api/geocode/json?address="+e,function(e){var a=e.results[0].geometry.location;l.setCenter(a),l.setZoom(14)})}function o(e){function a(e){$.get("http://maps.google.com/maps/api/geocode/json?address="+e,function(n){try{t(n.results[0].geometry.location,n)}catch(o){setTimeout(function(){a(e)},1200)}})}function t(a,t){$.each(t.results[0].address_components,function(){"postal_code"==this.types[0]&&(e.postalCode=this.short_name)}),i(e);var o=new google.maps.Marker({position:new google.maps.LatLng(a.lat,a.lng),icon:new google.maps.MarkerImage(n),map:l});google.maps.event.addListener(l,"zoom_changed",function(){r&&r.close()}),google.maps.event.addListener(o,"click",function(a){return function(){r.setContent("<p>"+e.name+"</p><p>"+e.addr+"</p><p>"+e.tel+"</p>"),r.open(l,a)}}(o)),google.maps.event.addListener(l,"click",function(){r&&r.close()})}var n=$(".marker").attr("data-src");a(e.addr)}function i(e){var a=$(".branches ul li.br.tpl"),t=a.clone().removeClass("tpl"),n=$("[name=zipcode]").val();$("h3",t).html(e.name),$(".tel",t).html(e.tel),$(".addr",t).html(e.addr),t.attr("data-zipcode",e.postalCode),t.insertBefore(a),e.postalCode==n&&t.addClass("on")}$("#twzipcode").twzipcode({language:"../zh-tw"}),window.initMap=t;var s=document.createElement("script");$(s).attr("differ","").attr("async","").attr("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyDjhRtBTGbo_5EgA9dl6qm3Q08Cd1_0NEM&callback=initMap"),$("head").append(s);var l=null,r=null;$("form button").attr("disabled","disabled")}),e.hasClass("map")&&e.trigger("page:update:map",null)},app.partial.quiz=function(){var e=$("[role=main]");e.on("page:update:quiz",function(e,a){$(".quiz1 button label").on("click",function(){return $("[name=q1_option]:checked").val()?void $(".quiz1-result article").eq($("[name=q1_option]:checked").parent().index()).siblings().addClass("hide"):(alert("請選擇一個級別"),!1)}),$(".quiz2-page1 button.next label").on("click",function(e){if(!$("[name=quiz2question1]:checked").val()||!$("[name=quiz2question2]:checked").val()||!$("[name=quiz2question3]:checked").val())return alert("請回答所有問題再按下一頁"),!1}),$(".quiz2-page2 button.next label").on("click",function(e){if(!$("[name=quiz2question4]:checked").val()||!$("[name=quiz2question5]:checked").val())return alert("請回答所有問題再按検視測験結果"),!1;var a=1*$("[name=quiz2question1]:checked").val()+1*$("[name=quiz2question2]:checked").val()+1*$("[name=quiz2question3]:checked").val()+1*$("[name=quiz2question4]:checked").val()+1*$("[name=quiz2question5]:checked").val();console.log(a),a>20?($(".quiz2-result .result-1").addClass("on"),$(".quiz2-result .result-2").removeClass("on")):($(".quiz2-result .result-2").addClass("on"),$(".quiz2-result .result-1").removeClass("on")),$(".quiz2-result .point").html(a)}),$(".quiz2-result [for=quiz2page1]").on("click",function(){$("[name^=quiz2question]").removeAttr("checked")}),$("#btnED").on("click",function(){$("#ED").addClass("on")})}),e.hasClass("quiz")&&e.trigger("page:update:quiz",null)},app.partial.distinguish=function(){var e=$("[role=main]");e.on("page:update:distinguish",function(e,a){}),e.hasClass("distinguish")&&e.trigger("page:update:distinguish",null)},app.partial.statistics=function(){var e=$("[role=main]");e.on("page:update:statistics",function(e,a){}),e.hasClass("statistics")&&e.trigger("page:update:statistics",null)},app.partial.articles=function(){var e=$("[role=main]");e.on("page:update:articles",function(e,a){$(".video-container .video").lightGallery({controls:!1,autoplay:!1,download:!1,counter:!1,zoom:!1,share:!1,youtubePlayerParams:{modestbranding:1,showinfo:0,rel:0,controls:0}})}),e.hasClass("articles")&&e.trigger("page:update:articles",null)};
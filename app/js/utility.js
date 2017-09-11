'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.utility = new (function(){


	//判斷是否具有屬性
	$.fn.hasAttr = function(attributeName){
		var attr = $(this).attr(attributeName);
		if (typeof attr !== typeof undefined && attr !== false) {
			return true;
		}else{
			return false;
		}
	};


	var campaignName = encodeURIComponent('pfizer');
	var defaultTitle = encodeURIComponent('性福在此一舉');
	var defaultHref = encodeURIComponent('http://www.behard.com.tw/');
	this.share = {
		facebook: function(href, title){
			href = encodeURIComponent(href || defaultHref + '?utm_source=facebook&utm_medium=share&utm_campaign='+ campaignName);
			title = encodeURIComponent(title || defaultTitle);
			window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);
		},
		googleplus: function(href){
			href = encodeURIComponent(href || defaultHref + '?utm_source=g+&utm_medium=googleplus_m&utm_campaign='+ campaignName);
			window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		},
		email: function(href, title){
			href = encodeURIComponent(href || defaultHref + '?utm_source=email&utm_medium=email_m&utm_campaign='+ campaignName);
			title = encodeURIComponent(title || defaultTitle);
			var body = encodeURIComponent(''+href+' #' +title+'');
			window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:'+title+'&body='+body+'&bcc=');
		},
		line: function(href, title){
			href = href || defaultHref + '?utm_source=line&utm_medium=share&utm_campaign='+ campaignName;
			title = title || defaultTitle;
			var body = encodeURIComponent(''+href+' #' +title+'');
			window.open('http://line.me/R/msg/text/?' + title + '%0D%0A' + href);
		}
	};


	this.getParam = function(name){
		var r = new RegExp('^.*[?&]'+name+'[=]([^&]+).*$', 'i');
		if(!r.test(location.search)){
			return null;
		}
		var value = location.search.replace(r,'$1');
		return decodeURIComponent(value);
	};


});	

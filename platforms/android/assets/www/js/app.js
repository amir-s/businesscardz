//// Usage
// var sliderEl = document.querySelector('#mySlider .slide-group');
// ratchetSliderSetPage(sliderEl, 1);
 
var ratchetSliderSetPage = function (sliderEl, page) {
  var sliderWidth = sliderEl.offsetWidth;
  var offsetX = -1 * page * sliderWidth;
  sliderEl.style['-webkit-transition-duration'] = '.2s';
  sliderEl.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
};
 
 
 
// jQuery / Zepto plugin
//// Usage
// $('#mySlider .slide-group').ratchetSliderSetPage(1);
 
(function(){
  var $ = window.jQuery || window.Zepto || window.$;
  if ($ && $.fn) {
    $.fn.ratchetSliderSetPage = function (page) {
      ratchetSliderSetPage(this[0], page);
      return this;
    };
  }
})();


var themes = [
	{
		bg: 'img/theme-0.gif',
		orientation: 'portrait-primary',
		fields: {
			name: {
				top: '250px',
				left: '10px'
			},
			email: {
				top: '245px',
				left: '10px'	
			}
		}
	},
	{
		bg: 'img/theme-1.gif',
		orientation: 'portrait-primary',
		fields: {
			name: {
				top: '400px',
				left: '10px'
			},
			email: {
				top: '400px',
				left: '10px'	
			}
		}
	},
	{
		bg: 'img/theme-0.gif',
		orientation: 'landscape-primary',
		fields: {
			name: {
				top: '145px',
				left: '270px'
			},
			email: {
				top: '145px',
				left: '280px'	
			},
			color: 'black'
		}
	}
]

$(function() {
	ionic.Platform.ready(function () {


		if(window.cordova && window.cordova.plugins.Keyboard) cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		if (window.StatusBar) StatusBar.hide();	
		if (window.navigationbar && window.navigationbar.setUp) window.navigationbar.setUp(true);
		// if (screen.lockOrientation) screen.lockOrientation('portrait');

		

		$("#login_btn").click(function (e) {
			if (window.navigationbar && window.navigationbar.setUp) window.navigationbar.setUp(true);

			e.preventDefault();

			navigator.googleConnectPlugin.googleLogin(function (obj) {
				$("#fillout-name").val(obj.Name);	
				$("#fillout-email").val(obj.Email);	
				$("#step-login").slideUp();
				$("#step-fillout").slideDown();

			}, function (msg) {
				alert('error: ' + msg);
			});
		});

		$("#go-to-themes").click(function (e) {
			e.preventDefault();


			var html = '';
			themes.forEach(function (theme) {
				html += ('<div class="slide"><div class="biz-bg" style="background-image: url(\'' + theme.bg + '\')">');
				html += '<h1 class="biz-name" style="top:'+theme.fields.name.top+'; left:'+theme.fields.name.left+ (theme.fields.color?('; color:'+theme.fields.color):'')+'">'+$("#fillout-name").val()+'</h1>';
				html += '<h2 class="biz-email" style="top:'+theme.fields.email.top+'; left:'+theme.fields.email.left+(theme.fields.color?('; color:'+theme.fields.color):'')+'">'+$("#fillout-email").val()+'</h2>';
				html += '</div></div>';
			})
			$("#step-theme").html('<div class="slider" id="themes-slider">\
					<div class="slide-group">'+html+'\
					</div>\
				</div>');
			document.querySelector('#themes-slider').addEventListener('slide', function (e) {
				if (screen.lockOrientation) screen.lockOrientation(themes[e.detail.slideNumber].orientation);
				console.log(e.detail.slideNumber);
				setTimeout(function () {
					$('#themes-slider .slide-group').ratchetSliderSetPage(e.detail.slideNumber);
					console.log("here");
				}, 500);
			});


			$("#step-fillout").slideUp();
			$("#step-theme").slideDown();




		})


	})
});
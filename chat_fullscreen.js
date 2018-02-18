function switch_fullscreen() {
	chat_box = $(`
    <div id="xx-chat" class="ui-widget-content" style="z-index: 1234; cursor:all-scroll; position: absolute; background: transparent; border: 0; opacity: 0.7;">
      <p style="padding-top: 10px; background: purple; opacity: 0.1;"><p/>
      <iframe scrolling="yes" allowTransparency="true" id="xx-iframe" src="/embed${window.location.pathname}/chat?darkpopout"
          height="400" width="300"></iframe>
    </div>`);
	
	$(".video-player__container").append(chat_box);
	$(chat_box).draggable({iframeFix: true}).resizable({alsoResize: "#xx-iframe"});
	
	var fullscreen_button = document.getElementsByClassName("qa-fullscreen-button");
	fullscreen_button[0].click();
}

var is_fullscreen = false;
function switch_windowed(){
	is_fullscreen = !is_fullscreen;
	
	if( !is_fullscreen ) {
		$( "#xx-chat" ).remove();
	}
}

function initChat() {
  $('head').append('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" />');
  
  fullscreen_btn = $(`
	<div id="xx-btn" style="z-index: 1234; background: transparent; opacity: 0.1; position: absolute; bottom:0; right:0; border: 0;">
		<button>FS</button>
	</div>`);
  	
  $(".video-player__container").append(fullscreen_btn);
  
  // Add click event listener
  document.getElementById("xx-btn").addEventListener("click", switch_fullscreen);
  // Add ESC button handler (when exiting fullscreen)
  document.addEventListener('webkitfullscreenchange', switch_windowed);
  
}

var initFinished = false;
function main() {
	var maxRetries 	= 5;
	var retries 	= 0;
	
	// Wait for fullscreen button to appear so we know that we're on a viewer page.
	var checkExist = setInterval(function() {
		if ($('.qa-fullscreen-button').length) {
			// Start the script.
			initChat();
			initFinished = true;
		
			// Exit from wait.
			clearInterval(checkExist);
		} else {
			retries += 1;
			
			if( retries >= maxRetries )
			{
				// We're not on a view browser page.
				clearInterval(checkExist); // exit
			}
		}
	}, 500); // check every 500ms
}

// Add callbacks for leaving the page.
$(document).on('click', 'a', onRedirect);

window.onpopstate = function(event) {
	onRedirect();
}

function onRedirect() {	
	
	if ($('#xx-btn').length) {
		$( "#xx-btn" ).remove();
	}
	
	// Restart script.
	setTimeout(function() {
		main();
	}, 500 );
	
}

main();


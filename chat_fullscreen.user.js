// ==UserScript==
// @name         Twitch FullScreen Chat
// @version      0.11
// @description  Adds a button to Twitch player that adds the ability to view Twitch in fullscreen with chat window open.
// @copyright    2018, exploder2013
// @license 	 MIT
// @author       exploder2013
// @match        https://www.twitch.tv/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;
var debug = false;
var isFullscreen = false;
var wasChatboxInitiallyHidden = false;

(function() {
    'use strict';

    // Load the main function
    main()

    document.addEventListener('webkitfullscreenchange', changedFullscreen, false);
	document.addEventListener('fullscreenchange', changedFullscreen, false);

    // Add callbacks for leaving the page.
    $(document).on('click', 'a', onRedirect );

    window.onpopstate = function(event) {
      onRedirect();
    }
})();

function changedFullscreen()
{
    var fullscreenHandlerTimeout = setTimeout(function(){
        //if we exit fullscreen restore default chat
        isFullscreen = (window.innerHeight === screen.height);
        if( !isFullscreen ) { RemoveChat(); }
    },300);
}

function RemoveChat()
{
    if(!wasChatboxInitiallyHidden) {
        var chatboxToggleButton = $("button[data-a-target='right-column__toggle-collapse-btn']");
        var isChatboxVisible = $("div[data-a-target='right-column-chat-bar']").length > 0;

        if(!isChatboxVisible && chatboxToggleButton.length > 0) {
            chatboxToggleButton[0].click();
            console.log("Main chatbox shown!");
        }
    }

    if($( "#xx-chat" ).length > 0) {
        $( "#xx-chat" ).remove();
    }
}

function LoadChat() {
    if( $( "#xx-chat" ).length )
    {
        RemoveChat();
        $( ".qa-fullscreen-button" ).click();

        return;
    }

    var chatboxToggleButton = $("button[data-a-target='right-column__toggle-collapse-btn']");
    var isChatboxVisible = $("div[data-a-target='right-column-chat-bar']").length > 0;

    wasChatboxInitiallyHidden = !isChatboxVisible;
    if(isChatboxVisible && chatboxToggleButton.length > 0) {
        chatboxToggleButton[0].click();
        console.log("Main chatbox hidden!");
    }

	var chat_box = $(`
    <div id="xx-chat" class="ui-widget-content" style="z-index: 1234; cursor:all-scroll; position: absolute; background: transparent; border: 0;">
      <p style="padding-top: 10px; background: purple; opacity: 0.1;"><p/>
      <iframe scrolling="yes" style="opacity: 0.85;" allowTransparency="true" id="xx-iframe" src="/embed${window.location.pathname}/chat?darkpopout"
          height="400" width="300"></iframe>
    </div>`);

	$(".video-player__container").append(chat_box);
	$(chat_box).draggable( {iframeFix: true, snap: ".pl-overlay" } ).resizable( {alsoResize: "#xx-iframe"} );

    // Click fullscreen button
    $( ".qa-fullscreen-button" ).click();
}

function loadJQueryHeaders()
{
	 $('head').append('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" />');
}

function initChatFullscreenButton() {

	// Create fullscreen button if it doesn't exitst
	if( $('#xx-btn').length === 0 )
	{
  		var fullscreen_image = $(`
   		   <input type="image" id="xx-btn" class="player-button" style="right: 10px;" src="https://www.materialui.co/materialIcons/navigation/fullscreen_white_192x192.png" />
  			`);

  		$(".player-buttons-right").append(fullscreen_image);
	} else {
		// Remove old event handlers
		$("#xx-btn").off();
	}

    $( "#xx-btn" ).click(function() {
        LoadChat()
    });
}


var timer;
function addMouseHideEvents()
{
	// Add mousemove handler for video player.
	$( ".video-player__container" ).mousemove( function( event )
	{
		clearTimeout( timer );
		timer = 0;

		$( '.video-player__container' ).css( "cursor", "default" );

		// Create timer for mouse hiding.
		timer = setTimeout( function() {
			$( '.video-player__container' ).css( "cursor", "none" );
		}, 2000 );
	});

	// Add mouseout handler for video player to show mouse.
	$( ".video-player__container" ).mouseout( function( event )
	{
		// Don't handle loading events, as they make mouse appear again
		if( $( '.video-player__container' ).is( ':hover' ) ) { return; }

		clearTimeout( timer );
		timer = 0;

		$( '.video-player__container' ).css( "cursor", "default" );
	});

}

var initFinished = false;
function main() {
	var maxRetries 	= 100;
	var retries 	= 0;

	// Wait for fullscreen button to appear so we know that we're on a viewer page.
	var checkExist = setInterval(function() {

		// Check if player is loaded and the miniplayer is not actiaved (not supported);
		if ( $('.qa-fullscreen-button').length !== 0 && $( "div[data-test-selector='persistent-player-mini-title']" ).length === 0 )
		{
			// Remove the old fullscreen button if it exists.

			// Start the script.
			loadJQueryHeaders();
			initChatFullscreenButton();
			initFinished = true;

			// Add the mouse hiding event to player.
			addMouseHideEvents();

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

function CheckIfLoaded()
{
    return ( '#xx-btn' ).length === 0;
}

function Load()
{
    main();
}

function onRedirect() {
	// Restart script.
	setTimeout(function() {

        if( !CheckIfLoaded() )
            Load();

	}, 1000 );
}

import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const options = { // lookup the options in the docs for more options
	playbackRates: [0.5, 1.0, 2.0, 4, 8, 16],
	autoplay: true,
	controls: true,
	responsive: true,
	fluid: true,
}


export const VideoJS = ({onReady, source}) => {
	const customButtons = [
		{
			content: '>|', title: ('videojs.nextframe'), onClick: (p) => {
				p.currentTime(p.currentTime() + 1);
				p.pause()
			}
		},
		{
			content: '', title: '', onClick: (p) => {
			}
		},
	]

	const videoRef = React.useRef(null);
	const playerRef = React.useRef(null);

	React.useEffect(() => {
		// make sure Video.js player is only initialized once
		if (!playerRef.current) {
			const videoElement = videoRef.current;
			if (!videoElement) return;

			const player = playerRef.current = videojs(videoElement, options, () => {
				console.log("player is ready");
				onReady && onReady(player);
			});
			
			for(const b of customButtons){
				if(!b.title) continue
				const customButton = player.controlBar.addChild("button");
				const customButtonDom = customButton.el();
				customButtonDom.innerHTML = b.content;
				customButtonDom.title = b.title;
				customButton.addClass("buttonClass");
				customButtonDom.onclick = function () {
					b.onClick(player);
				}	
			}
			

		} else {
			console.log(source)
			// you can update player here [update player through props]
			const player = playerRef.current;
			player.src(source)
			// player.autoplay(options.autoplay);
			// player.src(options.sources);
		}
	}, [videoRef, source]);

	// Dispose the Video.js player when the functional component unmounts
	React.useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<video ref={videoRef} className="video-js vjs-big-play-centered" width="500px" height="500px"/>
		</div>
	);
}

export default VideoJS;
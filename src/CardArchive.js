import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import VideoJS from './VideoJS';

export default function CardArchive() {
	const {t} = useTranslation()
	const [source, setSource] = useState('')
	const files = [
		'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h265/1080/Big_Buck_Bunny_1080_10s_30MB.mp4',
		'https://www.learningcontainer.com/download/sample-mp4-video-file-download-for-testing/?wpdmdl=2727&refresh=6228a5ec9b7ed1646831084',
		'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	]

	const playerRef = React.useRef(null);

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// you can handle player events here
		player.on('waiting', () => {
			console.log('player is waiting');
		});

		player.on('dispose', () => {
			console.log('player will dispose');
		});
	};

	// const changePlayerOptions = () => {
	//   // you can update the player through the Video.js player instance
	//   if (!playerRef.current) {
	//     return;
	//   }
	//   // [update player through instance's api]
	//   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
	//   playerRef.current.autoplay(false);
	// };


	const getFileName = (url) =>{
		const obj = new URL(url)
		return obj.pathname
	}
	return <div className="card-archive">
				<VideoJS onReady={handlePlayerReady} source={source}/>
		<button onClick={()=>setSource(files[0])}>Play 265</button>
		<button onClick={()=>setSource(files[2])}>Play 264</button>
	</div>
}
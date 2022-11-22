import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useCallback, useEffect, useRef } from 'react'

interface Subtitles {
	kind: string;
	label: string;
	src: string;
	srcLang: string;
}

const MoviePlayer = ({ movieUrl, subtitles, isMp4 }: { movieUrl: string, subtitles: Subtitles[] | any, isMp4: boolean }) => {

	const playerRef: any = useRef(null);

	const onError = useCallback(() => {
		if(playerRef.current !== null) {
			playerRef.current.seekTo(0, 'seconds');
		}
	}, [playerRef.current])

	return (
		<>
			<Container
				className="bg-dark p-0"
				style={{ minHeight: '720px', maxHeight: '60vh' }}
				fluid
			>
				<ReactPlayer
					ref={playerRef}
					url={movieUrl}
					controls={isMp4}
					playing={true}
					width="100%"
					onError={onError}
					style={{
						objectFit: 'cover',
						minHeight: '720px',
						maxHeight: '60vh',
						zIndex: '10',
					}}
					config={{
						file: {
							tracks: subtitles,
						},
					}}
				/>
			</Container>
		</>
	);
};

export default MoviePlayer;

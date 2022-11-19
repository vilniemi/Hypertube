import { MovieData, Crew, Cast } from '../../types/appTypes';
import { Card, Row, Col, Collapse, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const MovieDescription = ({
	movieData,
	crew,
	cast,
}: {
	movieData: MovieData | undefined;
	crew: Array<Crew> | undefined;
	cast: Array<Cast> | undefined;
}) => {
	const [openDescription, setOpenDescription] = useState(false);
	const { t }: i18translateType = useTranslation('common');
	const [producer, setProducer] = useState('');

	useEffect(() => {
		const getProducer = () => {
			const first = crew?.find((obj) => {
				return obj.job === 'Producer';
			});

			if (first) {
				setProducer(first.name);
				console.log(first.name);
			}
		};

		if (crew) {
			getProducer();
		}
	}, [crew]);

	return (
		<>
			<Container className="ms-0 p-0 mb-3" fluid>
				<Button
					variant="transparent"
					onClick={() => setOpenDescription(!openDescription)}
					aria-controls="description-section"
					aria-expanded={openDescription}
				>
					{t('movieInfo.readMore')}
				</Button>
			</Container>
			<Collapse in={openDescription}>
				<Row id="description-section">
					<Col>
						<Row className="mb-3">
							<Card.Title className="fs-3">{t('movieInfo.plot')}</Card.Title>
							<Card.Text style={{ color: '#333' }}>{movieData?.Plot}</Card.Text>
						</Row>
						<Row>
							<div className="d-flex align-items-center mb-1">
								<Card.Title className="m-0 p-0">Imdb:</Card.Title>
								<Card.Text className="fs-5 ms-1">
									{movieData?.imdbRating}
								</Card.Text>
							</div>
							<div className="d-flex align-items-center ">
								<Card.Title className="m-0 p-0">
									{t('movieInfo.country')}:
								</Card.Title>
								<Card.Text className="fs-5 ms-1">
									{movieData?.Country}
								</Card.Text>
							</div>
							<Card.Title>
								<span>{t('movieInfo.category')}:</span>
								<strong>{movieData?.Genre}</strong>
							</Card.Title>
							<Card.Title>
								<span>{t('nav.language')}:</span>
								<strong>{movieData?.Language}</strong>
							</Card.Title>
						</Row>
					</Col>
					<Col>
						<Row className="mb-3">
							<Card.Title>
								<span>{t('movieInfo.director')}</span>
								&nbsp;
								<strong>{movieData?.Director}</strong>
							</Card.Title>
							<Card.Title>
								<span>Producer</span>
								&nbsp;
								<strong>{crew && producer}</strong>
							</Card.Title>
							<Card.Title>
								<span>{t('movieInfo.actors')}</span>
							</Card.Title>
							<Container></Container>
						</Row>
						{cast &&
							cast.map((actor: Cast) => (
								<div key={actor.id}>
									<Row>
										<Col xs={1}>
											{actor.profile_path && (
												<img
													src={
														'https://image.tmdb.org/t/p/w45' +
														actor.profile_path
													}
													className="rounded"
													alt="actor image"
												/>
											)}
										</Col>
										<Col>
											<strong>{actor.name}</strong>
											<br />
											{actor.character}
										</Col>
									</Row>
									<br />
								</div>
							))}
					</Col>
				</Row>
			</Collapse>
		</>
	);
};

export default MovieDescription;

{
	/*

)}


 <Collapse in={openDescription}>
<Row id="description-section">
	<Col>
		<Row className="mb-3">
			<Card.Title className="fs-3">{t('movieInfo.plot')}</Card.Title>
			<Card.Text style={{ color: '#333' }}>{movieData?.Plot}</Card.Text>
		</Row>
		<Row>
			<div className="d-flex align-items-center mb-1">
				<Card.Title className="m-0 p-0">Imdb:</Card.Title>
				<Card.Text className="fs-5 ms-1">
					{movieData?.imdbRating}
				</Card.Text>
			</div>
			<div className="d-flex align-items-center ">
				<Card.Title className="m-0 p-0">
					{t('movieInfo.country')}:
				</Card.Title>
				<Card.Text className="fs-5 ms-1">
					{movieData?.Country}
				</Card.Text>
			</div>
		</Row>
	</Col>
	<Col>
		<Row className="mb-3">
			<Card.Title>
				<span>{t('movieInfo.actors')}:</span>
				<strong>{movieData?.Actors}</strong>
			</Card.Title>
			<Card.Title>
				<span>{t('movieInfo.director')}:</span>
				<strong>{movieData?.Director}</strong>
			</Card.Title>
		</Row>
		<Row>
			<Card.Title>
				<span>{t('movieInfo.category')}:</span>
				<strong>{movieData?.Genre}</strong>
			</Card.Title>
			<Card.Title>
				<span>{t('nav.language')}:</span>
				<strong>{movieData?.Language}</strong>
			</Card.Title>
		</Row>
	</Col>
</Row>
</Collapse> */
}

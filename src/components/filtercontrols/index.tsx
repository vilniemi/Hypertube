import { Movie } from '../../types/appTypes';
import { Form, Accordion, Container } from 'react-bootstrap';
// import ListGroup from 'react-bootstrap/ListGroup';
import { FilterInputs } from '../../types/appTypes';
var _ = require('lodash');

import { useState } from 'react';
import AdvancedSearch from '../advancedSearch';

const FilterControls = ({
	onFilterChange,
	filterInputs,
}: {
	onFilterChange: EventTarget | any;
	filterInputs: FilterInputs;
}) => {
	const [genres, setGenres] = useState([
		'Action',
		'Comedy',
		'Drama',
		'Fantasy',
		'Horror',
		'Mystery',
		'Romance',
		'Thriller',
		'Western',
	]);
	// A Trip to the Moon (1902) is considered the first movie released
	const [years, setYears] = useState(_.range(1902, new Date().getFullYear()));
	const [ratings, setRatings] = useState(_.range(1, 10));
	return (
		<>
			<AdvancedSearch>
				<Form className="bg-transparent">
					<Form.Group className="d-flex flex-column mb-4 bg-transparent">
						<Form.Label className="text-white">Genre</Form.Label>
						<Form.Select
							aria-label="Genre"
							id="genre"
							name="genre"
							value={filterInputs.genre}
							onChange={(e) => onFilterChange(e)}
						>
							{genres.map((genre) => (
								<option key={genre + '1'}>{genre}</option>
							))}
						</Form.Select>
					</Form.Group>
					{/* <Form.Group className="d-flex flex-column mb-4">
						<Form.Label className="text-muted">Description</Form.Label>
						<Form.Control
							name="description"
							onChange={(e) => onFilterChange(e)}
							value={filterInputs.description}
						/>
					</Form.Group> */}

					<Form.Group className="mb-4">
						<Form.Label className="text-white">Rating</Form.Label>
						<Form.Select
							aria-label="Imdb rating"
							// defaultValue={7}
							id="imdbRating"
							name="imdbRating"
							value={filterInputs.imdbRating}
							onChange={(e) => onFilterChange(e)}
						>
							{ratings.map((rating: number) => (
								<option key={rating}>{rating}</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">From year</Form.Label>
							<Form.Select
								aria-label="From year"
								// defaultValue={new Date().getFullYear() - 10}
								id="fromYear"
								name="fromYear"
								value={filterInputs.fromYear}
								onChange={(e) => onFilterChange(e)}
							>
								{years.map((year: number) => (
									<option key={year}>{year}</option>
								))}
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">To year</Form.Label>
							<Form.Select
								aria-label="To year"
								// defaultValue={2021}
								id="toYear"
								name="toYear"
								value={filterInputs.toYear}
								onChange={(e) => onFilterChange(e)}
							>
								{years.map((year: number) => (
									<option key={year}>{year}</option>
								))}
							</Form.Select>
						</Container>
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">From runtime</Form.Label>
							<Form.Select
								aria-label="From runtime"
								// defaultValue={5}
								id="fromRunTime"
								name="fromRunTime"
								value={filterInputs.fromRunTime}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="0">0</option>
								<option value="30">30</option>
								<option value="60">60</option>
								<option value="90">90</option>
								<option value="120">120</option>
								<option value="300">300</option>
								<option value="5100">5100</option>
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">To runtime</Form.Label>
							<Form.Select
								aria-label="To runtime"
								// defaultValue={200}
								id="toRunTime"
								name="toRunTime"
								value={filterInputs.toRunTime}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="0">0</option>
								<option value="30">30</option>
								<option value="60">60</option>
								<option value="90">90</option>
								<option value="120">120</option>
								<option value="300">300</option>
								<option value="5100">5100</option>
							</Form.Select>
						</Container>
					</Form.Group>

					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">Order By</Form.Label>
							<Form.Select
								aria-label="Order By"
								// defaultValue="Desc"
								id="orderBy"
								name="orderBy"
								value={filterInputs.orderBy}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="desc">Descending</option>
								<option value="asc">Ascending</option>
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">Sort By</Form.Label>
							<Form.Select
								aria-label="Sort By"
								// defaultValue="rating"
								id="sortBy"
								name="sortBy"
								value={filterInputs.sortBy}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="title">title</option>
								<option value="year">year</option>
								<option value="rating">rating</option>
							</Form.Select>
						</Container>
					</Form.Group>
					<Form.Group className="d-flex align-items-center mb-4">
						<Container>
							<Form.Label className="text-white">Quality</Form.Label>

							<Form.Select
								aria-label="Quality"
								// defaultValue="720p"
								id="quality"
								name="quality"
								value={filterInputs.quality}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="SD">SD</option>
								<option value="720p">720p</option>
								<option value="1080p">1080p</option>
								<option value="3D">3D</option>
							</Form.Select>
						</Container>
						<Container>
							<Form.Label className="text-white">Seeds</Form.Label>
							<Form.Select
								aria-label="Seeds"
								// defaultValue="1"
								id="seeds"
								name="seeds"
								value={filterInputs.seeds}
								onChange={(e) => onFilterChange(e)}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="5">5</option>
								<option value="10">10</option>
							</Form.Select>
						</Container>
					</Form.Group>
				</Form>
			</AdvancedSearch>
		</>
	);
};

export default FilterControls;

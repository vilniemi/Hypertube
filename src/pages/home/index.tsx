import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movie } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import FilterControls from '../../components/filtercontrols';
import { useSession } from 'next-auth/react';
import LoadingLogo from '../../components/loadingLogo';
import { trpc } from '../../utils/trpc';
import { flexColCenter, flexRowCenter } from '../../styles/styleVariables';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import React, { lazy, Suspense } from 'react';

const Home = () => {
	const context = trpc.useContext();

	const [loader, setLoader] = useState(true);
	const { data: session, status } = useSession();
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [search_term, setsearch_ter] = useState('');
	const controller = new AbortController();
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const hasNextPage = true;
	const [error, setError] = useState(undefined);
	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: '1',
		genre: '',
		seeds: '1',
		fromYear: '0',
		language: '',
		toYear: '2021',
		search_term,
		fromRunTime: '0',
		toRunTime: '300',
		limit: '5',
		description: '',
		quality: '720p',
		page,
	});

	useEffect(() => {
		const getMovies = async () => {
			setIsLoading(true);
			try {
				const response = await axios('/api/movie', {
					method: 'POST',
					data: {
						search_term,
						fromYear: parseInt(filterInputs.fromYear),
						toYear: parseInt(filterInputs.toYear),
						fromRunTime: parseInt(filterInputs.fromRunTime),
						toRunTime: parseInt(filterInputs.toRunTime),
						imdbRating: parseInt(filterInputs.imdbRating),
						language: filterInputs.language,
						orderBy: filterInputs.orderBy,
						sortBy: filterInputs.sortBy,
						quality: filterInputs.quality,
						seeds: parseInt(filterInputs.seeds),
						description: filterInputs.description,
						genre: filterInputs.genre,
						page,
					},
				});
				setMovies(response.data);
			} catch (e) {
				console.log(e);
			}
			setIsLoading(false);
		};
		// if (isLoading) {
		// 	controller.abort();
		//}
		setPage(page + 1);
		getMovies();
	}, [filterInputs]);

	const getMovies = async () => {
		setIsLoading(true);
		setMovies([]);
		const response = await axios('/api/movie', {
			method: 'POST',
			data: {
				search_term,
				fromYear: parseInt(filterInputs.fromYear),
				toYear: parseInt(filterInputs.toYear),
				fromRunTime: parseInt(filterInputs.fromRunTime),
				toRunTime: parseInt(filterInputs.toRunTime),
				imdbRating: parseInt(filterInputs.imdbRating),
				orderBy: filterInputs.orderBy,
				language: filterInputs.language,
				sortBy: filterInputs.sortBy,
				quality: filterInputs.quality,
				seeds: parseInt(filterInputs.seeds),
				description: filterInputs.description,
				genre: filterInputs.genre,
				page,
			},
		});
		setMovies(response.data);
		setIsLoading(false);
	};

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
		getMovies();
		// console.log(name);
		// console.log(value);
	};
	const onFilterChange = (e: any) => {
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);

	const getMoviesTwo = async () => {
		// setError(true);
		// setLoading(true);
		const response = await axios('/api/movie', {
			method: 'POST',
			data: {
				search_term,
				fromYear: parseInt(filterInputs.fromYear),
				toYear: parseInt(filterInputs.toYear),
				fromRunTime: parseInt(filterInputs.fromRunTime),
				toRunTime: parseInt(filterInputs.toRunTime),
				imdbRating: parseInt(filterInputs.imdbRating),
				orderBy: filterInputs.orderBy,
				sortBy: filterInputs.sortBy,
				quality: filterInputs.quality,
				seeds: parseInt(filterInputs.seeds),
				description: filterInputs.description,
				genre: filterInputs.genre,
				page,
			},
		});
		setLoading(false);
		console.log(response.data);
		// setMovies(response.data);

		if (response.data.length < 50) {
			setHasMore(false);
		}
		movies;
		setMovies((movies) => [...movies, ...response.data]);

		console.log(movies);
		setError(undefined);
		// if (response.status === 201) {
		// 	const data = await response.json();
		// 	console.log(data);
		// 	if (data.filename) setPhoto(`/images/${data.filename}`);
		// } else {
		// 	setFileError(true);
		// }
	};

	const incrementPage = async () => {
		console.log('page');
		setPage(page + 1);
		getMoviesTwo();
	};

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: incrementPage,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: !!error,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});

	const renderLoader = () => <p>Loading</p>;
	return (
		<>
			<Container className="d-flex flex-column" fluid>
				{/* {loader ? (
					<LoadingLogo />
				) : ( */}
				<>
					<Container className="mb-4">
						<SearchNavBar
							onSearchChange={onSearchChange}
							search_term={search_term}
						/>
					</Container>
					<Container>
						<FilterControls
							onFilterChange={onFilterChange}
							filterInputs={filterInputs}
						/>
					</Container>

					<Container className="d-flex flex-wrap justify-content-center" fluid>
						<>
							{movies &&
								movies.map((movie: Movie) => (
									<MovieCard
										key={movie.id}
										movie={movie}
										style="homeMovieStyle"
										viewType="full"
									/>
								))}

							{/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
						</>
					</Container>
				</>
				{hasNextPage && (
					<Row>
						<div ref={infiniteRef}>Loading page: {page}</div>
					</Row>
				)}
			</Container>
		</>
	);
};

export default Home;

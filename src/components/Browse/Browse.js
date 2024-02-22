import React, { useEffect, useState } from "react";
import Header from "../Header";
import useAuth from "../../hooks/useAuth";
import { API_OPTIONS } from "../../utils/constants";
import Maincontainer from "./Maincontainer";
import Secondarycontainer from "./Secondarycontainer";
const Browse = () => {
	const { user } = useAuth();
	const [movieData, setMovieData] = useState(null);
	const getNowPlayingMovies = async () => {
		const res = await fetch(
			"https://api.themoviedb.org/3/movie/now_playing?page=1",
			API_OPTIONS,
		);

		const data = await res.json();
		console.log("data-->", data);
		setMovieData(data);
		// return data;
	};
	useEffect(() => {
		getNowPlayingMovies();
	}, []);

	console.log("Browse user-->", user);
	console.log("movieData-->", movieData);
	if (!movieData) return;
	return (
		<div>
			<Header className="mt-24" logoStyle="w-32 ml-12"></Header>
			<Maincontainer mainMovie={movieData?.results[7]}></Maincontainer>

			<Secondarycontainer movies={movieData?.results}></Secondarycontainer>
		</div>
	);
};

export default Browse;

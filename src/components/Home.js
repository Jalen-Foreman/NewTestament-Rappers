import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';


const Home = () => {
    
    const [artists, setArtists] = useState([])
    const [topSongs, setTopSongs] = useState('')

    // Spotify authorization
    let clientId = process.env.REACT_APP_CLIENTID
    let clientSecret = process.env.REACT_APP_CLIENT_SECRET

    let request = require('request'); // "Request" library

    // your application requests authorization
    
    let authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				Authorization:
					'Basic ' +
					new Buffer(clientId + ':' + clientSecret).toString('base64'),
			},
			form: {
				grant_type: 'client_credentials',
			},
			json: true,
		};
    
    
    const getTopSongs = (id) => {
                let result = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;
                setTopSongs(result)
            };
            
    
    useEffect(() => {
        
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // use the access token to access the Spotify Web API
                let token = body.access_token;
                let options1 = {
                    url: 'https://api.spotify.com/v1/artists?ids=3zSrc5vUlUxyDdS0KrxFJO,6s3XaJkcT7464G4oII9V41,7wNoL10WsnGtHLlGn1hUVa,3cPHYFWU14POI3ky9F4mNy,5S5NzLhymmK2iOsDqUEppY,7osFcSwjlRPwxZdVALIOuC,3jTD8sMuIA35Rw9PRrOE5L,0e6JPJ634Hw3I95aKMEaD7,4FSUzJqLiPvphtN6Y26uKY,1l528yNr0Jpv2dqg4r06kI,0i3IFzWtRtl3IDWx6GhECi,3CltJZLndpJKtpUyRVBB1k,7wrWSJHfACjw7s7gYXOXTt,0lx6baQe1oEBLm8jkDWI8v,1sPm31qmcbk9EFoRCS8eRl,7pDD4BBx6S42ZX513NQdp1,02gxa3HE5O0zBKRjeDh6Ba,3Pa1wXxunsWmALJOnjbfbQ,1VEtrxO5KlDXfYGKBI6Ldr,6vIEpnoY5ajDIcFQdbzz2j',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    json: true,
                };
                let options2 = {
                    url: topSongs,
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    json: true,
                };
                
                request.get(options1, function (error, response, body) {
                    setArtists(body.artists);
                });

                request.get(options2, function (error, response, body) {
                    console.log(body);
                })
            }
        });
    }, [topSongs])
    
    
    
    return (
        <div>
				<h1>NewTestament Rappers</h1>
				{artists.map((artist) => (
					<div key={artist.name}>
                        <img src={artist.images[1].url} alt='pic'/>
						<p>{artist.name}</p>
						<a href={artist.external_urls.spotify}>{artist.external_urls.spotify}</a>
                        <button onClick={() => getTopSongs(artist.id)}></button>
					</div>
				))}
			</div>
		);
}
export default Home
import { useState, useEffect } from "react";  //No JSX, we dont import the main react library
import API from '../API';
//Helpers
import { isPersistedState } from "../helpers";

export const useMovieFetch = movieId => {
    const[state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchMovie = async () => {
            try{
                setLoading(true);
                setError(false);
    
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
    
                //Get directors only out from the crew
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })
    
                setLoading(false);
    
            }catch(e){
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);

        if(sessionState){
            setState(sessionState);
            setLoading(false);
            return;  //dont go to fetchMovie() invocation below
        }
        
        fetchMovie();

    }, [movieId]);

    //Write to sessionStorage

    useEffect(()=>{
        sessionStorage.setItem(movieId, JSON.stringify(state)); //Only write string to the sessionStorage

    },[movieId, state]) //Always specify all dependencies

    return {state, loading, error};
};
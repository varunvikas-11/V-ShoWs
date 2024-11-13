import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [popularMovie, setPopularMovie] = useState([]);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);  // Changed hover value from -6 to -1

  useEffect(() => {
    const fetchPopularMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setPopularMovie(response.data.results[0]);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchPopularMovie();
  }, []);

  return (
    <Box sx={{ width: 900, display: 'flex', alignItems: 'center' }}>
      {/* Image aligned to the right by using marginLeft */}
    <div style={{position:"relative",left:"600px"}}>
      <img
        src={`https://image.tmdb.org/t/p/w500${popularMovie.poster_path}`}
        alt={popularMovie.title}
        style={{
          width: "400px",   // Set a fixed width for the image
          maxHeight: "600px",  // Adjust the height accordingly
          objectFit: "contain",
          marginRight: "auto",  // This moves the image to the right side
        }}
      />
</div>
      {/* Rating section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 2 }}>
        <Rating
          name="hover-feedback"
          value={popularMovie.vote_average / 2}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ mt: 6 }}>{labels[hover !== -9 ? hover : value]}</Box>
        )}
      </Box>
    </Box>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import {Image} from './Thumb.styles';

const Thumb = ({image, moveId, clickable}) => (
    <div>
        {clickable ? (
            <Link to={`/${moveId}`}>
                <Image src={image} alt='movie-thumb' />
            </Link>
        ) : (
            <Image src={image} alt='movie-thumb' />
        )}

    </div>
);

Thumb.propTypes = {
    image: PropTypes.string,
    moveId: PropTypes.number,
    clickable: PropTypes.bool
}

export default Thumb;
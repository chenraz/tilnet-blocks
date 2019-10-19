
import {useState} from 'react';
import StarRatingComponent from 'react-star-rating-component';

import {Star,StarHalf} from '@material-ui/icons';

import './style.scss';

const StarRating = (props) => {

    const defaults = {
        name: 'rating',
        normalColor:'#ffb400',
        hoverColor: '#f9c957',
        starCount: 5,
        renderStarIcon : ()=> (<Star className='star' style={{stroke: color,fill:color}} />),
        renderStarIconHalf: ()=>(<StarHalf className='half-star' style={{fill:color }} />),
    }

    const {
        name,
        rating,
        setRating,
        normalColor,
        hoverColor,
        starCount,
        renderStarIcon,
        renderStarIconHalf,
    } = {...defaults,...props};

    const [isHovered,setIsHovered] = useState(false);
    const [tempRating,setTempRating] = useState(false);

    const color = isHovered ? hoverColor : normalColor;

    const getRating = (nextValue,e) => {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    
        if (xPos <= 0.5) {
          nextValue -= 0.5;
        }
    
        return nextValue;
    }

    const onStarClick = (nextValue, prevValue, name, e) => {

        nextValue = getRating(nextValue,e);
        setRating(nextValue);
    }

    const onStarHover = (nextValue, prevValue, name, e) => {
        setIsHovered(true);  
        nextValue = getRating(nextValue,e);
        setTempRating(nextValue);
    }

    const onStarHoverOut = (nextValue, prevValue, name, e) => {
        setIsHovered(false);
        setTempRating(false);
    }

    return (
        <StarRatingComponent 
            name={name} 
            starCount={starCount}
            value={tempRating ? tempRating : rating}
            renderStarIcon={ renderStarIcon } 
            renderStarIconHalf={ renderStarIconHalf }

            onStarClick={ onStarClick }
            onStarHover={onStarHover}
            onStarHoverOut={onStarHoverOut}
        />         
    );
}

export default StarRating;
import firstPlaceImg from '../assets/images/star-unscreen.gif';
import secondPlaceImg from '../assets/images/mushroom-jumping-gif-unscreen.gif';
import thirdPlaceImg from '../assets/images/yoshi_coin.gif';
import noPodiumImg from '../assets/images/mario-coin-unscreen.gif';

const rankingStyles = {
  default: {
    imageSrc: noPodiumImg,
    background: {
      backgroundImage: `url(${noPodiumImg})`,
      backgroundSize: '30%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center',
    },
    img: {
      maxHeight: '40px',
      height: '4%',
    },
  },
  firstPlace: {
    imageSrc: firstPlaceImg,
    background: {
      backgroundImage: `url(${firstPlaceImg})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '50% 65%',
      backgroundPosition: 'center',
      backgroundColor: 'black',
    },
    img: {
      maxHeight: '80px',
      height: '8%',
    },
  },
  secondPlace: {
    imageSrc: secondPlaceImg,
    background: {
      backgroundImage: `url(${secondPlaceImg})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '50% 70%',
      backgroundPosition: 'center',
      backgroundColor: '#E0E0E0',
    },
    img: {
      maxHeight: '80px',
      height: '8%',
    },
  },
  thirdPlace: {
    imageSrc: thirdPlaceImg,
    background: {
      backgroundImage: `url(${thirdPlaceImg})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '50% 65%',
      backgroundPosition: 'center',
      backgroundColor: '#EB9F08',
    },
    img: {
      maxHeight: '80px',
      height: '8%',
    },
  },
  tableRow: {
    background1: {
      backgroundColor: '#F2D296',
      TableCell: {
        color: 'black',
        fontWeight: 'bold',
      },
    },
    background2: {
      backgroundColor: '#313131',
      TableCell: {
        color: 'white',
        fontWeight: 'bold',
      },
    },
  },
};

export default rankingStyles;

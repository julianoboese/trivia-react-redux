import firtsPlaceImg from '../star-unscreen.gif';
import secondPlaceImg from '../mushroom-jumping-gif-unscreen.gif';
import thirdPlaceImg from '../yoshi_coin.gif';
import noPodiumImg from '../mario-coin-unscreen.gif';

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
      maxHeight: '60px',
      height: '5%',
    },
  },
  firstPlace: {
    imageSrc: firtsPlaceImg,
    background: {
      backgroundImage: `url(${firtsPlaceImg})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '50% 65%',
      backgroundPosition: 'center',
      backgroundColor: 'black',
    },
    img: {
      maxHeight: '120px',
      height: '10%',
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
      maxHeight: '120px',
      height: '10%',
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
      maxHeight: '120px',
      height: '10%',
    },
  },
  tableRow: {
    background1: {
      backgroundColor: '#FFB834',
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

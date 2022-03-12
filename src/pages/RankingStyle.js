import firtsPlaceImg from '../star-unscreen.gif';
import secondPlaceImg from '../mushroom-jumping-gif-unscreen.gif';
import thirdPlaceImg from '../yoshi_coin.gif';
import noPodiumImg from '../mario-coin-unscreen.gif';

const rankingStyles = {
  defaultBackground: {
    backgroundImage: `url(${noPodiumImg})`,
    backgroundSize: '30%',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
  },
  firstBackground: {
    backgroundImage: `url(${firtsPlaceImg})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '50% 65%',
    backgroundPosition: 'center',
    backgroundColor: 'black',
  },
  secondBackground: {
    backgroundImage: `url(${secondPlaceImg})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '50% 65%',
    backgroundPosition: 'center',
    backgroundColor: '#E0E0E0',
  },
  thirdBackground: {
    backgroundRepeat: 'repeat-x',
    backgroundImage: `url(${thirdPlaceImg})`,
    backgroundSize: '50% 65%',
    backgroundPosition: 'center',
    backgroundColor: '#EB9F08',
  },
};

export default rankingStyles;

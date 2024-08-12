// Spades
import S1 from '../assets/spades/A.png';
import S2 from '../assets/spades/2.png';
import S3 from '../assets/spades/3.png';
import S4 from '../assets/spades/4.png';
import S5 from '../assets/spades/5.png';
import S6 from '../assets/spades/6.png';
import S7 from '../assets/spades/7.png';
import S8 from '../assets/spades/8.png';
import S9 from '../assets/spades/9.png';
import S10 from '../assets/spades/10.png';
import SJ from '../assets/spades/J.png';
import SQ from '../assets/spades/Q.png';
import SK from '../assets/spades/K.png';

// Hearts
import H1 from '../assets/hearts/A.png';
import H2 from '../assets/hearts/2.png';
import H3 from '../assets/hearts/3.png';
import H4 from '../assets/hearts/4.png';
import H5 from '../assets/hearts/5.png';
import H6 from '../assets/hearts/6.png';
import H7 from '../assets/hearts/7.png';
import H8 from '../assets/hearts/8.png';
import H9 from '../assets/hearts/9.png';
import H10 from '../assets/hearts/10.png';
import HJ from '../assets/hearts/J.png';
import HQ from '../assets/hearts/Q.png';
import HK from '../assets/hearts/K.png';

// Diamonds
import D1 from '../assets/diamonds/A.png';
import D2 from '../assets/diamonds/2.png';
import D3 from '../assets/diamonds/3.png';
import D4 from '../assets/diamonds/4.png';
import D5 from '../assets/diamonds/5.png';
import D6 from '../assets/diamonds/6.png';
import D7 from '../assets/diamonds/7.png';
import D8 from '../assets/diamonds/8.png';
import D9 from '../assets/diamonds/9.png';
import D10 from '../assets/diamonds/10.png';
import DJ from '../assets/diamonds/J.png';
import DQ from '../assets/diamonds/Q.png';
import DK from '../assets/diamonds/K.png';

// Clubs
import C1 from '../assets/clubs/A.png';
import C2 from '../assets/clubs/2.png';
import C3 from '../assets/clubs/3.png';
import C4 from '../assets/clubs/4.png';
import C5 from '../assets/clubs/5.png';
import C6 from '../assets/clubs/6.png';
import C7 from '../assets/clubs/7.png';
import C8 from '../assets/clubs/8.png';
import C9 from '../assets/clubs/9.png';
import C10 from '../assets/clubs/10.png';
import CJ from '../assets/clubs/J.png';
import CQ from '../assets/clubs/Q.png';
import CK from '../assets/clubs/K.png';

import back from '../assets/card-backgrounds/back9.jpg';

export const cardImages: {
  [key: string]: { [key: string]: string } | string;
} = {
  spades: {
    A: S1,
    '2': S2,
    '3': S3,
    '4': S4,
    '5': S5,
    '6': S6,
    '7': S7,
    '8': S8,
    '9': S9,
    '10': S10,
    J: SJ,
    Q: SQ,
    K: SK,
  },
  hearts: {
    A: H1,
    '2': H2,
    '3': H3,
    '4': H4,
    '5': H5,
    '6': H6,
    '7': H7,
    '8': H8,
    '9': H9,
    '10': H10,
    J: HJ,
    Q: HQ,
    K: HK,
  },
  diamonds: {
    A: D1,
    '2': D2,
    '3': D3,
    '4': D4,
    '5': D5,
    '6': D6,
    '7': D7,
    '8': D8,
    '9': D9,
    '10': D10,
    J: DJ,
    Q: DQ,
    K: DK,
  },
  clubs: {
    A: C1,
    '2': C2,
    '3': C3,
    '4': C4,
    '5': C5,
    '6': C6,
    '7': C7,
    '8': C8,
    '9': C9,
    '10': C10,
    J: CJ,
    Q: CQ,
    K: CK,
  },
  back,
};

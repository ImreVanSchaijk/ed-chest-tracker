import React from 'react';
import PropTypes from 'prop-types';

import chestOff from 'assets/chest_off.png';
import chestOn from 'assets/chest_on.png';

const TreasureChest = ({ collecting }) => (
  <div>
    <img src={collecting ? chestOn : chestOff} alt="chest" />
  </div>
);

export default TreasureChest;

TreasureChest.propTypes = {
  collecting: PropTypes.bool.isRequired,
};

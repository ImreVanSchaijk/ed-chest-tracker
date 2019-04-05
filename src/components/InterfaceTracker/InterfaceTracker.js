import React, { Component } from 'react';
import { images } from 'assets/images';

import { TreasureChest } from 'components';

const { a1lib: library, ImageData } = window;

export default class InterfaceTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageOn: null,
      imageOff: null,
      intervalActive: false,
      collecting: null,
    };
  }

  componentDidMount() {
    const { isCollecting } = window.localStorage;
    if (library) {
      Object.keys(images).forEach((key) => {
        ImageData.fromBase64((image) => {
          this.setState({ [key]: image });
        }, images[key]);
      });
    }
    this.setState({ collecting: isCollecting !== undefined ? isCollecting === 'true' : true });
  }

  componentDidUpdate() {
    const {
      imageOn, imageOff, intervalActive,
    } = this.state;

    if ((imageOn && imageOff) && intervalActive === false) {
      setInterval(() => {
        this.find();
      }, 500);
      this.setState({ intervalActive: true });
    }
  }

  find() {
    const { imageOn, imageOff } = this.state;
    if (library) {
      const fullRS = library.bindfullrs();
      const [collectionIsOn] = library.findsubimg(fullRS, imageOn);
      const [collectionIsOff] = library.findsubimg(fullRS, imageOff);

      if (collectionIsOn !== undefined && collectionIsOff === undefined) {
        this.setState({ collecting: true });
        window.localStorage.isCollecting = true;
      }

      if (collectionIsOff !== undefined && collectionIsOn === undefined) {
        this.setState({ collecting: false });
        window.localStorage.isCollecting = false;
      }
    }
  }

  render() {
    const { collecting } = this.state;
    return (
      <div>
        {collecting !== null && <TreasureChest collecting={collecting} />}
      </div>
    );
  }
}

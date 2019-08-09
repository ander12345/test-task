// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt,
  faStethoscope,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

const LogInfo = () => (
  <div className="log">
    <div className="log--block">
      <div className="log--block-wrapper">
        <FontAwesomeIcon
          size="2x"
          className="log--block-icon"
          icon={faCloudUploadAlt}
        />
        <div className="log--block-description">
          <span>Last synced:</span>
          <span>2015-06-02 14:33:10</span>
        </div>
      </div>
      <div className="log--block-forseSync">
        <FontAwesomeIcon size="1x" icon={faSyncAlt} />
        <a href="/">Force sync</a>
      </div>
    </div>
    <div className="log--block">
      <div className="log--block-wrapper">
        <FontAwesomeIcon
          size="2x"
          className="log--block-icon"
          icon={faStethoscope}
        />
        <div className="log--block-description">
          <span>Help desk and Resolution center available:</span>
          <span>I-IV 8:00-18:00, V 8:00-16:45</span>
        </div>
      </div>
    </div>
  </div>
);

export default LogInfo;

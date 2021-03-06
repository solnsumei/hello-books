import React from 'react';

/**
 * Displays loading
 * 
 * @return {Object} jsx
 */
const Loader = () => (
  <div className="col s12 center-align margin-2x">
    <div className="preloader-wrapper small active">
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Loader;

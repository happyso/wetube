const autoprefixer = require( 'autoprefixer' );

module.exports = {
  plugins: {
    autoprefixer: autoprefixer( { browsers: [ 'cover 99.5%' ] } )
  }
};

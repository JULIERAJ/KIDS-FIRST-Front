const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components/'),
    '@config': path.resolve(__dirname, 'src/config/'),
    '@context': path.resolve(__dirname, 'src/context/'),
    '@data': path.resolve(__dirname, 'src/data/'),
    '@hooks': path.resolve(__dirname, 'src/hooks/'),
    '@media': path.resolve(__dirname, 'src/media/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@styles': path.resolve(__dirname, 'src/styles/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
    '@api': path.resolve(__dirname, 'src/api.js')
  })
);

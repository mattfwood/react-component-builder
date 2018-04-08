// import getConfig from '../utils/getConfig';
const getConfig = require('../utils/getConfig');

test('getConfig', () => {
  const config = getConfig();
  expect(config).toEqual({
    componentOutput: './src/components',
    stylesheetOutput: './src/stylesheets',
  });
});

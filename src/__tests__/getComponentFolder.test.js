const getComponentFolder = require('../utils/getComponentsFolder');

describe('getComponentFolder', () => {
  it('should get components folder from root', () => {
    const componentFolder = getComponentFolder();

    expect(componentFolder).toEqual(['src/__tests__/components/']);
  });
});

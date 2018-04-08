const getComponentFolder = require('../utils/getComponentsFolder');

describe('getComponentFolder', () => {
  it('should get components folder from root', (done) => {
    getComponentFolder()
      .then((result) => {
        console.log(result);
        expect(result).toEqual('src/__tests__/components');
        done();
      });
  });
});

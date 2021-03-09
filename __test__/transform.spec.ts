import plugin from '../src/index';
// @ts-ignore
import {parse} from 'can-stache-ast';


describe('Rollup Plugin Stache', () => {
  describe('transform', () => {
    let transform: any;

    beforeEach(() => {
      transform = plugin().transform;
    })

    it('produces the right intermediate', async () => {
      const stacheString = `{{foo}}`;
      const ast = parse(stacheString);
      const intermediate = JSON.stringify(ast.intermediate);

      const { code } = await transform(stacheString, "test.stache");

      expect(code).toEqual(expect.stringContaining(intermediate));
    })

    it('imports files by using can-import', async () => {
      const stacheString = `<can-import from="./import"/>`;
      const { code } = await transform(stacheString, "test.stache");
      expect(code).toEqual(expect.stringContaining("import './import'"));
    });

    it('imports only once', async () => {
      const stacheString = `<can-import from="./import"/><can-import from="./import"/>`;
      const { code } = await transform(stacheString, "test.stache");
      expect((code.match(/import '\.\/import'/g) || []).length).toEqual(1);
    });
  });
});

/**
 * @jest-environment jsdom
 */

// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';
import {generateBundle, getInnerText, injectScript} from "./util";
import {RollupOutput} from "rollup";


jest.setTimeout(100000);

describe('basic', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await generateBundle('basic')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('should show correct output', () => {
    expect(document.querySelector('#test')!.innerHTML).toEqual("hello world");
  })
});

describe('partial', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await generateBundle('partial')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('should render a partial by calling a view', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text).toEqual("partial rendered !");
  })
});

describe('bindings', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await generateBundle('binding')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('bind to input element', () => {
    const value = document.querySelector('input')!.value
    expect(value).toEqual("input binding")
  })

});

// async function roll(name: string) {
//   const config = getConfig();
//   config.input = Path.resolve(__dirname, `../examples/${name}`, <string>config.input);
//   config.output = {
//     dir: Path.resolve(__dirname, `../examples/${name}/dist`),
//     format: 'esm',
//     inlineDynamicImports: false
//   };
//   // delete config.output
//
//   // @ts-ignore
//   config.onwarn = function (warning: RollupWarning, warn: Function) {
//     switch (warning.code) {
//       case 'UNUSED_EXTERNAL_IMPORT':
//         return
//       default:
//         warning.message = `(${name}) ${warning.message}`
//         warn(warning)
//     }
//   }
//
//   const bundle = await rollup(config)
//   // await bundle.write(config.output);
//   return bundle.generate({ format: 'esm', inlineDynamicImports: false })
//
// }
//
// function getConfig(): RollupOptions {
//   return {
//     input: 'index.js',
//     output: {
//       dir: 'dist',
//       format: 'esm',
//     },
//     plugins: [
//       replace({
//         preventAssignment: true,
//         'process.env.NODE_ENV': JSON.stringify( 'production')
//       }),
//       nodeResolve(),
//       commonjs(),
//       ...stachePlugin()
//     ]
//   }
// }

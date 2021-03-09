import {rollup, RollupOutput, RollupWarning} from 'rollup';
import Path from 'path';

// var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp(
//   '<!--[\\s\\S]*?(?:-->)?'
//   + '<!---+>?'  // A comment with no body
//   + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
//   + '|<[?][^>]*>?',  // A pseudo-comment
//   'g');

// if (!customElements.get('can-import')) { customElements.define('can-import', HTMLElement); }

function getInnerText(element: HTMLElement | null): string {
  if(element){
    return element.innerText || element.textContent || "";
  }
  return "";
}

// @ts-ignore
function injectScript(script: string) {
  const s = document.createElement('script');
  s.text = script;
  const test = document.getElementsByTagName('body')[0];
  if(test){
    test.appendChild(s);
  }
}

describe('basic', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await roll('basic')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
    // document.body.innerHTML = `<div id="test"></div>`;
  })
  afterEach(() => {
    // document.body.innerHTML = '';
    // document.head.innerHTML = ''
  })

  it('should show correct output', () => {
    // injectScript(result.output[0].code);
    expect(document.querySelector('#test')!.innerHTML).toEqual("hello world");
  })
});

describe('partial', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await roll('partial')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
    // document.body.innerHTML = `<div id="test"></div>`;
  })
  afterEach(() => {
    // document.body.innerHTML = '';
    // document.head.innerHTML = ''
  })

  it('should render a partial by calling a view', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text).toEqual("partial rendered !");
  })
});

describe('import', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await roll('import')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {

  })
  afterEach(() => {
    // document.body.innerHTML = '';
    // document.head.innerHTML = ''
  })

  it('import by can-import', () => {
    // @ts-ignore
    expect(window.IMPORT_MODULE).toEqual("module imported before render view");
  })
  it('import into local scope', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text.trim()).toEqual("HELLO world");
  })
});


describe('dynamic import', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await roll('dynamic-import')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('works', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text).toEqual(expect.stringContaining("loaded!"));
  })

  it('resolves its value to scope.vars', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text).toEqual(expect.stringContaining("bar"));
  })

  it('a partial stache file and render it', () => {
    const text = getInnerText(document.querySelector<HTMLElement>('#test'));
    expect(text).toEqual(expect.stringContaining("partial stache"));
  })
});

describe('bindings', () => {
  let result!: RollupOutput
  beforeAll(async () => {
    result = await roll('binding')
    document.body.innerHTML = `<div id="test"></div>`;
    injectScript(result.output[0].code);
  })
  beforeEach( () => {
    // document.body.innerHTML = `<div id="test"></div>`;
  })
  afterEach(() => {
    // document.body.innerHTML = '';
    // document.head.innerHTML = ''
  })

  it('bind to input element', () => {
    const value = document.querySelector<HTMLInputElement>('input')!.value
    expect(value).toEqual("input binding")
  })

});

async function roll(name: string, entry?: string) {
  const configFile = `../examples/${name}/rollup.config.js`
  const configModule = require(configFile)
  const configs = configModule.__esModule ? configModule.default : configModule
  const config = Array.isArray(configs) ? configs[0] : configs

  config.input = Path.resolve(__dirname, Path.dirname(configFile), config.input)
  delete config.output

  if(entry) config.input = entry;

  config.onwarn = function (warning: RollupWarning, warn: Function) {
    switch (warning.code) {
      case 'UNUSED_EXTERNAL_IMPORT':
        return
      default:
        warning.message = `(${name}) ${warning.message}`
        warn(warning)
    }
  }

  const bundle = await rollup(config)

  return bundle.generate({ format: 'esm' })
}

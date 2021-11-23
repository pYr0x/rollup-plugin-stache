/**
 * @jest-environment puppeteer
 */

import 'expect-puppeteer'
import "pptr-testing-library/extend";
// @ts-ignore
import {getDocument, queries, getQueriesForElement} from "pptr-testing-library";
import '@testing-library/jest-dom'
// import {findByTestId} from "@testing-library/dom";
import {deleteMatchedFiles, writeBundle} from "./util";
import path from "path";

jest.setTimeout(100000)



describe.skip('dynamic import', () => {
  beforeAll(async () => {
    await writeBundle('dynamic-import');

    deleteMatchedFiles(path.resolve(__dirname, '../examples/dynamic-import/dist/'), /bar-.*/);

    // @ts-ignore
    await page.goto('http://localhost:8081/examples/dynamic-import/')
  })

  it('resolves foo.js to scope.vars.foo', async () => {
    // @ts-ignore
    const $doc = await getDocument(page);
    const foo = await queries.getByTestId($doc, 'dynamic-import-foo');
    expect(await foo.evaluate( el => el.textContent)).toEqual('foo')
  })

  it("resolve a partial stache into scope.vars.partial", async () => {
    // @ts-ignore
    const $doc = await getDocument(page);
    expect(await queries.findByText($doc, 'partial stache')).toBeTruthy()
  })

  it("promise reject if file can not be loaded", async () => {
    // @ts-ignore
    const $doc = await getDocument(page);
    expect(await queries.findByText($doc, /Failed to fetch dynamically imported module/)).toBeTruthy()
  })
})

describe('import', () => {
  beforeAll(async () => {
    await writeBundle('import');
    // @ts-ignore
    await page.goto('http://localhost:8081/examples/import/')
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('import by can-import', async () => {
    // @ts-ignore
    const importedModule = await page.evaluate(() => window.IMPORT_MODULE)
    expect(importedModule).toEqual("module imported before render view");
  })

  it('import into local scope', async () => {
    // @ts-ignore
    const $doc = await getDocument(page);
    expect(await queries.findByText($doc, /HELLO world/)).toBeTruthy()
  })
});

describe('inline stache', () => {
  beforeAll(async () => {
    await writeBundle('inline-stache');
    // @ts-ignore
    await page.goto('http://localhost:8081/examples/inline-stache/')
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('should render inline stache', async () => {
    // @ts-ignore
    const template = await page.evaluate(() => window.TEMPLATE)
    expect(template).not.toEqual(`<h1>Hello {{message}}</h1>`);
    // @ts-ignore
    const $doc = await getDocument(page);
    expect(await queries.findByText($doc, /Hello inline/)).toBeTruthy()
    expect(await queries.findByText($doc, /Hey stache call expression/)).toBeTruthy()
  })
})

describe('stache element', () => {
  beforeAll(async () => {
    await writeBundle('stache-element');
    // @ts-ignore
    await page.goto('http://localhost:8081/examples/stache-element/')
  })
  beforeEach( () => {
  })
  afterEach(() => {
  })

  it('should render the counter component', async () => {
    // @ts-ignore
    const $doc = await getDocument(page);
    expect(await queries.findByText($doc, /Count:/)).toBeTruthy()
  })
  it('add +1 by clicking the button', async () => {
    // press button and check counter to be 1
    // @ts-ignore
    const $doc = await getDocument(page);
    const button = await queries.findByRole($doc, 'button');
    await button.click();
    const span = await queries.findByTestId($doc, "counter");
    expect(await span.evaluate( el => el.textContent)).toEqual("1");

  })
})

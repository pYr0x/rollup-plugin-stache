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




describe('dynamic import', () => {
  beforeAll(async () => {
    await writeBundle('dynamic-import');

    deleteMatchedFiles(path.resolve(__dirname, '../examples/dynamic-import/dist/'), /bar-.*/);

    // @ts-ignore
    await page.goto('http://127.0.0.1:8081/examples/dynamic-import/index.html')
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

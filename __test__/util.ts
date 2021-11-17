// import path from "path";
// @ts-ignore
import {rollup, RollupBuild, RollupOptions, RollupOutput, RollupWarning} from "rollup";
import replace from "@rollup/plugin-replace";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {default as stache} from '../dist/cjs/index';
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

async function roll(example: string, options: RollupOptions):Promise<RollupBuild> {
  const config = getConfig();

  return await rollup({
    ...config,
    input: path.resolve(__dirname, `../examples/${example}`, <string>config.input),
    ...options,
  });
}

export async function generateBundle(
  example: string,
  options: RollupOptions = {},
): Promise<RollupOutput> {
  const bundle = await roll(example, options);

  return await bundle.generate({
    format: "esm",
    sourcemap: false,
    inlineDynamicImports: false
  });
}

export async function writeBundle(
  example: string,
  options: RollupOptions = {},
): Promise<RollupOutput> {
  const bundle = await roll(example, options);
  const dir = path.resolve(__dirname, `../examples/${example}/dist`);

  await fs.rm(dir, {force: true, recursive: true});

  return await bundle.write({
    dir: dir,
    format: "esm",
    sourcemap: false,
    inlineDynamicImports: false
  });
}

export function deleteMatchedFiles(dir: string, regex: RegExp) {
  fsSync.readdirSync(dir)
    .filter(f => regex.test(f))
    .map(f => fsSync.unlinkSync(path.resolve(dir, f)));
}

export function injectScript(script: string) {
  const s = document.createElement('script');
  s.text = script;
  const test = document.getElementsByTagName('body')[0];
  if(test){
    test.appendChild(s);
  }
}

export function getInnerText(element: HTMLElement | null): string {
  if(element){
    return element.innerText || element.textContent || "";
  }
  return "";
}

function getConfig(): RollupOptions {
  return {
    input: 'index.js',
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify( 'production')
      }),
      nodeResolve(),
      commonjs(),
      ...stache()
    ]
  }
}

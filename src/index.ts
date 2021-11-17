// @ts-ignore
import {parse} from 'can-stache-ast';
// import makeSourceMap from "./source-map";
import path from "path";
import { Plugin } from 'rollup';

export const stachePlugin = function(): Plugin {
  return {
    name: 'stache',

    transform(code:string, id: string) {
      const [filename] = id.split('?', 2)

      if (filename.endsWith('.stache')) {

        const ast = parse(id, code.trim());
        const intermediate = JSON.stringify(ast.intermediate);

        let tagImportMap: string[] = [];
        let simpleImports: string[] = [];

        const staticImports = [...new Set(ast.imports)];
        staticImports.forEach((file) => {
          for (let importFile of ast.importDeclarations) {
            if (importFile && importFile.specifier === file && importFile.attributes instanceof Map) {
              if(importFile.attributes.size > 1) {
                tagImportMap.push(importFile.specifier);
                break;
              }else if(importFile.attributes.size === 1){
                simpleImports.push(importFile.specifier);
                break;
              }
            }
          }
        });

        const filePath = path.dirname(filename);

        const dynamicImportMap = ast.dynamicImports.reduce((map: { [file: string]: string; }, name: string) => {
          if(!path.extname(name)){
            name += '.js';
          }
          // @ts-ignore
          const referenceId = this.emitFile({
            type: 'chunk',
            id: path.resolve(filePath, name)
          });
          map[name] = 'import.meta.ROLLUP_FILE_URL_'+referenceId;
          return map;
        }, {});


        // language=JavaScript
        var body = `
          import stache from 'can-stache';
          import Scope from 'can-view-scope';
          import 'can-view-import';
          import 'can-stache/src/mustache_core';
          import stacheBindings from 'can-stache-bindings';

          ${(Object.keys(dynamicImportMap).length || tagImportMap.length || simpleImports.length) ? `import {staticImporter, dynamicImporter} from 'rollup-stache-import-module';`: ``}

          ${tagImportMap.map((file, i) => `import * as i_${i} from '${file}';`).join('\n')}
          ${simpleImports.map((file) => `import '${file}';`)}

          ${tagImportMap.length || simpleImports.length? `
          const staticImportMap = [${[...tagImportMap, ...simpleImports].map((file) => {
            return `"${file}"`;
          }).join(",")}];
          staticImporter(staticImportMap);
          `: ``}

          stache.addBindings(stacheBindings);
          var renderer = stache(${intermediate});

          ${Object.keys(dynamicImportMap).length ? `
          const dynamicImportMap = {${Object.keys(dynamicImportMap).map((file) => {
            if(!path.extname(file)){
              file += '.js';
            }
            return `"${file}": ${dynamicImportMap[file]}`;
          }).join(",")}};
          dynamicImporter(dynamicImportMap);
          `: ``}

          export default function (scope, options, nodeList) {
            if (!(scope instanceof Scope)) {
              scope = new Scope(scope);
            }
            var variableScope = scope.getScope(function (s) {
              return s._meta.variable === true
            });
            if (!variableScope) {
              scope = scope.addLetContext();
              variableScope = scope;
            }
            var moduleOptions = Object.assign({}, options);
            Object.assign(variableScope._context, {
              module: null,
              tagImportMap: {${tagImportMap.map((file, i) => `"${file}": i_${i}`).join(',')}}
            });

            return renderer(scope, moduleOptions, nodeList);
          };`;

        // const sourceMap = makeSourceMap( body, code.trim(), filename )

        return {
          code: body,
          map: { mappings: '' }
          // map: sourceMap
        };
      }
      return null;
    },
    resolveFileUrl({fileName}: {fileName: string}) {
      return `"./${fileName}"`;
    }
  }
}

export const stacheImportPlugin = function(): Plugin{
  return {
    name: "stache-import-module",
    resolveId ( source ) {
      if (source === 'rollup-stache-import-module') {
        return source;
      }
      return null;
    },
    load(id: string) {
      if (id === 'rollup-stache-import-module') {
        // language=JavaScript
        const body = `
          import {flushLoader, addLoader} from 'can-import-module';

          flushLoader();

          export function staticImporter(staticImportMap){
            addLoader((moduleName) => {
              if (staticImportMap.indexOf(moduleName) !== -1) {
                return Promise.resolve();
              }
            });
          }

          export function dynamicImporter(dynamicImportMap) {
            addLoader((moduleName) => {
              if (!(moduleName.match(/[^\\\\\\\/]\\.([^.\\\\\\\/]+)$/) || [null]).pop()) {
                moduleName += '.js';
              }
              if (moduleName in dynamicImportMap) {
                return import(/* @vite-ignore */dynamicImportMap[moduleName]);
              }
            });
          }`

        return {
          code: body,
          map: { mappings: '' }
        };
      }
    }
  }
}

export default function(){
  return [
    stacheImportPlugin(),
    stachePlugin()
  ]
}

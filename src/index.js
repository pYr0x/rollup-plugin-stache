const parse = require('can-stache-ast').parse;
const path = require("path");

module.exports = function stache() {
  return {
    name: 'stache',

    async resolveId(id, importer) {
      const [filename, query] = id.split('?', 2)

      if (filename.endsWith('.stache')) {
        return await this.resolve(filename, importer, {
          skipSelf: true,
        })
      }
      return null;
    },

    // load(id) {
    //   var body, map = "";
    //   return {
    //     code: body,
    //     map: { mappings: '' }
    //   };
    // },

    transform(code, id) {
      const [filename, query] = id.split('?', 2)

      if (filename.endsWith('.stache')) {

        const ast = parse(id, code.trim());
        const intermediate = JSON.stringify(ast.intermediate);

        let tagImportMap = [];
        let simpleImports = [];

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
        //const currentDir = path.relative(__dirname, filePath);

        const dynamicImportMap = ast.dynamicImports.reduce((map, name, index) => {
          const referenceId = this.emitFile({
            type: 'chunk',
            id: path.resolve(filePath,name)
          });
          map[name] = 'import.meta.ROLLUP_FILE_URL_'+referenceId;
          return map;
        }, {});


        var foo = '`${dynamicImportMap[moduleName]}`';
        // language=JavaScript
        var body = `
          import stache from 'can-stache';
          import Scope from 'can-view-scope';
          import 'can-view-import';
          import 'can-stache/src/mustache_core';
          import stacheBindings from 'can-stache-bindings';

          ${tagImportMap.map((file, i) => `import * as i_${i} from '${file}';`).join('\n')}
          ${simpleImports.map((file) => `import '${file}';`)}

          stache.addBindings(stacheBindings);
          var renderer = stache(${intermediate});

          ${Object.keys(dynamicImportMap).length ? `
          window.require = window.require || new Function('return false');
          (function () {
            const oldPrototype = window.require.prototype;
            const oldRequire = window.require;
            window.require = async function (moduleName) {
              const dynamicImportMap = {${Object.keys(dynamicImportMap).map((a) => {
                return `"${a}": ${dynamicImportMap[a]}`;
              }).join(",")}};

              if (moduleName in dynamicImportMap) {
                return import(/* @vite-ignore */ ${foo});
              }
              return oldRequire.apply(this, arguments);
            };
            window.require.prototype = oldPrototype;
          })();`: ``}

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
        return {
          code: body,
          map: {mappings: ''}
        };
      }
      return null;
    },
    resolveFileUrl({fileName}) {
      return `"./${fileName}"`;
    }
  }
}

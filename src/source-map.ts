import esprima from "esprima";
import path from "path";
import { SourceMapGenerator } from "source-map";

function replaceExt( filepath: string, ext: string ) {
  const stripped = path.posix.basename( filepath, path.posix.extname( filepath ));

  return path.posix.join( path.posix.dirname( filepath ), stripped + ext );
}

export default function makeSourceMap( source: string, template: string, filepath: string ) {
  const basename     = path.basename( filepath );
  const generator    = new SourceMapGenerator();
  const sourcePath   = path.join( filepath, replaceExt( basename, ".stache.js" ));
  const templatePath = path.join( filepath, replaceExt( basename, ".stache.html" ));

  esprima
    .tokenize( source, { loc : true })
    .forEach( token => {
      generator.addMapping({
        source    : sourcePath,
        generated : token.loc?.start || { line: 0, column: 0 },
        original  : token.loc?.start || { line: 0, column: 0 }
      });
    });

  generator.addMapping({
    source    : templatePath,
    generated : { column : 0, line : 1 },
    original  : { column : 0, line : 1 }
  });

  generator.setSourceContent( sourcePath, source );
  generator.setSourceContent( templatePath, template );

  return generator.toJSON();
}

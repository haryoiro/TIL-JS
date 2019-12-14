const extensions = require.extensions;
const fs = require('fs');
const unassert = require('unassert');
const esprima = require('esprima');
const escodegen = require('escodegen');

const unassertLoader = () => {
	extensions['.js'] = (localModule, filePath) => {
    const originalSource = fs.readFileSync(filePath, 'utf-8')
    const ast = esprima.parse(originalSource);
    const  modifiedAst = unassert(ast);
    localModule._compile(escodegen.generate(modifiedAst), filePath);
	};
}

unassertLoader()
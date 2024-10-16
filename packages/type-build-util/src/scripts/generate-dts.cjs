const path = require('path');
const runCommand = require('./run-command.cjs');

// TODO: param 받기

function generateDts() {
  const curPath = process.cwd();

  // mf.config.json 파일 경로
  const mfConfigPath = path.resolve(curPath, './mf.config.json');

  // mf.config.json 파일 읽기
  const mfConfigs = require(mfConfigPath);

  const tsconfigPath = './tsconfig.app.json';
  const outDir = `./dist/types`;

  const cliList = Object.entries(mfConfigs.exposes).map(
    ([moduleName, modulePath]) => {
      // output 파일의 상대 경로
      const umdModuleName = moduleName.replace(/^\.\//, '');
      const outputPath = path.resolve(outDir, moduleName);
      return `dts-bundle-generator --project ${tsconfigPath} --out-file ${outputPath}.d.ts --umd-module-name ${umdModuleName} --no-banner --inline-declare-global ${modulePath}`;
    }
  );

  cliList.forEach((cli) => {
    console.log(cli);
    runCommand(cli);
  });
}

module.exports = generateDts;

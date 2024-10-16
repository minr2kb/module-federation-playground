const fs = require('fs');
const path = require('path');

// mf.config.json 파일 경로
const mfConfigPath = path.resolve(__dirname, '../mf.config.json');

// mf.config.json 파일 읽기
const mfConfigs = require(mfConfigPath);

// dts-bundle-generator 설정 생성
const entries = Object.entries(mfConfigs.exposes).map(
  ([moduleName, modulePath]) => {
    // output 파일의 상대 경로
    const outputFileName = moduleName.replace(/^\.\//, '') + '.d.ts';
    const outputPath = `./dist/types/${outputFileName}`;

    // umdModuleName 설정 (moduleName에서 './' 제거)
    const umdModuleName = moduleName.replace(/^\.\//, '');

    return {
      filePath: modulePath,
      outFile: outputPath,
      output: {
        umdModuleName,
        noBanner: true,
        inlineDeclareGlobals: true,
      },
    };
  }
);

const config = {
  compilationOptions: {
    preferredConfigPath: './tsconfig.app.json',
  },
  entries,
};

// 생성된 설정을 JSON 문자열로 변환
const configContent = JSON.stringify(config, null, 2);

// dts-bundle-generator.config.json 파일 경로
const configPath = path.resolve(
  __dirname,
  '../dts-bundle-generator.config.json'
);

// 설정 파일 쓰기
fs.writeFileSync(configPath, configContent, 'utf-8');

console.log('dts-bundle-generator.config.json 파일이 생성되었습니다.');

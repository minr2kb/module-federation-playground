const fs = require('fs');
const path = require('path');

// TODO: param 받기, host 따로

function wrapDts() {
  const curPath = process.cwd();
  // mf.config.json 파일 경로
  const mfConfigPath = path.resolve(curPath, './mf.config.json');

  // mf.config.json 파일 읽기
  const mfConfigs = require(mfConfigPath);

  const remoteName = mfConfigs.name;

  // 생성된 선언 파일들이 위치한 디렉토리
  const typesDir = path.resolve(curPath, './dist/types');
  const sharedTypesPath = path.resolve(curPath, '../host/src');

  // Initialize a variable to hold all contents
  let allContents = '';

  // types 디렉토리의 모든 .d.ts 파일을 읽습니다.
  fs.readdirSync(typesDir).forEach((file) => {
    if (file.endsWith('.d.ts')) {
      const filePath = path.join(typesDir, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 파일 이름에서 모듈 이름을 추출합니다 (확장자 제거)
      const moduleName = `${remoteName}/` + file.replace(/\.d\.ts$/, '');

      // Add indentation to each line of the content
      content = content
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n');
      content = `declare module '${moduleName}' {\n${content}\n}`;

      // Append the content to the allContents string
      allContents += content + '\n\n';
      console.log(`파일 ${file}의 내용이 모듈 선언으로 준비되었습니다.`);
    }
  });

  // Write all contents to the output file at once
  const outputFilePath = path.join(sharedTypesPath, `${remoteName}.d.ts`);
  fs.writeFileSync(outputFilePath, allContents, 'utf8');
  console.log(`모든 내용이 ${remoteName}.d.ts에 작성되었습니다.`);
}

module.exports = wrapDts;

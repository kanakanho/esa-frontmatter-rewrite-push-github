function FixCodeblock(body_md: string): string {
  let returnBodyMd = body_md;

  // コードブロックの 言語名とファイル名を取得して、ファイル名がなければ言語名をファイル名として追加する
  // 形式 ```md:text.md → ```md title="text.md"
  // 形式 ````md:text.md → ````md title="text.md"
  // 形式 ```js → ```js title=".js"
  // 形式 ````js → ````js title=".js"
  const codeblocks = body_md.match(/(````?)(\w+):(.*)/g);
  if (codeblocks && codeblocks.length > 0) {
    codeblocks.forEach((codeblock) => {
      const codeblockArray = codeblock.split(":");
      if (codeblockArray.length === 2) {
        returnBodyMd = returnBodyMd.replace(
          codeblock,
          `${codeblockArray[0]} title="${codeblockArray[1].trim()}"`,
        );
      }
    });
  }

  const codeblocks2 = body_md.match(/(````?)(\w+)(:?)/g);
  if (codeblocks2) {
    codeblocks2.forEach((codeblock) => {
      if (codeblock.split(":").length > 1) {
        return;
      }
      returnBodyMd = returnBodyMd.replace(
        codeblock,
        `${codeblock.trim()} title=".${codeblock.split("```")[1].trim()}"\n`,
      );
    });
  }

  return returnBodyMd;
}

export default FixCodeblock;

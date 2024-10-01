import { stringify } from "yaml";
import type { Frontmatter } from "../types/Frontmatter";

function CreateContent(frontmatter: Frontmatter, body_md: string): string {
  // frontmatter を作成
  const ymlStr = stringify(frontmatter)

  // frontmatter と body_md を結合
  return `---\n${ymlStr}---\n${body_md}`;
}

export default CreateContent;

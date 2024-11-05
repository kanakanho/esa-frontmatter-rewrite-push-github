import { parse } from "yaml";
import type { Request } from "../types/EsaWebhookRequest";
import type { Frontmatter, YamlParse } from "../types/Frontmatter";

function CreateFrontmatter(body: Request): [Frontmatter, string] {
  const dirName = body.post.name.split(" #")[0];
  const title = dirName.split("/").slice(-1)[0];
  const lastDir = dirName.split("/").slice(-2)[0];
  const date = lastDir === "latest" ? "latest" : new Date().toLocaleDateString("ja-JP");

  if (!body.post.body_md) {
    return [
      {
        isActive: false,
        number: body.post.number,
        title: title,
        date: date,
        tags: [],
        options: {},
      },
      "",
    ];
  }

  // body.post.body_md の一番最初の codeblock ```yml ``` or ```yaml ```` を取得
  const topYamlcodeblockMatch = body.post.body_md.match(/```(yml|yaml)([\s\S]*?)```/);
  const topYamlcodeblock = topYamlcodeblockMatch ? topYamlcodeblockMatch[0] : null;

  if (!topYamlcodeblock) {
    return [
      {
        isActive: false,
        number: body.post.number,
        title: title,
        date: date,
        tags: [],
        options: {},
      },
      body.post.body_md,
    ];
  }

  // codeblock の中身を取得
  const topYamlcodeblockContent = topYamlcodeblock
    .split("```")[1]
    .replace("yml", "")
    .replace("yaml", "");
  const yaml: YamlParse = parse(topYamlcodeblockContent) || {};
  const body_mdRemoveTopYamlcodeblock = body.post.body_md.replace(topYamlcodeblock, "");

  return [
    {
      isActive: yaml.isActive ?? !body.post.wip,
      number: body.post.number,
      title: title,
      date: date,
      tags: yaml.tags,
      options: {
        description: yaml.description,
        repository: yaml.repository,
        youtube: yaml.youtube,
        website: yaml.website,
        image: yaml.image,
      },
    },
    body_mdRemoveTopYamlcodeblock,
  ];
}

export default CreateFrontmatter;

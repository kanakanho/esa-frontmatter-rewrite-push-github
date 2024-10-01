import { parse } from "yaml";
import type { Request } from "../types/EsaWebhookRequest";
import type { Frontmatter, YamlParse } from "../types/Frontmatter";

function CreateFrontmatter(body: Request): [Frontmatter, string] {
  const dirName = body.post.name.split(" #")[0];
  const title = dirName.split("/").slice(-1)[0];
  const date = new Date().toLocaleDateString("sv-SE");

  if (!body.post.body_md) {
    return [
      {
        isActive: false,
        number: body.post.number,
        title: title,
        date: date,
        options: {},
      },
      "",
    ];
  }

  // body.post.body_md の一番最初の codeblock ```yml ``` or ```yaml ```` を取得
  const topYamlcodeblock = body.post.body_md.match(/```(yml|yaml)([\s\S]*?)```/)?.[0];

  if (!topYamlcodeblock) {
    return [
      {
        isActive: false,
        number: body.post.number,
        title: title,
        date: date,
        options: {},
      },
      body.post.body_md,
    ];
  }

  // codeblock の中身を取得
  const topYamlcodeblockContent = topYamlcodeblock.split("```")[1].replace("yml", "").replace("yaml", "");
  const yaml: YamlParse = parse(topYamlcodeblockContent) || {};
  const body_mdRemoveTopYamlcodeblock = body.post.body_md.replace(topYamlcodeblock, "");

  return [
    {
      isActive: yaml.isActive ?? !body.post.wip,
      number: body.post.number,
      title: title,
      date: date,
      options: {
        tags: yaml.tags,
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

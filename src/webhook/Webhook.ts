import type { Context, Env } from "hono";
import { env } from "hono/adapter";
import type { BlankInput } from "hono/types";
import type { Request } from "../types/EsaWebhookRequest";
import CreateContent from "./CreateContent";
import CreateFrontmatter from "./CreateFrontmatter";
import FixCodeblock from "./FixCodeblock";
import GitCommit from "./GitCommit";
import FixCodeblock from "./FixCodeblock";

async function Webhook(c: Context<Env, "/", BlankInput>) {
  const { GITHUB_ACCESS_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, GITHUB_PATH } = env<{
    GITHUB_ACCESS_TOKEN: string;
    GITHUB_OWNER: string;
    GITHUB_REPO: string;
    GITHUB_BRANCH: string;
    GITHUB_PATH: string;
  }>(c);
  const body = await c.req.json<Request>();

  const [frontmatter, body_md] = CreateFrontmatter(body);

  if (body.kind === "post_archive" || body.kind === "post_delete") {
    frontmatter.isActive = false;
  }

  const body_md_fixed = FixCodeblock(body_md);

  const content = CreateContent(frontmatter, body_md_fixed);

  const ok = await GitCommit(
    GITHUB_ACCESS_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH,
    GITHUB_PATH,
    frontmatter,
    content,
    body.post.message as string,
  );

  if (!ok) {
    return c.json(
      {
        status: "error",
      },
      400,
    );
  }
  return c.json(
    {
      status: "ok",
    },
    201,
  );
}

export default Webhook;

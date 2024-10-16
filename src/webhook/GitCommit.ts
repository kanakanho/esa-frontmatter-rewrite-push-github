import { Octokit } from "@octokit/rest";
import type { Frontmatter } from "../types/Frontmatter";

async function GitCommit(
  auth: string,
  owner: string,
  repo: string,
  branch: string,
  path: string,
  frontmatter: Frontmatter,
  content: string,
  message: string,
): Promise<boolean> {
  const filePath = `${path}/${frontmatter.number}.md`;

  const octokit = new Octokit({
    auth,
  });

  const baseBranchRef = await octokit.git
    .getRef({
      owner: owner,
      repo: repo,
      ref: `heads/${branch}`,
    })
    .catch((e) => {
      console.error(e);
      return false;
    });

  if (typeof baseBranchRef === "boolean") {
    return false;
  }

  const currentCommit = await octokit.git
    .getCommit({
      owner,
      repo,
      commit_sha: baseBranchRef.data.object.sha,
    })
    .catch((e) => {
      console.error(e);
      return false;
    });

  if (typeof currentCommit === "boolean") {
    return false;
  }

  const newTree = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentCommit.data.tree.sha,
    tree: [
      {
        path: filePath,
        mode: "100644",
        content: content,
      },
    ],
  });

  const newCommit = await octokit.git.createCommit({
    owner,
    repo,
    message: `[esa-hono] ${message}`,
    tree: newTree.data.sha,
    parents: [baseBranchRef.data.object.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.data.sha,
  });

  return true;
}

export default GitCommit;

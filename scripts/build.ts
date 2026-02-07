import $ from "dax";

const projects = ["valentines", "pairs", "world"] as const;

for (const project of projects) {
  $.logStep("Building", project);
  await $`pnpm install --frozen-lockfile`.cwd(project);
  await $`pnpm exec vite build --base=/${project}/`.cwd(project);
}

for (const project of projects) {
  const src = $.path(`${project}/dist`);
  const dest = $.path(`dist/${project}`);
  await dest.mkdir({ recursive: true });
  for await (const entry of src.readDir()) {
    await $`cp -r ${entry.path} ${dest}`;
  }
}

await $`mkdir -p dist`;
await $`cp public/index.html dist/`;

$.logStep("Done", "build complete");

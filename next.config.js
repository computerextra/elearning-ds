/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["md", "mdx", "ts", "tsx", "js", "jsx"],
};

const withMDX = createMDX({});

export default withMDX(config);

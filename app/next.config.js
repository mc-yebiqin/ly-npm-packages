/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  transpilePackages: [
    "@ly/prosemirror",
    "laoye-react-hooks",
    "laoye-prosemirror-dev",
    "laoye-prosemirror-utils",
    "laoye-react-component_design",
  ],
};

module.exports = nextConfig;

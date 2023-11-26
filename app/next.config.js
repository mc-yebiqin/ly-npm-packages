/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  transpilePackages: [
    "laoye-prosemirror-dev",
    "laoye-prosemirror-utils",
    "laoye-react-component_design",
  ],
};

module.exports = nextConfig;

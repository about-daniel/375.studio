import { fetchAPI } from "@/app/utils/fetch-api";
const fs = require("fs");
const path = require("path");

//function to get all static pages (search through folders)
function getFoldersRecursive(filePath) {
  const folders = [];

  function shouldIgnoreFolder(folderName) {
    const ignoredPrefixes = ["[", "(", "_", "-", "styles", "utils"];
    return ignoredPrefixes.some((prefix) => folderName.startsWith(prefix));
  }

  function traverse(currentPath) {
    const files = fs.readdirSync(currentPath, { withFileTypes: true });

    files.forEach((file) => {
      if (file.isDirectory()) {
        const folderName = file.name;
        if (!shouldIgnoreFolder(folderName)) {
          folders.push(folderName);
          traverse(path.join(currentPath, folderName));
        }
      }
    });
  }

  traverse(filePath);
  return folders;
}

//function to get all dynamic pages
async function getAllPosts(path) {
  try {
    const posts = await fetchAPI(path, { fields: ["slug", "updatedAt"] });
    return posts.map((post) =>
      createJson(
        `${path}/${post.attributes.slug}`,
        post.attributes.updatedAt,
        0.7
      )
    );
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

const createJson = (slug, updatedAt = false, priority = 1.0) => {
  return {
    url: `${process.env.SITE_URL}${slug}/`,
    lastModified: updatedAt ? updatedAt : new Date(),
    priority: priority,
  };
};

export default async function Sitemap() {
  //pages
  const staticPages = getFoldersRecursive("./src/app");
  const staticPagesItems = staticPages.map((page) => {
    return createJson("/" + page);
  });
  //singles
  const singles = await getAllPosts("/works");
  return [
    {
      url: `${process.env.SITE_URL}/`,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...staticPagesItems,
    ...singles,
  ];
}

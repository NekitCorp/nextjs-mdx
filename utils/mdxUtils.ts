import fs from "fs";
import globCb from "glob";
import path from "path";
import util from "util";

const glob = util.promisify(globCb);

export const CONTENT_FOLDER = "content";
export const CONTENT_PATH = path.join(process.cwd(), CONTENT_FOLDER);

export async function getContentSlugs() {
    const paths = await glob(`${CONTENT_FOLDER}/**/*.mdx`);

    return paths.map((path) =>
        path
            .replace(CONTENT_FOLDER, "")
            .replace(/\.mdx?$/, "")
            .replace("index", "")
            .split("/")
            .filter(Boolean)
    );
}

export function getFileContent(slugs?: string[]) {
    const pagePath = slugs ? `/${slugs.join("/")}` : "/";
    const pagePathContent = path.join(CONTENT_PATH, pagePath);

    try {
        return fs.readFileSync(`${pagePathContent}.mdx`, "utf8");
    } catch (e) {
        return fs.readFileSync(`${pagePathContent}/index.mdx`, "utf8");
    }
}

import styles from "./works.module.scss";
import Link from "next/link";
import { getSeoMetadata } from "@/app/utils/get-seo-metadata";
import { fetchAPI } from "@/app/utils/fetch-api";

export async function generateMetadata({ params, searchParams }, parent) {
  return await getSeoMetadata("/works");
}

export default async function Works() {
  const works = await fetchAPI("/works", { populate: "deep" });
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.title}>
          <h1>Works</h1>
        </div>
        <div className={styles.list}>
          {works.map((work) => (
            <div className={styles.listItem} key={work.id}>
              <Link
                href={`/works/${work.attributes.slug}`}
                className={styles.navItem}
              >
                {work.attributes.Title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

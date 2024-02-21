import styles from "./work.module.scss";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getSeoMetadata } from "@/app/utils/get-seo-metadata";
import { getSingleBySlug } from "@/app/utils/get-single-by-slug";

export async function generateMetadata({ params, searchParams }, parent) {
  return await getSeoMetadata("/works", params.slug);
}

export default async function Page({ params }) {
  const work = await getSingleBySlug("/works", params.slug);
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.title}>
          <h1>{work.attributes.Title}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <BlocksRenderer content={work.attributes.Description} />
          </div>
          <div className={styles.image}>
            <Image
              src={`${process.env.STRAPI_ENDPOINT}${work.attributes.Media.data.attributes.url}`}
              alt="Creative studio"
              width={600}
              height={800}
              priority={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}

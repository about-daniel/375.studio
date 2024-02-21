import styles from "./page.module.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { getSeoMetadata } from "@/app/utils/get-seo-metadata";
import { fetchAPI } from "@/app/utils/fetch-api";

export async function generateMetadata({ params, searchParams }, parent) {
  return await getSeoMetadata("/home");
}

export default async function Home() {
  const content = await fetchAPI("/home", { populate: "deep" });
  const { Title, Description, Gallery } = content.attributes;
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.text}>
          <BlocksRenderer content={Description} />
        </div>
        <div className={styles.gallery}>
          {Gallery.data.map((image) => (
            <div className={styles.image} key={image.attributes.hash}>
              <Image
                src={`${process.env.STRAPI_ENDPOINT}${image.attributes.url}`}
                alt="Creative studio"
                width={250}
                height={500}
                priority={true}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

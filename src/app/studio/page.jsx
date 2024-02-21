import styles from "./studio.module.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { getSeoMetadata } from "@/app/utils/get-seo-metadata";
import { fetchAPI } from "@/app/utils/fetch-api";

export async function generateMetadata({ params, searchParams }, parent) {
  return await getSeoMetadata("/studio");
}

export default async function Studio() {
  const content = await fetchAPI("/studio", { populate: "deep" });
  const { Title, Paragraph, Media } = content.attributes;
  const ImageUrl = Media.data.attributes.url;
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.row}>
          <div className={styles.left}>
            <h1>{Title}</h1>
            <BlocksRenderer content={Paragraph} />
          </div>
          <div className={styles.right}>
            <Image
              src={`${process.env.STRAPI_ENDPOINT}${ImageUrl}`}
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

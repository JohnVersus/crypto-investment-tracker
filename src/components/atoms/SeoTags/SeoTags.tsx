import Head from "next/head";

interface SeoTagsProps {
  title: string;
  description: string;
  favicon?: string;
  thumbnailUrl?: string;
}

const SeoTags: React.FC<SeoTagsProps> = ({
  title,
  description,
  favicon = "/favicon.ico",
  thumbnailUrl,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
      {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
    </Head>
  );
};

export default SeoTags;

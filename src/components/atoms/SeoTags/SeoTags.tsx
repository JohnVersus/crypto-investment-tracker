import Head from "next/head";

interface SeoTagsProps {
  title: string;
  description: string;
  favicon?: string;
  thumbnailUrl?: string;
  url?: string;
  siteName?: string;
  twitterUsername?: string;
}

const SeoTags: React.FC<SeoTagsProps> = ({
  title,
  description,
  favicon = "/favicon.ico",
  thumbnailUrl,
  url = "",
  siteName = "",
  twitterUsername = "",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
      {url && <meta property="og:url" content={url} />}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {thumbnailUrl && <meta name="twitter:image" content={thumbnailUrl} />}
      {twitterUsername && (
        <meta name="twitter:site" content={twitterUsername} />
      )}
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
    </Head>
  );
};

export default SeoTags;

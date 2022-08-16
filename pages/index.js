import styles from '../styles/Home.module.css'
import { Client } from '@notionhq/client'
import { useEffect } from 'react';

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId
  });

  return {
    props: {
      results: response.results,
    },
    revalidate: 10
  }
}

export default function Home({ results }) {
  return (
    <>
      <h1 className={styles.siteTtl}>Notion API</h1>
      <div className={styles.container}>
        <ul className={styles.list}>
          {results.map((result) => {
            return (
              <li key={result.id}>
                <h2>{result.properties.Name.title[0].plain_text}</h2>
                <p>{result.properties.content.rich_text[0].plain_text}</p>
                <p>slug:<span>{result.properties.slug.rich_text[0].plain_text}</span></p>
                <p><span>{result.properties.select.select.name}</span></p>
              </li>
            )
          }
          )}
        </ul>
      </div>
    </>
  )
}

import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { API_URL } from '../../config/index'
import styles from '../../styles/Event.module.css'

export default function EventPage({ evt }) {
  const router = useRouter();
  return (
    <Layout>
      <h1>My Event</h1>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
        </div>

        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image && (
          <div className={styles.image}>
            {
              evt.attributes.image.data &&
              <Image src={evt.attributes.image.data.attributes.formats.large.url} width={960} height={600} />
            }
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=%2A`)
  const events = await res.json()

  const paths = events.data.map((evt) => ({ params: { slug: evt.attributes.slug } }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=%2A&&filters[slug]=${slug}`)
  const events = await res.json()
  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
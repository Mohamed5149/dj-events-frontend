import Layout from '../../components/layout'
import EventItem from '../../components/EventItem'
import { API_URL } from '../../config/index'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchPage({ events }) {
    const router = useRouter();
    return (
        <Layout>
            <Link href='/events'>Go back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.data.length === 0 && <h3>No events to show</h3>}

            {events.data.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {
    const res = await fetch(`${API_URL}/api/events?populate=%2A&&filters[name][$contains]=${term}`)
    const events = await res.json()
    return {
        props: { events }
    }
}
import Layout from '../../components/layout'
import EventItem from '../../components/EventItem'
import { API_URL } from '../../config/index'
import Link from 'next/link';
const pageSize = 3;

export default function EventsPage({ events, page }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.data.length === 0 && <h3>No events to show</h3>}
            {events.data.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
            {
                page > 1 && (
                    <Link href={`/events?page=${page - 1}`}>
                        <a>previous</a>
                    </Link>
                )
            }
            {
                page < events.meta.pagination.total && (
                    <Link href={`/events?page=${parseInt(page) + 1}`}>
                        <a>next</a>
                    </Link>
                )
            }
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const res = await fetch(`${API_URL}/api/events?populate=%2A&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
    const events = await res.json();
    return {
        props: { events, page }
    }
}
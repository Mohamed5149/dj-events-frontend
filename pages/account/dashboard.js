import Layout from "../../components/Layout";
import cookie from 'cookie';
import { API_URL } from "../../config";
import styles from '../../styles/dashboard.module.css'
import DashboardEvent from "../../components/dashboardEvent";
import { useRouter } from "next/router";

const Dashboard = ({ events, token }) => {

    const router = useRouter();

    const deleteEvent = async (id) => {
        if (confirm('Are u sure ? ')) {
            const res = await fetch(`${API_URL}/api/events/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer${token}`
                    }
                }
            )
            const data = await res.json();
            router.push('/events')
        }
    }

    return (
        <Layout title={'User Dashboard'}>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>
                {
                    events.data.map(evt => (
                        <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                    ))
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = cookie.parse(req.headers.cookie)

    const res = await fetch(`${API_URL}/api/events`, {
        method: "GET",
        headers: {
            Authorization: `Bearer${token}`
        }
    })
    const result = await res.json();

    return {
        props: { events: result }
    }
}

export default Dashboard;
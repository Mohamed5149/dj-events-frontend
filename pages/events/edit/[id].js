import Layout from '../../../components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '../../../config/index'
import styles from '../../../styles/form.module.css'
import Image from 'next/image'
import Modal from '../../../components/modal'
import ImageUpload from '../../../components/imageUpload'
import cookie from 'cookie'

export default function EditEventPage({ evt, token }) {
    const [values, setValues] = useState({
        name: evt.data.attributes.name,
        performers: evt.data.attributes.performers,
        venue: evt.data.attributes.veneu,
        address: evt.data.attributes.address,
        date: evt.data.attributes.date,
        time: evt.data.attributes.time,
        description: evt.data.attributes.description,
    })

    const [imagePreview, setImagePreview] = useState(evt.data.attributes.image.data ? evt.data.attributes.image.data.attributes.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ''
        )

        if (hasEmptyFields) {
            console.log('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer${token}`
            },
            body: JSON.stringify({ data: values }),
        })

        if (!res.ok) {
            console.log('Something Went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.data.attributes.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const ImageUploaded = () => {
        console.log('image uploaded');
    }

    return (
        <Layout title='Add New Event'>
            <Link href='/events'>Go Back</Link>
            <h1>Edit Event</h1>
            {/* <ToastContainer /> */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type='submit' value='Edit Event' className='btn' />
            </form>
            <div>
                <h3>Image Preview</h3>
                {
                    imagePreview !== null &&
                    <Image src={imagePreview} width={170} height={170} />
                }
            </div>
            <div>
                <button onClick={() => setShowModal(true)}>Set image</button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.data.id} ImageUploaded={ImageUploaded} />
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ params: { id }, req }) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=%2A`)
    const evt = await res.json()
    const { token } = cookie.parse(req.headers.cookie)
    return {
        props: { evt }
    }
}
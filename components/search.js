import styles from '../styles/search.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
    const [term, setTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`)
        setTerm('')
    }

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Search...'
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </form>
        </div>
    )

}
export default Search;
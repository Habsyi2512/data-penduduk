import { router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

const Debug: React.FC = () => {
    const [queries, setQueries] = useState<string[]>(['']);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQueries = [...queries];
        newQueries[index] = e.target.value;
        setQueries(newQueries);
    };

    useEffect(() => {
        const query = queries.join('&'); // Assume you want to join the queries
        const currentRoute = route().current(); // Get current route

        if (currentRoute) { // Ensure the route is valid
            router.get(route(currentRoute), { search: query }, {
                preserveState: true,
                replace: true,
            });
        } else {
            console.error("Current route is not valid");
        }
    }, [queries]);

    return (
        <>
            <h1 className='mb-10'>Halaman Debug</h1>
            {queries.map((item, index) => (
                <form key={index}>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                </form>
            ))}
            <button
                onClick={() => setQueries([...queries, ''])} // Add a new input field
            >
                Add Input
            </button>
        </>
    );
};

export default Debug;

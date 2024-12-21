export type QueryType = 'searchDesa' | 'searchKK' | 'searchNIK';

export default function useSearchSuggestions() {
    const fetchSuggestions = async (query: string, type: QueryType) => {
        if (query.length < 3) {
            return [];
        }
        try {
            const url = `/search/${type}?${type}=${query}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Gagal mengambil data:', error);
            return [];
        }
    };

    return { fetchSuggestions };
}

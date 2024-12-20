export type QueryType = 'searchDesa' | 'searchKK' | 'searchNIK';

export default function useSearchSuggestions() {
    const fetchSuggestions = async (query: string, type: QueryType) => {
        if (query.length < 3) {
            return [];
        }
        try {
            const url = `/search/${type}?${type}=${query}`;
            // /search/searchKK?searchKK=2105
            // /search/searchNIK?searchNIK=2105
            console.log('url', url);
            const response = await fetch(url);
            console.log('status', response.status);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Gagal mengambil data:', error);
            return [];
        }
    };

    return { fetchSuggestions };
}

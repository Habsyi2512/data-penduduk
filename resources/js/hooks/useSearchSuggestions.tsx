import { TypeSuggestions } from '@/interface/interface';
import { useState } from 'react';

export default function useSearchSuggestions() {
    
    const fetchSuggestions = async (query: string, type: 'desa' | 'kepalaKeluarga') => {
        if (query.length < 3) {
            return [];
        }
        try {
            const url = type === 'desa' ? `/search-desa?searchDesa=${query}` : `/search-kepala-keluarga?searchKepalaKeluarga=${query}`;
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

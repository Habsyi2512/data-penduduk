import { useEffect, useState } from 'react';

export default function Debug({alamat}:any) {
    useEffect(()=>{
        console.log('alamat',alamat);
    },[])
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [regency, setRegency] = useState<{
        regency_id: string;
        regency_name: string;
    }>({ regency_id: '', regency_name: '' });
    const [district, setDistrict] = useState<{
        district_id: string;
        district_name: string;
    }>({ district_id: '', district_name: '' });

    const fetchSuggestions = async (searchQuery: string) => {
        const response = await fetch(`/api/search-village?q=${searchQuery}`);
        const data = await response.json();

        setSuggestions(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    // Menangani klik pada item saran
    const handleSuggestionClick = (suggestion: any) => {
        setQuery(suggestion.name); // Isi input dengan nama desa yang dipilih
        setRegency({
            regency_id: suggestion.regency_id,
            regency_name: suggestion.regency_name,
        });
        setDistrict({
            district_id: suggestion.district_id,
            district_name: suggestion.district_name,
        });
        setSuggestions([]); // Reset daftar saran setelah klik
    };

    useEffect(() => {
        if (query.length == 0) {
            setDistrict({ district_id: '', district_name: '' });
            setRegency({ regency_id: '', regency_name: '' });
        }
    }, [query]);

    return (
        <div>

            <h1>Halaman Debug</h1>
            <form className="relative mx-auto w-fit rounded bg-slate-200 p-5 shadow">
                <p>Kabupaten</p>
                <input
                    disabled
                    className="block"
                    type="text"
                    name="kabupaten"
                    placeholder="Kabupaten"
                    value={regency.regency_name}
                />
                <p>Kecamatan</p>
                <input
                    disabled
                    className="block"
                    type="text"
                    name="kecamatan"
                    placeholder="Kecamatan"
                    value={district.district_name}
                />
                <p>Kelurahan/Desa</p>
                <input
                    className="block"
                    type="text"
                    name="desa"
                    placeholder="Desa/Kelurahan"
                    value={query}
                    onChange={handleInputChange}
                />
                <ul className="absolute -left-[50px] top-[220px] mt-2 w-auto rounded border bg-white shadow">
                    {suggestions.map((item: any) => (
                        <li
                            key={item.id}
                            onClick={() => handleSuggestionClick(item)} // Tangani klik
                            className="cursor-pointer truncate px-4 py-2 hover:bg-gray-100"
                        >
                            <span className="text-sm">{item.name}</span>,{' '}
                            <span className="text-xs text-gray-500">
                                {item.district_name}
                            </span>
                            ,{' '}
                            <span className="text-xs text-gray-500">
                                {item.regency_name}
                            </span>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

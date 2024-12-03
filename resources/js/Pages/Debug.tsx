import { useState } from "react";

export default function Debug() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

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
        setSuggestions([]); // Reset daftar saran setelah klik
    };

    return (
        <div>
            <h1>Halaman Debug</h1>
            <form className="mx-auto w-fit rounded bg-slate-200 p-5 shadow">
                <p>Kelurahan/Desa</p>
                <input
                    className="block"
                    type="search"
                    name="desa"
                    placeholder="Desa/Kelurahan"
                    value={query}
                    onChange={handleInputChange}
                />
                <ul className="mt-2 bg-white border rounded shadow">
                    {suggestions.map((item: any) => (
                        <li
                            key={item.id}
                            onClick={() => handleSuggestionClick(item)} // Tangani klik
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

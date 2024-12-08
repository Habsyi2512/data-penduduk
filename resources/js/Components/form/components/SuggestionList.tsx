import { InputPendudukProps } from '@/interface/interface';
import { FormikProps } from 'formik';

export interface SuggestionItem {
    id: string;
    name: string;
    district_name: string;
    regency_name: string;
}

interface SuggestionListProps {
    queries: { [key: number]: string };
    index: number;
    formik: FormikProps<{
        forms: InputPendudukProps[];
    }>;
    handleSuggestionClick: (
        suggestion: SuggestionItem,
        index: number,
        formik: FormikProps<{
            forms: InputPendudukProps[];
        }>,
    ) => void;
    suggestions: { [key: number]: string[] }; // Pastikan tipe data sesuai
}

const SuggestionList: React.FC<SuggestionListProps> = ({
    queries,
    index,
    formik,
    handleSuggestionClick,
    suggestions,
}) => {
    const currentSuggestions = Array.isArray(suggestions[index])
        ? suggestions[index]
        : [];

    return (
        <ul className="absolute top-[70px] z-[9999] mt-2 w-auto rounded border bg-white shadow">
            {currentSuggestions
                .filter((item: any) =>
                    item.name
                        .toLowerCase()
                        .includes(queries[index]?.toLowerCase() || ''),
                )
                .map((item: any) => (
                    <li
                        key={item.id}
                        onClick={() =>
                            handleSuggestionClick(item, index, formik)
                        }
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
    );
};

export default SuggestionList;

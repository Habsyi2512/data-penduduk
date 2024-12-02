import { useCombobox } from "downshift";
import { useState } from "react";

export default function ComboboxExample() {
    const items = ["Apple", "Banana", "Orange", "Grape", "Mango"];
    const [filteredItems, setFilteredItems] = useState(items);

    const {
        isOpen,
        highlightedIndex,
        selectedItem,
        getMenuProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        inputValue,
    } = useCombobox({
        items,
        onInputValueChange: ({ inputValue }) => {
            setFilteredItems(
                items.filter((item) =>
                    item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")
                )
            );
        },
    });

    return (
        <div className="w-96 mx-auto mt-10">
            <label {...getLabelProps()} className="block text-gray-700 font-bold">
                Pilih Buah:
            </label>
            <div className="relative">
                <input
                    {...getInputProps()}
                    className="block w-full border border-gray-300 p-2 rounded"
                    placeholder="Cari buah..."
                />
                <ul
                    {...getMenuProps()}
                    className={`absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg ${
                        isOpen ? "" : "hidden"
                    }`}
                >
                    {isOpen &&
                        filteredItems.map((item, index) => (
                            <li
                                key={index}
                                {...getItemProps({ item, index })}
                                className={`px-4 py-2 cursor-pointer ${
                                    highlightedIndex === index ? "bg-gray-200" : ""
                                } ${
                                    selectedItem === item ? "font-bold text-blue-500" : ""
                                }`}
                            >
                                {item}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

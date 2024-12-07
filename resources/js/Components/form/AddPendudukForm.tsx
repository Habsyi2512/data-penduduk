import { ErrorMessage, Form, FormikProps } from 'formik';
import { SetStateAction } from 'react';
import Box from '../box/Box';
import { TrashIcon } from '../icons/TrashIcon';
import InputField from './components/Input';
import Label from './components/Label';

interface AddPendudukFormProps {
    formik: FormikProps<{
        forms: { nik: string; name: string }[]; // Ensure this matches the actual structure you're using
    }>;
    push: <X = any>(obj: X) => void;
    remove: <X = any>(index: number) => X | undefined;
    openByIdx: boolean[];
    setOpenByIdx: React.Dispatch<SetStateAction<boolean[]>>;
    toggleAccordion: (index: number) => void;
    handleConfirmModal: (
        remove: <X = any>(index: number) => X | undefined,
        index: number,
        formik: FormikProps<{
            forms: { nik: string; name: string }[]; // Ensure this matches the actual structure you're using
        }>,
    ) => void;
}

export default function AddPendudukForm({
    formik,
    push,
    remove,
    openByIdx,
    setOpenByIdx,
    toggleAccordion,
    handleConfirmModal,
}: AddPendudukFormProps) {
    const handleAddForm = (push: <X = any>(obj: X) => void) => {
        push({ nik: '', name: '' });
        setOpenByIdx((prevState) => [...prevState, true]);
    };
    return (
        <Form>
            {formik.values.forms.map((form, index) => (
                <Box key={index} className="mb-3">
                    <div className="flex items-center justify-between p-5">
                        <h2 className="font-inter text-xl font-bold text-blue-600 dark:text-gray-400">
                            Form {index + 1}
                        </h2>
                        <div className="flex h-full w-auto space-x-3">
                            {!openByIdx[index] && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleConfirmModal(
                                            remove,
                                            index,
                                            formik,
                                        )
                                    }
                                    disabled={formik.values.forms.length === 1} // Disable when there's only one form
                                    className="flex aspect-square w-10 flex-1 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => toggleAccordion(index)}
                                className="w-20 rounded-md border border-blue-300/50 bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:border-gray-500/50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                {openByIdx[index] ? 'Tutup' : 'Buka'}
                            </button>
                        </div>
                    </div>
                    {openByIdx[index] && <hr className="border-blue-200 dark:border-gray-800" />}
                    <div
                        className={`grid transition-all ${
                            openByIdx[index]
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-5">
                                <div>
                                    <Label htmlFor={`forms.${index}.nik`}>
                                        NIK
                                    </Label>
                                    <InputField
                                        name={`forms.${index}.nik`}
                                        className="mb-2 block"
                                        value={form.nik || ''} // Ensure controlled component
                                    />
                                    {/* Display ErrorMessage for NIK */}
                                    <ErrorMessage
                                        name={`forms.${index}.nik`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`forms.${index}.name`}>
                                        Name
                                    </Label>
                                    <InputField
                                        name={`forms.${index}.name`}
                                        className="mb-2 block"
                                        value={form.name || ''} // Ensure controlled component
                                    />
                                    {/* Display ErrorMessage for Name */}
                                    <ErrorMessage
                                        name={`forms.${index}.name`}
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>

                                {/* Button to remove the current form */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleConfirmModal(
                                            remove,
                                            index,
                                            formik,
                                        )
                                    }
                                    disabled={formik.values.forms.length === 1} // Disable when there's only one form
                                    className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            ))}

            <div className="space-x-5">
                <button
                    type="button"
                    onClick={() => handleAddForm(push)}
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
                >
                    Add Form
                </button>

                <button
                    type="submit"
                    className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
                >
                    Submit
                </button>
            </div>
        </Form>
    );
}

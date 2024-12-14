export interface FlashMessages {
    message?: string | null; // Opsional karena mungkin tidak selalu ada
    success?: string | null; // Opsional untuk pesan sukses
    error?: string | null;   // Opsional untuk pesan error
}

// Tambahkan interface untuk PageProps
export interface PageProps {
    flash: FlashMessages; // Properti flash
    auth?: { user: { id: number; name: string; email: string } }; // Contoh properti auth
    ziggy?: { location: string }; // Contoh properti ziggy
}
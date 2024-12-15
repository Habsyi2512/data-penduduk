export default function DataKKModal({ data = 'no data' }: { data: string }) {
    return (
        <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-white/20 px-5 backdrop-blur-sm">
            <div className="w-full">data {data}</div>
        </div>
    );
}

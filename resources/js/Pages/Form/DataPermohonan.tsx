import Table from "@/Components/table/Table";
import TableBody from "@/Components/table/TableBody";
import TableHead from "@/Components/table/TableHead";
import Td from "@/Components/table/Td";
import Th from "@/Components/table/Th";
import Tr from "@/Components/table/Tr";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function DataPermohonan(){
return(
<Authenticated>
    <div className="px-5">
        <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
            Management Data Pekerjaan
        </h1>
    </div>
    <Table>
        <TableHead>
            <Tr>
                <Th>No</Th>
                <Th>Jenis Permohonan</Th>
                <Th>Status Permohonan</Th>
                <Th>Tanggal Dibuat</Th>
                <Th>Tanggal Diterima</Th>
            </Tr>
        </TableHead>
        <TableBody>

            <Tr>
                <Td>1</Td>
                <Td>Cetak KK Baru</Td>
                <Td>Diproses</Td>
                <Td>22-11-2022</Td>
                <Td>02-12-2022</Td>
            </Tr>
        </TableBody>
    </Table>
</Authenticated>
)
}

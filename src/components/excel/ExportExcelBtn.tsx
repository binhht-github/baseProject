import { useToast } from "@/hooks/useToast";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type ExportExcelButtonProps<T extends Record<string, any>> = {
    data: T[];
    fileName?: string;
    sheetName?: string;
    children?: React.ReactNode;
};

export function ExportExcelButton<T extends Record<string, any>>({
    data,
    fileName = "export.xlsx",
    sheetName = "Sheet1",
    children = "Xuất Excel",
}: ExportExcelButtonProps<T>) {
    const { toast } = useToast();
    const handleExport = async () => {
        if (!data || data.length === 0) {
            toast.warning("Không có dữ liệu để xuất");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        const keys = Object.keys(data[0]);

        // 1. Thêm header
        worksheet.addRow(keys);

        // 2. Format header: in đậm, căn giữa
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center" };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "D9E1F2" },
            };
        });

        // 3. Thêm dữ liệu
        data.forEach((item) => {
            worksheet.addRow(keys.map((k) => item[k]));
        });

        // 4. Tự động căn chiều rộng cột
        worksheet.columns.forEach((column) => {
            let maxLength = 10;
            column.eachCell?.((cell) => {
                const cellLength = cell.value?.toString().length ?? 10;
                if (cellLength > maxLength) maxLength = cellLength;
            });
            column.width = maxLength + 2;
        });

        // 5. Xuất file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, fileName);
    };

    return (
        <button onClick={handleExport} className="btn btn-primary">
            {children}
        </button>
    );
}

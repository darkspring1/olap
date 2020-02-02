import { ModelDescription, ColumnDescription, RowDescription } from './modelDescription';

class ModelDescriptionConverter
{
    private CreateModelColumn(header: string, index: number) : ColumnDescription
    {
        return new ColumnDescription(header, `c_${index}`, 'number');
    }

    private CreateModelRow(row: any[]) : RowDescription
    {
        return new RowDescription(row[0]);
    }

    FromData(modelName: string, data: any[][]) : ModelDescription
    {
        let rows = data.map(this.CreateModelRow);
        let columns = data[0].map(this.CreateModelColumn);
        return new ModelDescription(modelName, rows, columns);
    }
}

const modelDescriptionConverter = new ModelDescriptionConverter();

export default modelDescriptionConverter;
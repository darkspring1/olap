export class ColumnDescription
{
    constructor(header: string, systemName: string, type: string)
    {
       this.Header = header;
       this.SystemName = systemName;
       this.Type = type;
    }

    readonly Header: string;
    readonly SystemName: string;
    readonly Type: string;
}

export class RowDescription
{
    constructor(header: string)
    {
       this.Header = header;
    }

    readonly Header: string;
}


export class ModelDescription
    {
        constructor(modelName: string, rows: Array<RowDescription>, columns: Array<ColumnDescription>)
        {
            this.ModelName = modelName;
            this.Rows = rows;
            this.Columns = columns;
        }

        readonly ModelName: string;
        readonly Rows: Array<RowDescription>;
        readonly Columns: Array<ColumnDescription>;
    }
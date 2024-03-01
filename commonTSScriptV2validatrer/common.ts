export class EntryPoint {
    private dataTable: HTMLTableElement;
    private container: HTMLDivElement;

    constructor() {
        this.dataTable = document.createElement('table');
        this.container = document.createElement('div');
        console.log('call Invoked');
    }

    public  makeStucture(response: any): HTMLDivElement {
        this.container = document.createElement('div');
        if (response) {
            console.log('this is the data', response);
            this.container = this.addData(response);
            console.log('tableElement ===>', this.container);
            return this.container;
        }

        return this.container;
    }

    public addData(data: any): HTMLDivElement {
        console.log('this is the data=>', data);
        this.dataTable = document.createElement('table');
        this.container = document.createElement('div');
        this.container.setAttribute('class','parentDiv');
        this.dataTable.setAttribute('class', 'Mastertable');

        // Making Table Head
        const headerRow = document.createElement('tr');
        headerRow.setAttribute('class', 'tableRow');

        for (const i in data[0]) {
            const headerCell = document.createElement('td');
            headerCell.setAttribute('class', 'RowData');
            headerCell.textContent = i;
            headerRow.appendChild(headerCell);
        }

        this.dataTable.appendChild(headerRow);

        // Making Table Body
        for (const i in data) {
            const cellRow = document.createElement('tr');
            for (const j in data[i]) {
                const dataCell = document.createElement('td');
                dataCell.setAttribute('class', 'RowData');
                dataCell.textContent = data[i][j];
                cellRow.appendChild(dataCell);
            }
            this.dataTable.appendChild(cellRow);
        }

        this.container.appendChild(this.dataTable);
        return this.container;
    } 
}

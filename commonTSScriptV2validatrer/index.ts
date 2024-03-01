import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { EntryPoint } from "./common"
export class commonTSScriptV2validatrer implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    public processButton: HTMLButtonElement;
    public _container: HTMLDivElement;
    constructor() {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container;
        this.processButton = document.createElement('button');
        this.processButton.textContent = 'View Records';
        this.processButton.className = 'btn';
        var resultContainer = document.createElement('div');
        var formDiv = document.createElement('div');
        this.processButton.addEventListener('click', async () => {
            resultContainer = await this.handelProcessClick();
            container.appendChild(resultContainer);
        });
        container.appendChild(this.processButton);
        const formButton = document.createElement('button');
        formButton.textContent = 'Add new Record';
        formButton.className = 'btn';
        formButton.addEventListener('click', () => {
            formDiv = this.createUserForm()
            this._container.appendChild(formDiv);
            container.appendChild(formDiv);
            container.removeChild(formButton);
            container.removeChild(this.processButton);
            container.removeChild(resultContainer);
        })
        container.appendChild(formButton);
    }
    public createUserForm(): HTMLDivElement {
        var formDiv = document.createElement('div');
        var formHeading = document.createElement('h1');
        formHeading.innerHTML = 'Create New Record';
        formDiv.appendChild(formHeading)
        formDiv.className ='formDiv'
        const Name = document.createElement("input");
        Name.type = "text";
        Name.placeholder = "Name";
        Name.className ='formInput';
        formDiv.appendChild(Name);


        const Age = document.createElement("input");
        Age.type = "number";
        Age.placeholder = "Age";
        Age.className ='formInput';
        formDiv.appendChild(Age);

        const Color = document.createElement("input");
        Color.type = "text";
        Color.className ='formInput';
        Color.placeholder = "Color";
        formDiv.appendChild(Color);

        const saveButton = document.createElement("button");
        saveButton.textContent = 'Save';
        saveButton.className='btn'
        saveButton.addEventListener('click', () => {
            this.processUserCreation();

        })
        formDiv.appendChild(saveButton);

        return formDiv;

    }
    public processUserCreation(): void {
        const name = (this._container.querySelector("input[placeholder='Name']") as HTMLInputElement)?.value;
        const age = (this._container.querySelector("input[placeholder='Age']") as HTMLInputElement)?.value;
        const color = (this._container.querySelector("input[placeholder='Color']") as HTMLInputElement)?.value;
        const load: {
            'name': string,
            'age': number,
            'colour': string,
        } = {
            'name':name,
            'age': parseInt(age),
            'colour': color
        };
        console.log('revenue=>', load)
        const url = 'https://crudcrud.com/api/0ae2f1fb4ce247a0b575b7d75f6b7453/unicorns';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(load),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to create user. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(`Record created successfully with Record ID ${data['_id']}`)
                console.log('Record created successfully:', data);
            })
            .catch(error => {
                console.error('Error creating user:', error.message);
            });

    }
    public async handelProcessClick(): Promise<HTMLDivElement> {
        const obj = new EntryPoint();
        const apiString = 'https://crudcrud.com/api/0ae2f1fb4ce247a0b575b7d75f6b7453/unicorns';
        var container = document.createElement('div');
        const data = await this.getData(apiString);
        container = obj.makeStucture(data);
        return container;
    }
    public async getData(apiUrl: string): Promise<{ entries: any[] } | null> {
        console.log('in getData: ' + apiUrl);
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                return null;
            }

            const data = await response.json();
            console.log('from getData', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

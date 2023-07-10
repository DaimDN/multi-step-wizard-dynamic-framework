/* eslint-disable @typescript-eslint/no-var-requires */
import { Application,Request, Response } from 'express';
import * as URLS from './urls';
import {WizardRepository, WizardRepositoryStorages} from './DB/respository';
import {WizardModel} from './model/wizardModel';
import { v4 as uuidv4 } from 'uuid';
import { InputValidator } from './middleware/validators/Input';
import {WizardModelInterface} from './index'

    type AppRequest =  Request | any;

    type AppResponse = Response | any;

    /* The `ProtectedRoutedNavigationSetup` class handles HTTP requests related to wizards in an
    application, including retrieving all wizards, retrieving a specific wizard, creating a new wizard,
    and updating the data of a specific wizard. */
export class ProtectedRoutedNavigationSetup {

    protected Repository: Map<string, WizardModelInterface[]>;
    /**
     * The constructor initializes the Repository property by getting the instance of the WizardRepository
     * and accessing its repository.
     */
    constructor(){
        this.Repository = WizardRepository.getInstance().getRepository();
    }
    /**
     * The `enableFor` function handles various HTTP requests (GET, POST, PUT) related to wizards in an
     * application.
     * @param {Application} app - The `app` parameter is an instance of the `Application` class. It
     * represents the Express application to which the routes are being added.
     */
    public enableFor(app: Application): void {

        /* This code block is handling a GET request to retrieve all wizards from the repository. It uses the
        `app.get()` method to define a route for the specified URL (`URLS.GET_ALL_WIZARD`). When a GET
        request is made to this URL, the callback function is executed. */

        app.get(URLS.GET_ALL_WIZARD as string, (req: AppRequest, res: AppResponse)=>{
            res.json({wizards: this.Repository.get(WizardRepositoryStorages.Wizards)});
        });

        /* The code block you provided is handling a GET request to retrieve a specific wizard from the
        repository. */


        app.get(URLS.GET_WIZARD as string, (req: AppRequest, res: AppResponse)=>{
            const {Id}: any = req.params;
            const foundWizards =   this.Repository.get(WizardRepositoryStorages.Wizards)?.filter(wiz => wiz['id'] === Id);
            if(foundWizards?.length === 0){
                return res.status(404).json({msg: 'wizard not found'});
            }else{
                return res.status(200).json({wizard: foundWizards?.[0]})
            }
        });
    

    /* The code block you provided is handling a POST request to create a new wizard. */
        app.post(URLS.POST_WIZARD_CREATOR as string , (req: AppRequest, res: AppResponse)=> {
            const RandomID = uuidv4();
            const newModel = WizardModel();
            newModel.id = RandomID;
            if(!this.Repository.has(WizardRepositoryStorages.Wizards)){
                this.Repository.set(WizardRepositoryStorages.Wizards, [newModel] as any);
            }else{
                const currentWizardInCache = this.Repository.get(WizardRepositoryStorages.Wizards) as [] | any;
                this.Repository.set(WizardRepositoryStorages.Wizards, [...currentWizardInCache, newModel]);
            }
            return res.status(200).json({wizards: this.Repository.get(WizardRepositoryStorages.Wizards), msg: 'Wizard added successfully', status: 200})
        });

        /* The code block you provided is handling a POST request to delete a specific wizard from the
        repository. */
        app.get(URLS.GET_DELETE_WIZARD as string , (req: AppRequest, res: AppResponse)=> {
            const {Id}: any = req.params;
            if(req.params.hasOwnProperty('Id')){
                const repositoryElimintaingWizardWithId = this.Repository.get(WizardRepositoryStorages.Wizards)?.filter(wizard => wizard.id !== Id);
                console.log({Id, repositoryElimintaingWizardWithId})
                this.Repository.set(WizardRepositoryStorages.Wizards, repositoryElimintaingWizardWithId as [] );
                return res.status(200).json({msg: 'wizard has been removed successfully' });
            }
            else{
                return res.status(404).json({data: 'wizard not found'});
            }
        });


       /* The code block you provided is handling a PUT request to update the data of a specific wizard
       in the repository. */
        app.put(URLS.PUT_UPDATE_WIZARD_DATA as string, new InputValidator().enableFor , (req: AppRequest, res: AppResponse)=> {
            const {Id} = req.params;
            const updatedData = req.body;
            const data = this.Repository.get(WizardRepositoryStorages.Wizards)?.map(wizard => {
                let WizardData = wizard;
                if(wizard['id'] === Id){
                    WizardData = updatedData;
                }
                return WizardData;
            }) as [];
            this.Repository.set(WizardRepositoryStorages.Wizards, data);
            return res.status(200).json({msg: 'data has been updated', data: this.Repository.get(WizardRepositoryStorages.Wizards)});
        })

    }

}
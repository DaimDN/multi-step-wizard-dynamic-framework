/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import * as URLS from './urls';
import {WizardRepository, WizardRepositoryStorages} from './DB/respository';
import {WizardModel} from './model/wizardModel';
import { v4 as uuidv4 } from 'uuid';


export class ProtectedRoutedNavigationSetup {

    protected Repository: Map<string, any[]>;

    constructor(){
        this.Repository = WizardRepository.getInstance().getRepository();

    }

    public enableFor(app: Application): void {

        app.get(URLS.GET_ALL_WIZARD as string, (req, res)=>{
            res.json({wizards: this.Repository.get(WizardRepositoryStorages.Wizards)});
        });

        app.get(URLS.GET_WIZARD as string, (req, res)=>{
            const {Id}: any = req.params;
            const foundWizards =   this.Repository.get(WizardRepositoryStorages.Wizards)?.filter(wiz => wiz['id'] === Id);
            if(foundWizards?.length === 0){
                return res.status(404).json({msg: 'wizard not found'});
            }else{
                return res.status(200).json({wizard: foundWizards?.[0]})
            }
        });

        app.post(URLS.POST_WIZARD_CREATOR as string, (req, res)=> {
            const RandomID = uuidv4();
            const newModel = WizardModel();
            newModel.id = RandomID;
            if(!this.Repository.has(WizardRepositoryStorages.Wizards)){
                this.Repository.set(WizardRepositoryStorages.Wizards, [newModel]);
            }else{
                const currentWizardInCache = this.Repository.get(WizardRepositoryStorages.Wizards) as [];
                this.Repository.set(WizardRepositoryStorages.Wizards, [...currentWizardInCache, newModel]);
            }
            return res.status(200).json({wizards: this.Repository.get(WizardRepositoryStorages.Wizards), msg: 'Wizard added successfully', status: 200})
        });

        app.put(URLS.PUT_UPDATE_WIZARD_DATA as string, (req, res)=> {
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
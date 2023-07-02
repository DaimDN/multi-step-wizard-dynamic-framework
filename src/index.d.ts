/**
 * 
 * 
 * @type of links must be a string 
 */
export type PageLink = String;


/* The `WizardModelInterface` is an interface in TypeScript that defines the structure of an object
representing a wizard model. */
export interface WizardModelInterface {
    id: string,
    wizard: {
            isDone: boolean,
            data: {
                step1: { 
                    name: { type: string, value: string },
                    description: {type: string, value: string},
                },
                isDone: boolean,
                data: {
                    step2: {
                        features:{
                            id: number,
                            value: string,
                            isEnabled: boolean,
                            type: string,

                        }[] ,
                    },
                }
            }
     },

}
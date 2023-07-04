            export type NavigatableItems = {
                link: string;
                component: string | any;
            }[];

            export  type NavigatableLink= string;


            /**
             * 
             * 
             * @type of links must be a string 
             */
            export type PageLink = String;


            /* The `export interface QuestionWithNameAnddescription` is defining the structure of an object
            representing a question with a name, description, type, and value. It has the following properties: */
            export interface QuestionWithNameAnddescription {
                question: string, type: string, value: string
            }

            /* The `QuestionWithCheckBoxes` interface is defining the structure of an object representing a
            question with checkboxes. It has the following properties: */
            export interface QuestionWithCheckBoxes {
                question: string,
                value: boolean | string | null,
                isEnabled: boolean,
                type: string,
            }

            /* The `Steps` interface is defining the structure of an object representing a step in a wizard model.
            It has the following properties: */
            export interface Steps {
                stepNo: number,
                isDone: boolean,
                questions: QuestionWithCheckBoxes[] | QuestionWithNameAnddescription[]
            }
            /* The `WizardModelInterface` is an interface in TypeScript that defines the structure of an object
            representing a wizard model. */
            export interface WizardModelInterface {
                id: string,
                wizard: {
                        isDone: boolean,
                        steps: Steps[],
                    
                },

            }
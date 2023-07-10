/**
 * The function exports a WizardModel object with nested properties and values.
 * @returns The code is returning an object with nested properties. The top-level properties are "id"
 * and "wizard". The "id" property is an empty string. The "wizard" property is an object with two
 * properties: "isDone" and "data". The "isDone" property is a boolean value set to false. The "data"
 * property is another object with two properties: "step
 */
export const WizardModel = () => {
    return {
        id: '',
        wizard: {
                isDone: false,
                steps: [
                    {
                    stepNo: 1,    
                    isDone: false,
                    questions: [  
                        { question: 'name', type: 'input', value: '' },
                        {question: 'description',type: 'text', value: ''},
                    ],
                    },
                    {
                    stepNo: 2,
                    isDone: false,
                    questions: [
                        {
                            question: 'Tab Switcher',
                            value: 'Tab Switcher',
                            isEnabled: false,
                            type: 'checkbox',

                        },
                        {
                            question: 'Menu Switcher',
                            value: 'Menu Switcher',
                            isEnabled: false,
                            type: 'checkbox',
                        },
                        {
                            question: 'Footer Switcher',
                            value: 'Footer Switcher',
                            isEnabled: false,
                            type: 'checkbox',
                        },
                        {
                            question: 'Side Menu Switcher',
                            value: 'Side Menu Switcher',
                            isEnabled: false,
                            type: 'checkbox',
                        },
                        {
                            question: 'Dock Launcher',
                            value: 'Dock Launhcer',
                            isEnabled: false,
                            type: 'checkbox',
                        },
                        {
                            question: 'Menu Toggler',
                            value: 'Menu Toggler',
                            isEnabled: false,
                            type: 'checkbox',
                        }
                    ],
                    },
                ]
         },

    }
}
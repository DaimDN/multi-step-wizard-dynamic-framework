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
                data: {
                    step1: {  
                        name: { type: 'input', value: '' },
                        description: {type: 'text', value: ''},
                    },
                    isDone: false,
                    data: {
                        step2: {
                            features: [
                            {
                                id: 1,
                                name: 'Tab Switcher',
                                isEnabled: false,
                                type: 'checkbox',

                            },
                            {
                                id: 2,
                                name: 'Menu Switcher',
                                isEnabled: false,
                                type: 'checkbox',
                            },
                            {
                                id: 3,
                                name: 'Footer Switcher',
                                isEnabled: false,
                                type: 'checkbox',
                            },
                            {
                                id: 4,
                                name: 'Side Menu Switcher',
                                isEnabled: false,
                                type: 'checkbox',
                            },
                            {
                                id: 5,
                                name: 'Dock Launhcer',
                                isEnabled: false,
                                type: 'checkbox',
                            },
                            {
                                id: 6,
                                name: 'Menu Toggler',
                                isEnabled: false,
                                type: 'checkbox',
                            }
                        ],
                        },
                    }
                }
         },

    }
}
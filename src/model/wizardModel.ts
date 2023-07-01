

export const WizardModel = () => {
    return {
        id: '',
        wizard: {
                isDone: false,
                data: {
                    name: '',
                    description: '',
                    features: [
                        {
                            id: 1,
                            name: 'Tab Switcher',
                            isEnabled: false,
                        },
                        {
                            id: 2,
                            name: 'Menu Switcher',
                            isEnabled: false,
                        },
                        {
                            id: 3,
                            name: 'Footer Switcher',
                            isEnabled: false,
                        },
                        {
                            id: 4,
                            name: 'Side Menu Switcher',
                            isEnabled: false,
                        },
                        {
                            id: 5,
                            name: 'Dock Launhcer',
                            isEnabled: false,
                        },
                        {
                            id: 6,
                            name: 'Menu Toggler',
                            isEnabled: false,
                        }
                    ],
                }
         },

    }
}
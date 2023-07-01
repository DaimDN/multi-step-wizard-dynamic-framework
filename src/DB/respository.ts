/* The WizardRepository class is a Singleton class that provides access to a repository of wizards. */




export enum WizardRepositoryStorages {
    Wizards = 'wizard'
}
/* The WizardRepository class is a Singleton class that provides access to a repository of wizards. */
 export class WizardRepository {

    /* The `private static instance: WizardRepository` is a static variable that holds the single instance
    of the `WizardRepository` class. It is declared as `private` to prevent direct access from outside
    the class. */
    private static instance: WizardRepository;

    private Repository;
        /**
         * The Singleton's constructor should always be private to prevent direct
         * construction calls with the `new` operator.
         */
    private constructor() {
        this.Repository = new Map<string, any[]>();
     }

        /**
         * The static method that controls the access to the singleton instance.
         *
         * This implementation let you subclass the Singleton class while keeping
         * just one instance of each subclass around.
         */
    public static getInstance(): WizardRepository {
        if (!WizardRepository.instance) {
            WizardRepository.instance = new WizardRepository();
        }
        return WizardRepository.instance;
    }

        /**
         * Finally, any singleton should define some business logic, which can be
         * executed on its instance.
         */
    public getRepository() {
        return this.Repository;
    }
}
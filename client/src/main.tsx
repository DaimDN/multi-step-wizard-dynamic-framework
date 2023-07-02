import {Fragment} from 'react';
import {useTitle} from './hooks/useTitle';
import { connect } from 'react-redux';
import './main.css'
import {Card, Button, Typography} from 'antd';
import {AxiosServiceInstance} from './common/network/ajaxInstance';
import { WizardModelInterface } from './routes';


const { Title } = Typography;


 const MainLoader = ({authenticationDetails, wizards}: {authenticationDetails: {userAuthenticationDetails: {token: string}}, wizards: WizardModelInterface[]}) => {

/* The `useTitle('Wizard Creator - Appvia');` is a custom hook that sets the title of the webpage to
"Wizard Creator - Appvia". It is used to dynamically update the title of the webpage. */
  useTitle('Wizard Creator - Appvia');

  /**
   * The above code defines two functions, `createNewWizard` and `navigateToWizardScreen`, in a
   * TypeScript React application.
   * @param event - The event parameter is of type React.FormEvent<EventTarget>. It is an event object
   * that represents a form submission event in React.
   */
  const createNewWizard = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).post('/api/wizard/create');
      window.location.href = window.location.origin;
    } catch (error) {
      console.log(error);
    }
  }
    const navigateToWizardScreen = async (params: string) => {
      window.location.href = `/wizard/view/${params}?edit=true&step=1`;
      
  }
  /**
   * The function `deleteWizard` is an asynchronous function that makes a GET request to a specific API
   * endpoint and logs the response to the console.
   * @param {string} params - The `params` parameter is a string that represents the ID of the wizard
   * that you want to delete.
   */
  const deleteWizard = async (params: string) => {
    try {
      await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).get(`/api/wizard/delete/${params}`);
      window.location.href = window.location.origin;
    } catch (error) {
        console.log(error);
    }
    
}
  return <Fragment>
      <main className='wizard_screen'>
      <Title>Wizard Creator</Title>
        <div className='flex'>
        <Card  style={{margin: '2vh'}} title="Create Wizard">
          <Button type='primary' onClick={(event)=> createNewWizard(event)}>Create New</Button>
        </Card>
         {Array.isArray(wizards) &&  wizards?.map((element: any)=> {
          return <Card key={`${element.id}`} style={{margin: '2vh', display: 'grid'}} title={element.id.slice(0, 8).toUpperCase()   }>
               <Button className='remove_icon' onClick={()=> deleteWizard(element.id)} danger>Delete</Button>
               <Button onClick={()=> navigateToWizardScreen(element.id)}>Edit</Button>
            </Card>
        })}
        </div>
      </main>
  </Fragment>
}
  /**
   * The function `mapStoreStatesToPropsMapper` maps the state properties `authDetails` and
   * `wizardDetails` to the props `authenticationDetails` and `wizards` respectively.
   * @param state - The `state` parameter is an object that represents the current state of the
   * application. It has two properties:
   */
  const mapStoreStatesToPropsMapper = (state: { authDetails: {userAuthenticationDetails: {token: string}}; wizardDetails: {wizardPayload: WizardModelInterface[]}; }) => ({
    authenticationDetails: state.authDetails,
    wizards: state.wizardDetails.wizardPayload as WizardModelInterface[]
  });

export default connect(mapStoreStatesToPropsMapper)(MainLoader);
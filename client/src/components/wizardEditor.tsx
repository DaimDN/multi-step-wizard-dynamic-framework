
import {Fragment} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {useTitle} from '../hooks/useTitle';
import { connect } from 'react-redux';
import {Typography} from 'antd';
import {FormFragment} from './partials/FormFragment';
import { Summary } from './partials/summary';
const { Title } = Typography;

const WizardEditor = ({authenticationDetails, wizards}:any) => {
    /* The line `const { Id } = useParams();` is using the `useParams` hook from the `react-router-dom`
    library to extract the value of the `Id` parameter from the URL. It allows you to access the
    dynamic portion of the URL and use it in your component. In this case, it is extracting the value
    of the `Id` parameter and assigning it to the `Id` variable. */
    const { Id } = useParams();
  /* The line `const [searchParams] = useSearchParams();` is using the `useSearchParams` hook from the
  `react-router-dom` library to get access to the search parameters in the URL. */
    const [searchParams] = useSearchParams();

    useTitle(Id?.slice(0, 8).toUpperCase() + '- Wizard Creator - Appvia');
    /* The code `const findWizardFromWizard = Array.isArray(wizards) && wizards.length > 0 ?
    wizards.filter(wizard => wizard.id === Id)[0] : [];` is filtering the `wizards` array to find a
    wizard object that has an `id` property matching the value of `Id`. */
    const findWizardFromWizard = Array.isArray(wizards) && wizards.length > 0 ? wizards.filter(wizard => wizard.id === Id)[0] : [];

    /* The code `const editOption = searchParams.get('edit');` and `const stepNo =
    searchParams.get('step');` are retrieving the values of the query parameters 'edit' and 'step' from
    the URL's search parameters. */
    const editOption = searchParams.get('edit');
    const stepNo = searchParams.get('step');
    const summaryPreview = searchParams.get('preview');

    console.log({editOption, stepNo, summaryPreview})

    return <Fragment>
        <main className='wizard_screen'>
      <Title>Wizard Editor - {Id?.slice(0, 8).toUpperCase()}</Title>
      <Title level={3}> {stepNo && 'Step No: '+ stepNo} {summaryPreview && 'Summary'}</Title>
       {Number(stepNo) === 1 && <FormFragment formFields={{...findWizardFromWizard}} stepNo={stepNo} authenticationDetails={authenticationDetails} Id={Id}/>}
       {Number(stepNo) === 2 && <FormFragment formFields={{...findWizardFromWizard}} stepNo={stepNo} authenticationDetails={authenticationDetails} Id={Id}/>}
       {summaryPreview && <Summary formFields={{...findWizardFromWizard}}/>}
      </main>
    </Fragment>
}
  /**
   * The function `mapStoreStatesToPropsMapper` maps the state properties `authDetails` and
   * `wizardDetails` to the props `authenticationDetails` and `wizards` respectively.
   * @param state - The `state` parameter is an object that represents the current state of the
   * application. It has two properties:
   */
  const mapStoreStatesToPropsMapper = (state: { authDetails: {userAuthenticationDetails: {token: string}}; wizardDetails: {wizardPayload: any[]}; }) => ({
    authenticationDetails: state.authDetails,
    wizards: state.wizardDetails.wizardPayload
  });

export default connect(mapStoreStatesToPropsMapper)(WizardEditor);
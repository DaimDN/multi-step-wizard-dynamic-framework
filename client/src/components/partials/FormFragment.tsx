
import {Fragment, useState, SyntheticEvent} from 'react';
import { Input, Typography, Button, Checkbox } from 'antd';
import { AxiosServiceInstance } from '../../common/network/ajaxInstance';
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { QuestionWithCheckBoxes, QuestionWithNameAnddescription } from '../../interface';

    const { Title } = Typography;
    const { TextArea } = Input;


    const mapKeyEntryToFormDataValues = (key: string, value: string) => {
        const wildCartSplitter = key.split('*');
        const question = wildCartSplitter[0];
        const questionType = wildCartSplitter[1];
        const filledQuestionWithValues = {};
        switch(questionType) {
            case 'checkbox':
                Object.assign(filledQuestionWithValues, {question, type: 'checkbox', value, isEnabled: true });
            break;

            case 'input':
                Object.assign(filledQuestionWithValues, {question, type: 'input', value });
            break;

            case 'text':
                Object.assign(filledQuestionWithValues, {question, type: 'text', value });
            break;

            default: 
        }
        return filledQuestionWithValues;
    }

    /* The above code is a TypeScript React component called `FormFragment`. It is used to render a form
    with different input fields based on the `stepNo` prop. The form fields and their values are passed
    through the `formFields` prop. The component also receives `authenticationDetails` and `Id` props. */
    export const FormFragment = ({formFields, stepNo, authenticationDetails, Id, totalSteps}: 
        {formFields: { [key: string]: any; }, 
        stepNo: string | undefined | null, authenticationDetails: any, Id: string| undefined, totalSteps: number }) => {
        
        const [formData, setFormData]: {} | any = useState({});

        /**
         * The function `formFieldChanger` is used to update the form data by setting the value of the input or
         * textarea element to the corresponding property in the `formData` object.
         * @param {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> |
         * CheckboxChangeEvent | any} event - The `event` parameter is of type
         * `React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | CheckboxChangeEvent
         * | any`. This means that it can accept an event object from various types of form fields, including
         * input fields (`React.ChangeEvent<HTMLInputElement>`), textarea fields (`React.ChangeEvent
         */
            const formFieldChanger = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | CheckboxChangeEvent | any  ) => 
        setFormData({ ...formData, [event.target.name]: event.target.value });
        
    /**
     * The submitForm function is used to handle form submission in a React application, specifically for
     * a multi-step wizard form.
     * @param reactEvent - The `reactEvent` parameter is a synthetic event object that represents the form
     * submission event in React. It contains information about the event, such as the target element and
     * event type. In this case, it is specifically a `SyntheticEvent` object for a form submission event
     * on an HTML form element
     */
        const submitForm = async (reactEvent: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
            reactEvent.preventDefault();
            const formDataFromProps = formFields;
            const formDataFromPropsAllSteps = formDataFromProps?.wizard.steps;
            const formDataFromPropsCurrentSteps = formDataFromPropsAllSteps?.filter((step: any) => step.stepNo === Number(stepNo))[0];
            const questionsOfCurrentStep = formDataFromPropsCurrentSteps.questions;
            const filledAnswers: any = [] ;
            Object.entries(formData).forEach(entry => {
                filledAnswers.push(mapKeyEntryToFormDataValues(entry[0] as string, entry[1] as string));
            })
            const OverridenQuestionAndAnswersStorage: QuestionWithCheckBoxes[] | QuestionWithNameAnddescription[] = [];
            questionsOfCurrentStep.forEach((question: QuestionWithCheckBoxes | QuestionWithNameAnddescription)=> {
                const answer = question;
                if(filledAnswers.some((answer: any) => answer.question === question.question)){
                   Object.assign(answer, filledAnswers.filter(((aFilledAnswer: QuestionWithCheckBoxes | QuestionWithNameAnddescription) => aFilledAnswer.question === answer.question))[0])
                }
                OverridenQuestionAndAnswersStorage.push(answer as any);
            });
            const updatedStepData = formFields.wizard.steps.map((aStep: any, index: number)=> {
                if(index === (Number(stepNo) - 1)){
                    aStep.questions = OverridenQuestionAndAnswersStorage;
                }
                return aStep;
            })
            formFields.wizard.steps = updatedStepData;
            try {
                const NavigatableURL = Number(stepNo) < totalSteps ? `edit=true&step=${Number(stepNo)+ 1}` : 'preview=summary';
                await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).put(`/api/wizard/${Id}`, formFields);
               window.location.href =  window.location.href.split(`edit=true&step=${stepNo}`).join(NavigatableURL);
               } catch (error) {
               alert('Error while updating')
               }
           
        }
        /* The code `const fields = formFields?.wizard?.data.step1;` is accessing the `step1` property of the
        `data` property of the `wizard` property of the `formFields` object. It uses optional chaining
        (`?.`) to handle cases where any of the properties in the chain may be undefined. */
        const fields = formFields.wizard && formFields?.wizard.steps.filter((step: any)=> step.stepNo === Number(stepNo))[0];
        const questionsOfCurrentStep = fields?.questions;

        return <form style={{textAlign:'left'}} onSubmit={submitForm}>
            {Array.isArray(questionsOfCurrentStep) && <>
            {questionsOfCurrentStep && questionsOfCurrentStep.map((field: any) => {
                return <Fragment>  
                     <Title level={3}>{field.question}</Title>
                    {field.type === 'input' && <Input placeholder={field.value} name={field.question+"*input"} maxLength={63} onChange={formFieldChanger} required />}
                    <br/>
                    {field.type === 'text' && <TextArea rows={12} name={field.question+"*text"} onChange={formFieldChanger} placeholder={field.value} required/>}
                    {field.type === 'checkbox' && <Checkbox onChange={formFieldChanger} value={field.question} name={field.value+"*checkbox"} >{field.value}</Checkbox>}
                    <br/>
                </Fragment>
            })}
            </>}
            {stepNo &&  <Button type='primary'style={{marginTop: '2vh'}} htmlType='submit' >Next </Button> }
           
        </form>
    }
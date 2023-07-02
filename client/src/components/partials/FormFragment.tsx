
import {Fragment, useState, SyntheticEvent} from 'react';
import { Input, Typography, Button, Checkbox } from 'antd';
import { AxiosServiceInstance } from '../../common/network/ajaxInstance';
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

    const { Title } = Typography;
    const { TextArea } = Input;

    /* The above code is a TypeScript React component called `FormFragment`. It is used to render a form
    with different input fields based on the `stepNo` prop. The form fields and their values are passed
    through the `formFields` prop. The component also receives `authenticationDetails` and `Id` props. */
    export const FormFragment = ({formFields, stepNo, authenticationDetails, Id}: 
        {formFields: { [key: string]: any; }, 
        stepNo: string | undefined | null, authenticationDetails: any, Id: string| undefined }) => {
        
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
           /* The code block you provided is handling the form submission for a multi-step wizard form
           in a React application. */
            if(Number(stepNo) === 1){
                const apiRequestResourceData = formFields;
                const step1FormFilledData = {
                    isDone: true,
                    step1: {
                        description: {type: 'text', value: formData.description},
                        name: {type: 'input', value: formData.name},
                        data: {step2: formFields.wizard.data.data.step2},
                    },
                }
                apiRequestResourceData['wizard']['data'] = step1FormFilledData;
                try {
                 const updateResourceInServer = await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).put(`/api/wizard/${Id}`, apiRequestResourceData);
                 console.log({updateResourceInServer});
                 window.location.href = window.location.href.split('step=1').join('step=2');
                } catch (error) {
                alert('Error while updating')
                }

            }
            else if(Number(stepNo) ===2){
                const allToggledCheckBoxes = Object.values(formData);
                const allFeatures =  formFields?.wizard?.data.step1.data.step2.features;
                const allSelectedFeatures = allFeatures.map((feature: any) => {
                    if(allToggledCheckBoxes.includes(feature.value)){
                        feature['isEnabled'] = true;
                    }
                    return  feature;
                })
                const featureEnabledFormData = formFields;
                featureEnabledFormData.wizard.data.step1.data.step2.features = allSelectedFeatures;
                try {
                    await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).put(`/api/wizard/${Id}`, featureEnabledFormData);
                     window.location.href = window.location.href.split('edit=true&step=2').join('preview=summary');
                   } catch (error) {
                   alert('Error while updating')
                   }
            }
            else{
                console.log({msg: 'error'});
            }
           
        }
        /* The code `const fields = formFields?.wizard?.data.step1;` is accessing the `step1` property of the
        `data` property of the `wizard` property of the `formFields` object. It uses optional chaining
        (`?.`) to handle cases where any of the properties in the chain may be undefined. */
        const fields = formFields?.wizard?.data.step1;
        let fieldsOfForms: any = [];
        if(Number(stepNo) === 1){
            fieldsOfForms = fields && Object.entries(fields);
        }
        else if(Number(stepNo) === 2){
            fieldsOfForms = fields && Object.entries(formFields?.wizard?.data.step1.data.step2.features);
        }
        return <form style={{textAlign:'left'}} onSubmit={submitForm}>
            {Array.isArray(fieldsOfForms) && <>
            {fieldsOfForms && fieldsOfForms.map((field: any) => {
                return <Fragment>  
                    {field[1].type === 'checkbox' ? <Title level={3}>{field[1].value}</Title> : <Title level={3}>{field[0]}</Title> }
                    {field[1].type === 'input' && <Input placeholder={field[1].value} name={field[0]} maxLength={63} onChange={formFieldChanger} required />}
                    <br/>
                    {field[1].type === 'text' && <TextArea rows={12} name={field[0]} onChange={formFieldChanger} placeholder={field[1].value} required/>}
                    {field[1].type === 'checkbox' && <Checkbox  onChange={formFieldChanger} value={field[1].value} name={field[0]} >{field[1].value}</Checkbox>}
                </Fragment>
            })}
            </>}
            <Button type='primary'style={{marginTop: '2vh'}} htmlType='submit' >Next </Button>
        </form>
    }
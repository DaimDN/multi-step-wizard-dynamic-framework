
    import {Fragment, useState, SyntheticEvent} from 'react';
    import { Input, Typography, Button } from 'antd';
import { AxiosServiceInstance } from '../../common/network/ajaxInstance';


    const { Title } = Typography;
    const { TextArea } = Input;

    export const FormFragment = ({formFields, stepNo, authenticationDetails, Id}: any) => {

        const [formData, setFormData]: any = useState({});

    /**
     * The function `formFieldChanger` is used to update the `formData` state by setting the value of the
     * input or textarea element with the corresponding name attribute.
     * @param {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>} event - The
     * `event` parameter is an object that represents the event that triggered the change. In this case, it
     * can be either a `ChangeEvent` for an `<input>` element or a `ChangeEvent` for a `<textarea>`
     * element.
     */
            const formFieldChanger = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => 
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
                const nextNavigationURL = window.location.href.split('step=1').join('step=2');
                const apiRequestResourceData = formFields;
                const step1FormFilledData = {
                    isDone: true,
                    step1: {
                        ...formFields.wizard.data.data,
                        description: {type: 'text', value: formData.description},
                        name: {type: 'input', value: formData.name},
                    }

                }
                apiRequestResourceData['wizard']['data'] = step1FormFilledData;
                try {
                 const updateResourceInServer = await AxiosServiceInstance({'x-auth-appvia-token': authenticationDetails.userAuthenticationDetails.token}).put(`/api/wizard/${Id}`, apiRequestResourceData);
                 console.log({updateResourceInServer});
                 window.location.href = nextNavigationURL;
                } catch (error) {
                alert('Error while updating')
                }

            }
            else if(Number(stepNo) ===2){

            }
            else{
                console.log({msg: 'error'});
            }
           
        }


    /* The code `const fields = formFields?.wizard?.data.step1;` is accessing the `step1` property of the
    `data` property of the `wizard` property of the `formFields` object. It uses optional chaining
    (`?.`) to handle cases where any of the properties in the chain may be undefined. */
        const fields = formFields?.wizard?.data.step1;
        const fieldsOfForms = fields && Object.entries(fields);


        return <form style={{textAlign:'left'}} onSubmit={submitForm}>
            {Array.isArray(fieldsOfForms) && <>
            {fieldsOfForms?.map((field: any) => {
                return <Fragment>   
                    <Title level={3}>{field[0]}</Title>
                    {field[1]?.type === 'input' && <>
                    <Input placeholder={field[0]} maxLength={63} onChange={formFieldChanger}  aria-placeholder={field[1].value} required />
                    </>}
                    <br/>

                    {field[1]?.type === 'text' && <>
                    <TextArea rows={12} name={field[0]} onChange={formFieldChanger} placeholder={field[1].value} required/>
                    </>}
                </Fragment>
            })}
            </>}
            <br/><br/>
            <Button type='primary' htmlType='submit' >Next </Button>
        </form>
    }
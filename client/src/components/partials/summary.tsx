        import { Divider, Typography, Button } from 'antd';
        import { HOME } from "../../routes/urls";
        import { useNavigate } from 'react-router-dom';
        import { Fragment } from 'react';


        const { Title } = Typography;


        /* The code is defining a functional component called `Summary` that takes in a prop called
        `formFields`. */

        export const Summary = ({formFields}: any) => {
            const Navigator = useNavigate(); 

            const stepData = formFields?.wizard?.steps;
        /**
         * The `SummayPostHandler` function is a TypeScript React function that prevents the default behavior
         * of an event and navigates to the HOME page.
         * @param {any} event - The event parameter is an object that represents the event that triggered the
         * handler function. In this case, it is used to prevent the default behavior of a form submission.
         */
            const SummayPostHandler = (event: any) => {
                event.preventDefault();
                Navigator(HOME);
            }
            if(stepData){
                return <div style={{textAlign: 'left'}}>
                    {stepData?.map((step: any, index: number) => {
                        return <Fragment key={step.Id}>
                        <Divider orientation="left" plain>
                        Details - Step {index + 1}
                        </Divider>
                        {step.questions?.map((aQuestion: any)=> {
                            let returnAble;
                            aQuestion.type === 'checkbox' ? returnAble =   <Title level={5}> {aQuestion.question} : {aQuestion.isEnabled.toString()} </Title> 
                            : returnAble =  <Title level={5}> {aQuestion.question} : {aQuestion.value} </Title> 
                            return returnAble;
                        })}
                        </Fragment>
                    })}
                <Button type='primary' style={{marginTop: '4vh'}} onClick={(e)=> {SummayPostHandler(e)}} >Next </Button>
            </div>
            }
            else{
                return <h1>Loading....</h1>
            }
        
        }
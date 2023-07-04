import { Divider, Typography, Button, Steps } from 'antd';
import { HOME } from "../../routes/urls";
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';


const { Title } = Typography;



export const Summary = ({formFields}: any) => {
    const Navigator = useNavigate(); 

    const stepData = formFields?.wizard?.steps;
    const SummayPostHandler = (event: any) => {
        event.preventDefault();
        Navigator(HOME);
    }
    if(stepData){
        return <div style={{textAlign: 'left'}}>
            {stepData?.map((step: any, index: number) => {
                return <Fragment>
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
import { Divider, Typography, Button } from 'antd';
import { HOME } from "../../routes/urls";
const { Title } = Typography;



export const Summary = ({formFields}: any) => {

    const step1QuestionsAndAnswers = formFields?.wizard?.data?.step1;
    const step2QuestionsAndAnswers = step1QuestionsAndAnswers?.data?.step2?.features;

    const SummayPostHandler = (event: any) => {
        event.preventDefault();
        window.location.href = HOME;
    }
    if(step1QuestionsAndAnswers && step2QuestionsAndAnswers){
        return <div style={{textAlign: 'left'}}>
        <Divider orientation="left" plain>
         Details - Step 1
        </Divider>
        <div className="summary_step1">
        <Title level={5}> Name : {step1QuestionsAndAnswers.name.value} </Title>
        <Title level={5}> Description : {step1QuestionsAndAnswers.description.value} </Title>
        </div>
        <Divider orientation="left" plain>
         Features Status - Step 2
        </Divider>

        <div className="summary_step2">
            {step2QuestionsAndAnswers.map((feature: any, index: number)=> {
                return <Title level={5} key={index}>  Feature : {feature.value} - {feature.isEnabled ? 'enabled' : 'disabled'} </Title>
            })}
        
        </div>
        <Button type='primary' onClick={(e)=> {SummayPostHandler(e)}} >Next </Button>
    </div>
    }
    else{
        return <h1>Loading....</h1>
    }
   
}
import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import './Intro.css';
import image from '../../img/IntroImage2.png';

const SecondIntro = ({ id, changePanel}) => {
	
	return (
		<Panel id={id} separator={false}>

            <Div className='intro-info'>
                <img src={image}/>
                <p>
                    Здесь ты можешь найти подработку или создать вакансию за считанные минуты!
                </p>
                <Button
                    mode='primary'
                    size='m'
                    onClick={changePanel}>
                    Продолжить
                </Button>
            </Div>
		</Panel>
	)
}

export default SecondIntro;

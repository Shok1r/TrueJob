import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import './Intro.css';
import image from '../../img/IntroImage.png';


const FirstIntro = ({ id, snackbarError, userHasSeenIntro, changePanel, fetchedUser, nextPanel }) => {
	
	return (
		<Panel id={id} separator={false}>

			{(!userHasSeenIntro && fetchedUser) && 
				<>
					<Div className='intro-info'>
						<img src={image}/>
						<p>
							Привет, {fetchedUser.first_name}! Рады тебя видеть в приложении для поиска подработки и работников TrueJob.
						</p>
						<Button
							mode='primary'
							size='m'
							onClick={() => changePanel(nextPanel)}>
							Продолжить
						</Button>
					</Div>
				</>
			}

			{snackbarError}
		</Panel>
	)
}


export default FirstIntro;

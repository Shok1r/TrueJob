import React from 'react';
import {Panel, Div, Button} from '@vkontakte/vkui';

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

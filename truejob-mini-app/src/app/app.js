import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, Root, ScreenSpinner} from '@vkontakte/vkui'
import ErrorSnackbar from '../errors/errorSnackbar';
import {FirstIntro, SecondIntro, MainNavigation} from '../panels';

import '@vkontakte/vkui/dist/vkui.css';

// Для навигации внутри mainView
const ROUTES = {
	INTRO: ['introFirst', 'introSecond'],
	MAINPAGE: 'mainPage',
}

// Для навигации по View
const VIEWROUTES = {
	MAINVIEW: 'mainView',
	INTROVIEW: 'introView'
}

const STORAGE_KEYS = {
	STATUS: 'status'
}

const App = () => {
	const {MAINPAGE, INTRO} = ROUTES;
	const {MAINVIEW, INTROVIEW} = VIEWROUTES;

	// State для переключения панелей в интро
	const [activeIntroPanel, setActiveIntroPanel] = useState(INTRO[0]);

	const [activePanel, setActivePanel] = useState(MAINPAGE);
	const [activeView, setActiveView] = useState(INTROVIEW);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(false);


	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS)
			});
			const data = {};

			storageData.keys.forEach(({key, value}) => {
				try {
					// throw new Error('Error');
					data[key] = value ? JSON.parse(value) : {};
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeenIntro) {
								changeView(MAINVIEW);
								setUserHasSeenIntro(true);
							}
							break;
						default:
							break;
					}
				} catch(error) {
					setSnackbar(<ErrorSnackbar message='Проблема получения данных из Storage' setSnackbar={setSnackbar}/>);
				}
			})

			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const changeIntroPanel = (panel) => {
		setActiveIntroPanel(panel);
	}

	const changeView = (view) => {
		setActiveView(view);
	};

	const viewIntro = async function () {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({hasSeenIntro: true})
			});
			changeView(MAINVIEW);
		} catch(error) {
			setSnackbar(<ErrorSnackbar message='Проблема отправки данных в Storage' setSnackbar={setSnackbar}/>);
		}
	}

	return (
		<Root activeView={activeView}>
			<View activePanel={activeIntroPanel} id={INTROVIEW}>
				<FirstIntro 
					id={INTRO[0]} 
					nextPanel={INTRO[1]} 
					changePanel={changeIntroPanel} 
					fetchedUser={fetchedUser} 
					snackbarError={snackbar} 
					userHasSeenIntro={userHasSeenIntro}/>
				<SecondIntro id={INTRO[1]} changePanel={viewIntro} />	
			</View>
			<MainNavigation 
				id={MAINVIEW}
				fetchedUser={fetchedUser}/>
		</Root>
	);
}

export default App;

import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import ErrorSnackbar from './errors/errorSnackbar';
import '@vkontakte/vkui/dist/vkui.css';

import MainPage from './panels/MainPage';
import { FirstIntro, SecondIntro } from './panels/introPanels';

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


			storageData.keys.forEach(({ key, value }) => {
				try {
					throw new Error('Error');
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

			console.log(storageData);

			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const changePanel = (panel) => {
		setActivePanel(panel);
	};

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
				<FirstIntro id={INTRO[0]} nextPanel={INTRO[1]} changePanel={changeIntroPanel} fetchedUser={fetchedUser} snackbarError={snackbar} userHasSeenIntro={userHasSeenIntro}/>
				<SecondIntro id={INTRO[1]} changePanel={viewIntro} />	
			</View>
			<View activePanel={activePanel} popout={popout} id={MAINVIEW}>
				<MainPage id={MAINPAGE} fetchedUser={fetchedUser} snackbarError={snackbar}/>
			</View>
		</Root>

	);
}

export default App;

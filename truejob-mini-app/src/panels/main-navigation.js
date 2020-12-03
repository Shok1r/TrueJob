import React, {useState} from 'react';
import {Panel, Epic, Tabbar, TabbarItem, PanelHeader, View} from '@vkontakte/vkui'
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28ListAddOutline from '@vkontakte/icons/dist/28/list_add_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';

import {Profile, Vacancy} from './index';

const MainNavigation = ({fetchedUser}) => {
   
    const [activeStory, setActiveStory] = useState('vacancy');

    const onStoryChange = (story) => {
      setActiveStory(story);
    }
  
    return (
        <Epic activeStory={activeStory} tabbar={
            <Tabbar>
                <TabbarItem
                    onClick={() => onStoryChange('vacancy')}
                    selected={activeStory === 'vacancy'}
                    data-story="vacancy"
                    text="Вакансии"
                ><Icon28NewsfeedOutline /></TabbarItem>
                <TabbarItem
                    onClick={() => onStoryChange('map')}
                    selected={activeStory === 'map'}
                    data-story="map"
                    text="Карта"
                ><Icon28PlaceOutline/></TabbarItem>
                <TabbarItem
                    onClick={() => onStoryChange('add-vacancy')}
                    selected={activeStory === 'add-vacancy'}
                    data-story="add-vacancy"
                    text="Добавить"
                ><Icon28ListAddOutline /></TabbarItem>
                <TabbarItem
                    onClick={() => onStoryChange('profile')}
                    selected={activeStory === 'profile'}
                    data-story="profile"
                    text="Профиль"
                ><Icon28Profile /></TabbarItem>
            </Tabbar>
        }>
            <View id="vacancy" activePanel="vacancy">
                <Vacancy id="vacancy"/>
            </View>

            <View id="map" activePanel="map">
                <Panel id="map">
                    <PanelHeader>Карта</PanelHeader>
                </Panel>
            </View>

            <View id="add-vacancy" activePanel="add-vacancy">
                <Panel id="add-vacancy">
                    <PanelHeader>Добавить вакансию</PanelHeader>
                </Panel>
            </View>

            <View id="profile" activePanel="profile">
                <Profile id="profile" fetchedUser={fetchedUser}/>
            </View>
        </Epic>
    )
}

export default MainNavigation;
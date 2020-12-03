import React, {useState} from 'react';
import {Panel, PanelHeader, Group, Cell, Avatar} from '@vkontakte/vkui';
import Icon28LikeOutline from '@vkontakte/icons/dist/28/like_outline';
import Icon28ListAddOutline from '@vkontakte/icons/dist/28/list_add_outline';
import Icon16Favorite from '@vkontakte/icons/dist/16/favorite';
import Icon28HelpCircleOutline from '@vkontakte/icons/dist/28/help_circle_outline';
import Icon28InfoCircleOutline from '@vkontakte/icons/dist/28/info_circle_outline';

import './profile.css';

const Profile = ({fetchedUser, id}) => {

    let descr = `${fetchedUser.country.title}, ${fetchedUser.city.title}`;
    const userName = `${fetchedUser.first_name} ${fetchedUser.last_name}`;

    return(
        <Panel id={id}>
            <PanelHeader>Профиль</PanelHeader>
            <Group>
                <div className="cells">
                    <Cell
                        description={descr}
                        before={<Avatar src={fetchedUser.photo_100}/>}
                        >
                    {userName}
                    </Cell>
                    <Cell>
                        <div className="worker-rate">
                            <p>Рейтинг работника</p>
                            <div className="rate">
                                <span>4.42</span>
                                <Icon16Favorite fill={'FFA000'} className="star"/>
                            </div>
                        </div>
                        <div className="employer-rate second">
                            <p>Рейтинг работодателя</p>
                            <div className="rate">
                                <span>4.00</span>
                                <Icon16Favorite fill={'FFA000'} className="star"/>
                            </div>
                        </div>
                    </Cell>
                </div>
            </Group>
            <Group>
                <div className="cells">
                    <Cell>
                        <div className="favorite-vacancy">
                            <Icon28LikeOutline fill={'FD7D6D'}/>
                            <p>Избранные вакансии</p>
                        </div>
                        <div className="add-vacancy second">
                            <Icon28ListAddOutline fill={'426C7C'}/>
                            <p>Добавить вакансию</p>
                        </div>
                    </Cell>
                </div>
            </Group>
            <Group>
                <div className="cells">
                    <Cell>
                        <div className="help">
                            <Icon28HelpCircleOutline fill={'426C7C'}/>
                            <p>Помощь</p>
                        </div>
                        <div className="about second">
                            <Icon28InfoCircleOutline fill={'426C7C'}/>
                            <p>О приложении</p>
                        </div>
                    </Cell>
                </div>
            </Group>
        </Panel>
    )
}

export default Profile;
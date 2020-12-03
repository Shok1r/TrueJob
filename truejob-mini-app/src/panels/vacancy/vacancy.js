import React, {useState} from 'react';
import {Panel, PanelHeader, FixedLayout, Search, Div} from '@vkontakte/vkui';
import VacancyList from './vacansy-list/vacancy-list';

import './vacancy.css';

const Vacancy = ({id}) => {

    return (
        <Panel id={id}>
            <PanelHeader>Вакансии</PanelHeader>
            <FixedLayout vertical="top">
                <Search />
            </FixedLayout>\
            <Div style={{ paddingTop: 34, paddingBottom: 10}}>
                <VacancyList/>
            </Div>
        </Panel>
    )

}

export default Vacancy;
import React, { useEffect, useState } from 'react';
import { Select, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import myData from '../page/schedule.json';


interface Day {
    day: string,
    lessons: Lesson[]
}

interface Lesson {
    key: string;
    subject: string;
    class: string;
    room: string;
    startTime: string;
    endTime: string;
    note: string[];
}


const columns: TableProps<Lesson>['columns'] = [
    {
        title: 'Предмет',
        dataIndex: 'subject',
        key: 'subject',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Класс',
        dataIndex: 'class',
        key: 'class',
    },
    {
        title: 'Кабинет',
        dataIndex: 'room',
        key: 'room',
    },

    {
        title: 'Время',
        dataIndex: 'room',
        key: 'room',
        render: (_, record) => <p>{record.startTime} - {record.endTime}</p>,
    },
];


const dayOfWeek = [
    {
        value: 'Понедельник',
        label: 'Понедельник',
    },
    {
        value: 'Вторник',
        label: 'Вторник',
    },
    {
        value: 'Среда',
        label: 'Среда',
    },
    {
        value: 'Четверг',
        label: 'Четверг',
    },
    {
        value: 'Пятница',
        label: 'Пятница',
    },
    {
        value: 'Суббота',
        label: 'Суббота',
    },
    {
        value: 'Неделя',
        label: 'Неделя',
    },
]

const dayMap = new Map<number, string>([
    [0, "Понедельник"],
    [1, "Вторник"],
    [2, "Среда"],
    [3, "Четверг"],
    [4, "Пятница"],
    [5, "Суббота"],
    [6, "Неделя"],
])

function convertCurrentDay(): string {

    let day = new Date()

    day.getDay()

    return dayMap.get(day.getDay())!

}

const selectStyle: React.CSSProperties = {
    margin: "10px 45%",
   height : "40px"

}

const tableStyles: React.CSSProperties = {
    margin: "10px 10%",
    padding: "10px",
    boxShadow: "7px 12px 17px 12px rgba(54, 86, 111, 0.31)",
}

function TableSchedule() {


    const [selectedDay, setSelectedDay] = useState<string>(convertCurrentDay())

    useEffect(() => {
        takeData()
    })


    const onChange = (value: string) => {
        setSelectedDay(value)
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };


    const takeData = () => {

        let schedules = myData.schedule as Day[]
        return schedules.find(e => e.day.toLowerCase() === selectedDay.toLowerCase())!.lessons
    }


    return (
        <>
            <Select
                showSearch
                style={selectStyle}
                placeholder="Выберите день недели"
                optionFilterProp="label"
                defaultValue={convertCurrentDay()}
                onChange={onChange}
                onSearch={onSearch}
                options={dayOfWeek}
            />
            <Table
                style={tableStyles}
                columns={columns}
                dataSource={takeData()}
                pagination={false} />;
        </>
    )
}




export default TableSchedule;
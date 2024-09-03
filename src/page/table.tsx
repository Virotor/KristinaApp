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
    time : string;
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
        render: (_, record) => <p>{rooms.get(record.class)}</p>,
    },

    {
        title: 'Время',
        dataIndex: 'room',
        key: 'room',
        render: (_, record) => <p>{lessonTimes.get(record.time)}</p>,
    },
];

const lessonTimes = new Map <string, string>([
    [ "1-1", "8.00-8.35"],
    [ "1-2", "8.55-9.30"],
    [ "1-3", "9.50-10.25"],
    [ "1-4", "10.45-11.20"],
    [ "2-1", "8.00-8.45"],
    [ "2-2", "9.00-9.45"],
    [ "2-3", "10.00-10.45"],
    [ "2-4", "11.00-11.45"],
    [ "2-5", "12.00-12.45"],
])

const rooms = new Map<string,string> ([
    ["1А","207"],
    ["1Б","203"],
    ["1В","208"],
    ["1Г","209"],
    ["1Д","202"],
    ["2А","401"],
    ["2Б","400"],
    ["2В","307"],
    ["2Г","309"],
    ["2Д","308"],
    ["3А","402"],
    ["3Б","405"],
    ["3В","104"],
    ["3Г","404"],
    ["3Д","403"],
    ["4А","302"],
    ["4Б","101"],
    ["4В","103"],
    ["4Г","303"],
    ["4Д","102"]
]) 

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
    margin: "10px 5%",
    padding: "10px",
    boxShadow: "3px 7px 6px 7px rgba(54, 86, 111, 0.31)",
    borderRadius : "10px"

}

function TableSchedule() {


    const [selectedDay, setSelectedDay] = useState<string>(convertCurrentDay())

    useEffect(() => {
        takeData()
    })


    const onChange = (value: string) => {
        setSelectedDay(value)
    };



    const takeData = () => {

        let schedules = myData.schedule as Day[]
        return schedules.find(e => e.day.toLowerCase() === selectedDay.toLowerCase())!.lessons
    }


    return (
        <>
            <Select
                style={selectStyle}
                placeholder="Выберите день недели"
                optionFilterProp="label"
                defaultValue={convertCurrentDay()}
                onChange={onChange}
                options={dayOfWeek}
            />
            <Table
                style={tableStyles}
                columns={columns}
                dataSource={takeData()}
                pagination={false} />
        </>
    )
}




export default TableSchedule;
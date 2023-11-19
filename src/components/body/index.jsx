import {Input, Layout, Table} from "antd";
import {useState} from "react";
import {SearchOutlined} from "@ant-design/icons";

const {Content} = Layout;

const creationDate = new Date();
export const BodyComponent = () => {

    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            filters: [
                {
                    text: searchText ? searchText : "",
                    value: searchText ? searchText : "",
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => record.name.toString().toLowerCase().includes(value),
            sorter: (a, b) =>  a.name.localeCompare(b.name),
        },
        {
            title: 'Размер (кб)',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: 'Создатель',
            dataIndex: 'creator',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: searchText ? searchText : "",
                    value: searchText ? searchText : "",
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => record.creator.toString().toLowerCase().includes(value),
            sorter: (a, b) => a.creator.localeCompare(b.creator),
        },
        {
            title: 'Дата создания',
            dataIndex: 'creationDate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.actions.localeCompare(b.actions),
        },
    ];
    const stubData = [
        {
            key: 1,
            name: 'Первый',
            size: 42,
            creator: 'Иван',
            creationDate: creationDate - 1000,
            description: 'Lorem ipsum dolore est ...',
            actions: [1,2,3]
        },
        {
            key: 2,
            name: 'Второй',
            size: 23,
            creator: 'Анатолий',
            creationDate: creationDate - 4000,
            description: 'dolor sit amet, consectetur adipiscing elit',
            actions: [4,5,6]
        },
    ];

    return (
        <Content
            style={{
                margin: '24px 16px 0',
                background: '#fff'
            }}
        >
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
            >
                <div>Фильтр по полям "Название" и "Создатель". Для применения фильтра на колонку необходимо нажать значок воронки и поставить галочку</div>
                <Input
                    placeholder="Фильтр"
                    prefix={<SearchOutlined />}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Table columns={columns} dataSource={stubData} />
            </div>
        </Content>
    );
};
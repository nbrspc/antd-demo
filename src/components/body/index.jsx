import {Button, ConfigProvider, Flex, Input, Layout, Select, Table} from "antd";
import {CheckCircleTwoTone, CloseCircleTwoTone, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import {useState} from "react";

const {Content} = Layout;
const creationDate = new Date();
let selector = 'all';
let searchText = '';

const getFullDate = (d) => {
    d = new Date(d);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};
const isActive = (is_active) => {
    return is_active ? <><CheckCircleTwoTone twoToneColor="#52c41a" /> активно</> : <><CloseCircleTwoTone twoToneColor="#f11" /> неактивно</>;
};

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Размер (кб)',
        dataIndex: 'size',
        key: 'size'
    },
    {
        title: 'Создатель',
        dataIndex: 'creator',
        key: 'creator',
    },
    {
        title: 'Дата создания',
        dataIndex: 'creationDate',
        key: 'creationDate',
        render: ((date) => getFullDate(date))
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Статус',
        dataIndex: 'is_active',
        key: 'is_active',
        render: ((is_active) => isActive(is_active))
    },
];
const data = [
    {
        key: 1,
        name: 'Первый',
        size: 42,
        creator: 'Иван',
        creationDate: creationDate - 1000,
        description: 'Lorem ipsum dolore est ...',
        is_active: true
    },
    {
        key: 2,
        name: 'Второй',
        size: 23,
        creator: 'Анатолий',
        creationDate: creationDate - 2000,
        description: 'dolor sit amet, consectetur adipiscing elit',
        is_active: false
    },
    {
        key: 3,
        name: 'Третий',
        size: 34,
        creator: 'Петр',
        creationDate: creationDate - 5000,
        description: 'dolor sit amet, consectetur adipiscing elit',
        is_active: true
    },
    {
        key: 4,
        name: 'Четвертый',
        size: 13132,
        creator: 'Сергей',
        creationDate: creationDate - 10000,
        description: 'dolor sit amet, consectetur adipiscing elit',
        is_active: false
    },
    {
        key: 5,
        name: 'Пятый',
        size: 23424324,
        creator: 'Александр',
        creationDate: creationDate - 11000,
        description: 'dolor sit amet, consectetur adipiscing elit',
        is_active: true
    },
];

const BodyComponent = () => {

    const [filter, setFilter] = useState(null);

    const search = (e) => {

        let selectorFilter;
        let searchTextFilter;

        // handle onChange for input and selector
        (e?.target?.value !== undefined) ? searchText = e.target.value : selector = e;


        // if selector not defau
        if (selector !== 'all') {
            selectorFilter = data.filter(row => row.is_active === selector);
        } else {
            selectorFilter = data;
        }

        if (searchText !== '')
        {
            searchTextFilter = data.filter(o =>
                Object.keys(o).some((k) => {
                    if (k === 'name' || k === 'creator') {
                        return String(o[k]).toLowerCase().includes(searchText.toLowerCase());
                    } else {
                        return false
                    }
                })
            );

        } else {
            searchTextFilter = data;
        }

        const arraysIntersection = (a1, a2) => {
            if (a1.length !== 0 && a2.length !== 0) return a1.filter(n => a2.some(n2 => n.key === n2.key));
            if (!searchText && (selector !== 'all')) return null
            return [];
        };

        setFilter(arraysIntersection(selectorFilter, searchTextFilter));
    };

    const resetFilter = () => {
        setFilter(null);
        selector = 'all';
        searchText = '';
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg:'#aaa',
                        headerSplitColor:'#aaa',
                        headerBorderRadius:0,
                        footerBg:'#fff',
                        bodySortBg:'#fff',
                        borderColor:'#fff',
                        rowSelectedBg:'#fff',
                        rowSelectedHoverBg:'#fff',
                    },
                },
            }}
        >
        <Content
            style={{
                // margin: '24px 16px 0',
                background: '#fff'
            }}
        >
            <div
                style={{
                    // padding: 24,
                    // minHeight: 360,
                }}
            >
                <div>Фильтр по полям "Название" и "Создатель".</div>

                {/*// Search input*/}
                <Flex>
                    {/*<Input.Search*/}
                    <Input
                        placeholder="Фильтр"
                        prefix={<SearchOutlined />}
                        // onSearch={search}
                        value={searchText}
                        onChange={search}
                        allowClear
                    />

                    <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={search}
                        value={selector}
                        options={[
                            { value: 'all', label: 'все' },
                            { value: true, label: 'активные' },
                            { value: false, label: 'неактивные' }
                        ]}
                    />

                    {/*// Filter reset conditional rendering*/}
                    {(filter || selector !== 'all') &&
                        <Button
                            style={{ width: 200 }}
                            onClick={resetFilter}
                        >
                            <ReloadOutlined  />
                        </Button>
                    }

                </Flex>

                <Table
                    headerBg='#111'
                    pagination={{ pageSize: 3 }}
                    columns={columns}
                    dataSource={(filter === null) ? data : filter}
                />

            </div>
        </Content>
        </ConfigProvider>
    );
};

export default BodyComponent;
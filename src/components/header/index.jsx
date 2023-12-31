import {
    Avatar,
    Breadcrumb,
    Button, Drawer,
    Dropdown,
    Flex,
    Form,
    Input,
    Layout,
    Space,
} from "antd";
import {
    DownOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    LogoutOutlined,
    MenuOutlined,
    UserOutlined
} from "@ant-design/icons";
import React, {useState} from "react";

const {Header} = Layout;

const HeaderComponent = () => {

    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('12345678');
    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
    };

    const onFinish = (values) => {

        // validate old password (from API in future)
        if (values.oldPassword === currentPassword) {
            setCurrentPassword(values.newPassword);
            console.log(values);
            handleCancel();
        } else {
            alert('Wrong password')
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const menuItems = [
        {
            key: '1',
            label: 'Пункт 1',
            children: [
                {
                    key: '1-1',
                    label: 'Подпункт 1-1',
                },
                {
                    key: '1-2',
                    label: 'Подпункт 1-2',
                },
            ],
        },
        {
            key: '2',
            label: 'Пункт 2',
            children: [
                {
                    key: '2-1',
                    label: 'Подпункт 2-1',
                },
                {
                    key: '2-2',
                    label: 'Подпункт 2-2',
                },
            ],
        },
    ];
    const personItems = [
        {
            label: 'Профиль',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: (
                <a href="#" onClick={showModal}>
                    Сменить пароль
                </a>
            ),
            key: '2',
            icon: <LockOutlined />,
        },
        {
            label: 'Выйти',
            key: '3',
            icon: <LogoutOutlined />,
        },
    ];
    const breadcrumbsItems = [
        {
            title: 'PIM',
        },
        {
            title: 'Управление',
        },
        {
            title: <b>Настройки сервера</b>,

        }
    ];

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: "#ffffff",
                }}
            >
                <Flex justify="space-between" align="center">
                    <Dropdown menu={{ items: menuItems }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <MenuOutlined style={{ fontSize: '150%', padding: '5px'}}/>
                            </Space>
                        </a>
                    </Dropdown>
                    <Breadcrumb
                        items={breadcrumbsItems}
                        style={{padding:"5px", margin:"5px"}}
                    />

                    <Flex align="end">
                        <Dropdown menu={{ items: personItems }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar style={{ backgroundColor: "black", verticalAlign: 'middle' }} size="large">
                                        {"A"}
                                    </Avatar>
                                    <DownOutlined style={{color: "black"}}/>
                                </Space>
                            </a>
                        </Dropdown>
                    </Flex>
                </Flex>

            </Header>

            <Drawer
                title={
                    <>
                        <center><h2>Изменить пароль</h2></center>
                        <i style={{color:"#bbb"}}>Текущий {currentPassword}</i>
                    </>
                }
                open={open}
                onCancel={handleCancel}
                closeIcon={false}
            >
                <Form
                    form={form}
                    name="dependencies"
                    autoComplete="off"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{padding:10, margin:10}}
                >
                    <Form.Item label="Старый пароль" name="oldPassword" rules={[
                        { required: true, message: 'Введите старый пароль' }
                    ]}>
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Новый пароль"
                        name="newPassword"
                        dependencies={['oldPassword']}
                        rules={[
                            { required: true, message: 'Введите новый пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {

                                    if (!value) {
                                        return Promise.reject(new Error('Новый пароль не должен быть пустым'))
                                    }

                                    if (getFieldValue('oldPassword') === value) {
                                        return Promise.reject(new Error('Новый пароль должен отличаться от старого'))
                                    }

                                    if (currentPassword === value) {
                                        return Promise.reject(new Error('Новый пароль должен отличаться от старого'))
                                    }

                                    return Promise.resolve()
                                }
                            })
                        ]}>
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Повторите новый пароль"
                        name="newPasswordConfirm"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Подтвердите новый пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify={"space-between"} align={"center"}>
                            <Button type="default" onClick={handleCancel}>
                                Отменить
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Изменить
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default HeaderComponent;

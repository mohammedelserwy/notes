import 'react-native-gesture-handler';
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    Pressable,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './Styles';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/AntDesign';
import WorkScreen from './screens/WorkScreen';
import PersonalScreen from './screens/PersonalScreen';
import ShopScreen from './screens/ShopScreen';
import MainScreen from './screens/MainScreen';
import EditMainScreen from './screens/EditMainScreen';
import FinishedTasksScreen from './screens/FinishedTasksScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { navigationRef, navigate } from './RootNavigation';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider, connect } from 'react-redux';
import {
    clearTextInputAndDateString,
    changeListOfTasks,
    changeSearchMode,
    changeListOfFinishedTasks,
    changeDrawerCondition,
    changeTextInSearchCaseForMainScreen,
    changeTextInSearchCaseForShopScreen,
    changeTextInSearchCaseForPersonalScreen,
    changeTextInSearchCaseForWorkScreen,
    changeTextInSearchCaseForFinishedScreen,
} from './store/slice';
const Drawer = createDrawerNavigator();

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBarForMainScreen: false,
            inputTextForMainScreen: '',
            showSearchBarForFinishedScreen: false,
            inputTextForFinishedScreen: '',
            showSearchBarForShopScreen: false,
            inputTextForShopScreen: '',
            showSearchBarForPersonalScreen: false,
            inputTextForPersonalScreen: '',
            showSearchBarForWorkScreen: false,
            inputTextForWorkScreen: '',
        };
    }

    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Drawer.Navigator
                    screenOptions={{
                        drawerStyle: {
                            backgroundColor: '#072A6C',
                        },
                    }}>
                    <Drawer.Screen
                        name={'جميع القوائم'}
                        component={MainScreen}
                        options={
                            this.state.showSearchBarForMainScreen === false
                                ? {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    جميع القوائم
                                                </Text>
                                                {this.props.state.task.listOfTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',

                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerLeft: props => {
                                        return <View></View>;
                                    },

                                    headerTitle: 'جميع القوائم',
                                    headerRight: props => {
                                        return (
                                            <View style={styles.leftViewForRoot}>
                                                <Pressable
                                                    onPress={() => {
                                                        this.setState({ showSearchBarForMainScreen: true, inputTextForMainScreen: "" });
                                                    }}>
                                                    <EvilIcons
                                                        name="search"
                                                        color={'white'}
                                                        size={hp('5%')}
                                                    />
                                                </Pressable>

                                                <View style={styles.spacer}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.clearTextInputAndDateString({
                                                            textInputString: '',
                                                            dateString: '',
                                                            dropDownValue: '',
                                                            checkBoxValue: false,
                                                        });
                                                        this.props.changeDrawerCondition({
                                                            fromDrawer: true,
                                                        });
                                                        function openDrawer(routeName) {
                                                            if (navigationRef.isReady()) {
                                                                navigationRef.current.dispatch(
                                                                    DrawerActions.openDrawer(),
                                                                );
                                                            }
                                                        }
                                                        openDrawer('جميع القوائم');
                                                    }}>
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        color={'white'}
                                                        size={hp('3%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                }
                                : {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    جميع القوائم
                                                </Text>
                                                {this.props.state.task.listOfTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerTitle: '',

                                    headerLeft: props => {
                                        return (
                                            <View style={styles.iconView}>
                                                <View style={styles.spacerOne}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.changeSearchMode(false);
                                                        this.setState({
                                                            inputText: '',
                                                            showSearchBarForMainScreen: false,
                                                        });
                                                        this.props.changeTextInSearchCaseForMainScreen({
                                                            inputTextFromRootOrMain: '',
                                                        });
                                                    }}>
                                                    <AntDesign
                                                        name="arrowright"
                                                        color={'white'}
                                                        size={hp('4%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                    headerRight: props => {
                                        return (
                                            <View style={styles.textInputView}>
                                                <EvilIcons
                                                    name="search"
                                                    color={'white'}
                                                    size={hp('5%')}
                                                />
                                                <TextInput
                                                    theme={{
                                                        colors: {
                                                            text: 'white',
                                                        },
                                                    }}
                                                    underlineColor="transparent"
                                                    placeholder="البحث"
                                                    style={styles.textInput}
                                                    selectionColor="white"
                                                    activeUnderlineColor="transparent"
                                                    placeholderTextColor={'white'}
                                                    onChangeText={text => {
                                                        this.setState({ inputTextForMainScreen: text });
                                                        this.props.changeTextInSearchCaseForMainScreen({
                                                            inputTextFromRootOrMain: text,
                                                        });
                                                        let copiedList = [
                                                            ...this.props.state.task.listOfTasks,
                                                        ];
                                                        let filteredList = copiedList.filter(element => {
                                                            return (
                                                                element.taskText.startsWith(
                                                                    text.toUpperCase(),
                                                                ) ||
                                                                element.taskText.startsWith(
                                                                    text.toLocaleLowerCase(),
                                                                ) ||
                                                                element.taskText === text ||
                                                                element.taskText.includes(text) ||
                                                                element.taskText
                                                                    .toLowerCase()
                                                                    .includes(text) ||
                                                                element.taskText.toUpperCase().includes(text)
                                                            );
                                                        });
                                                        this.props.changeListOfTasks({
                                                            filteredList: filteredList,
                                                            search: true,
                                                        });
                                                    }}
                                                    value={this.state.inputTextForMainScreen}
                                                />

                                                {this.state.inputTextForMainScreen.length !== 0 && (
                                                    <View style={styles.iconView}>
                                                        <Pressable
                                                            onPress={() => {
                                                                this.props.changeSearchMode(false);
                                                                this.setState({ inputTextForMainScreen: '' });
                                                                this.props.changeTextInSearchCaseForMainScreen(
                                                                    { inputTextFromRootOrMain: '' },
                                                                );
                                                            }}>
                                                            <Icons
                                                                name="close"
                                                                color={'white'}
                                                                size={hp('3%')}
                                                            />
                                                        </Pressable>
                                                        <View style={styles.spacerOne}></View>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    },
                                }
                        }
                    />
                    <Drawer.Screen
                        name={'مهمة جديدة'}
                        component={EditMainScreen}
                        options={{
                            drawerIcon: ({ focused, size, color }) => {
                                return <Entypo name="menu" color={'white'} size={hp('4%')} />;
                            },
                            drawerActiveBackgroundColor: '#64b7f6',

                            drawerLabelStyle: {
                                color: 'white',
                                fontSize: hp('2.5%'),
                            },
                            headerTintColor: 'white',
                            headerStyle: {
                                backgroundColor: '#64b7f6',
                            },
                            headerLeft: props => {
                                return (
                                    <View style={styles.leftViewForRoot}>
                                        <Pressable
                                            onPress={() => {
                                                this.props.clearTextInputAndDateString({
                                                    textInputString: '',
                                                    dateString: '',
                                                    dropDownValue: '',
                                                    checkBoxValue: false,
                                                });
                                                this.props.changeDrawerCondition({
                                                    fromDrawer: true,
                                                });
                                                function openDrawer(routeName) {
                                                    if (navigationRef.isReady()) {
                                                        navigationRef.current.dispatch(
                                                            DrawerActions.openDrawer(),
                                                        );
                                                    }
                                                }
                                                openDrawer('مهمه جديدة');
                                            }}>
                                            <Entypo
                                                name="dots-three-vertical"
                                                color={'white'}
                                                size={hp('3%')}
                                            />
                                        </Pressable>
                                    </View>
                                );
                            },
                        }}
                    />

                    <Drawer.Screen
                        name={'انتهى'}
                        component={FinishedTasksScreen}
                        options={
                            this.state.showSearchBarForFinishedScreen === false
                                ? {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    انتهى
                                                </Text>
                                                {this.props.state.task.listOfFinishedTasks.length >
                                                    0 && (
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontSize: hp('2.5%'),
                                                            }}>
                                                            {this.props.state.task.listOfFinishedTasks.length}
                                                        </Text>
                                                    )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <AntDesign
                                                name="checksquare"
                                                color={'white'}
                                                size={hp('4%')}
                                            />
                                        );
                                    },

                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerLeft: props => {
                                        return <View></View>;
                                    },
                                    headerTitle: 'انتهى',
                                    headerRight: props => {
                                        return (
                                            <View style={styles.leftViewForRoot}>
                                                <Pressable
                                                    onPress={() => {
                                                        this.setState({
                                                            showSearchBarForFinishedScreen: true,
                                                            inputTextForFinishedScreen: "",
                                                        });
                                                    }}>
                                                    <EvilIcons
                                                        name="search"
                                                        color={'white'}
                                                        size={hp('5%')}
                                                    />
                                                </Pressable>

                                                <View style={styles.spacer}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.clearTextInputAndDateString({
                                                            textInputString: '',
                                                            dateString: '',
                                                            dropDownValue: '',
                                                            checkBoxValue: false,
                                                        });
                                                        this.props.changeDrawerCondition({
                                                            fromDrawer: true,
                                                        });
                                                        function openDrawer(routeName) {
                                                            if (navigationRef.isReady()) {
                                                                navigationRef.current.dispatch(
                                                                    DrawerActions.openDrawer(),
                                                                );
                                                            }
                                                        }
                                                        openDrawer('انتهى');
                                                    }}>
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        color={'white'}
                                                        size={hp('3%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                }
                                : {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    انتهى
                                                </Text>
                                                {this.props.state.task.listOfFinishedTasks.length >
                                                    0 && (
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontSize: hp('2.5%'),
                                                            }}>
                                                            {this.props.state.task.listOfFinishedTasks.length}
                                                        </Text>
                                                    )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerTitle: '',

                                    headerLeft: props => {
                                        return (
                                            <View style={styles.iconView}>
                                                <View style={styles.spacerOne}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.changeSearchMode(false);
                                                        this.setState({
                                                            inputTextForFinishedScreen: '',
                                                            showSearchBarForFinishedScreen: false,
                                                        });
                                                        this.props.changeTextInSearchCaseForFinishedScreen(
                                                            { inputTextFromRootOrFinished: '' },
                                                        );
                                                    }}>
                                                    <AntDesign
                                                        name="arrowright"
                                                        color={'white'}
                                                        size={hp('4%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                    headerRight: props => {
                                        return (
                                            <View style={styles.textInputView}>
                                                <EvilIcons
                                                    name="search"
                                                    color={'white'}
                                                    size={hp('5%')}
                                                />
                                                <TextInput
                                                    theme={{
                                                        colors: {
                                                            text: 'white',
                                                        },
                                                    }}
                                                    underlineColor="transparent"
                                                    placeholder="البحث"
                                                    style={styles.textInput}
                                                    selectionColor="white"
                                                    activeUnderlineColor="transparent"
                                                    placeholderTextColor={'white'}
                                                    onChangeText={text => {
                                                        this.setState({ inputTextForFinishedScreen: text });

                                                        this.props.changeTextInSearchCaseForFinishedScreen(
                                                            { inputTextFromRootOrFinished: text },
                                                        );
                                                        let copiedList = [
                                                            ...this.props.state.task.listOfFinishedTasks,
                                                        ];
                                                        let filteredList = copiedList.filter(element => {
                                                            return (
                                                                element.taskText.startsWith(
                                                                    text.toUpperCase(),
                                                                ) ||
                                                                element.taskText.startsWith(
                                                                    text.toLocaleLowerCase(),
                                                                ) ||
                                                                element.taskText === text ||
                                                                element.taskText.includes(text) ||
                                                                element.taskText
                                                                    .toLowerCase()
                                                                    .includes(text) ||
                                                                element.taskText.toUpperCase().includes(text)
                                                            );
                                                        });

                                                        this.props.changeListOfTasks({
                                                            filteredList: filteredList,
                                                            search: true,
                                                        });
                                                    }}
                                                    value={this.state.inputTextForFinishedScreen}
                                                />

                                                {this.state.inputTextForFinishedScreen.length !==
                                                    0 && (
                                                        <View style={styles.iconView}>
                                                            <Pressable
                                                                onPress={() => {
                                                                    this.props.changeSearchMode(false);
                                                                    this.setState({
                                                                        inputTextForFinishedScreen: '',
                                                                    });
                                                                    this.props.changeTextInSearchCaseForFinishedScreen(
                                                                        { inputTextFromRootOrFinished: '' },
                                                                    );
                                                                }}>
                                                                <Icons
                                                                    name="close"
                                                                    color={'white'}
                                                                    size={hp('3%')}
                                                                />
                                                            </Pressable>
                                                            <View style={styles.spacerOne}></View>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    },
                                }
                        }
                    />

                    <Drawer.Screen
                        name={'التسوق'}
                        component={ShopScreen}
                        options={
                            this.state.showSearchBarForShopScreen === false
                                ? {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    التسوق
                                                </Text>
                                                {this.props.state.task.listOfShopTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfShopTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerLeft: props => {
                                        return <View></View>;
                                    },
                                    headerTitle: 'التسوق',
                                    headerRight: props => {
                                        return (
                                            <View style={styles.leftViewForRoot}>
                                                <Pressable
                                                    onPress={() => {
                                                        this.setState({ showSearchBarForShopScreen: true, inputTextForShopScreen: "" });
                                                    }}>
                                                    <EvilIcons
                                                        name="search"
                                                        color={'white'}
                                                        size={hp('5%')}
                                                    />
                                                </Pressable>

                                                <View style={styles.spacer}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.clearTextInputAndDateString({
                                                            textInputString: '',
                                                            dateString: '',
                                                            dropDownValue: '',
                                                            checkBoxValue: false,
                                                        });
                                                        this.props.changeDrawerCondition({
                                                            fromDrawer: true,
                                                        });
                                                        function openDrawer(routeName) {
                                                            if (navigationRef.isReady()) {
                                                                navigationRef.current.dispatch(
                                                                    DrawerActions.openDrawer(),
                                                                );
                                                            }
                                                        }
                                                        openDrawer('التسوق');
                                                    }}>
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        color={'white'}
                                                        size={hp('3%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                }
                                : {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    التسوق
                                                </Text>
                                                {this.props.state.task.listOfShopTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfShopTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerTitle: '',

                                    headerLeft: props => {
                                        return (
                                            <View style={styles.iconView}>
                                                <View style={styles.spacerOne}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.changeSearchMode(false);
                                                        this.setState({
                                                            showSearchBarForShopScreen: false,
                                                            inputTextForShopScreen: '',
                                                        });
                                                        this.props.changeTextInSearchCaseForShopScreen({
                                                            inputTextFromRootOrShop: '',
                                                        });
                                                    }}>
                                                    <AntDesign
                                                        name="arrowright"
                                                        color={'white'}
                                                        size={hp('4%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                    headerRight: props => {
                                        return (
                                            <View style={styles.textInputView}>
                                                <EvilIcons
                                                    name="search"
                                                    color={'white'}
                                                    size={hp('5%')}
                                                />
                                                <TextInput
                                                    theme={{
                                                        colors: {
                                                            text: 'white',
                                                        },
                                                    }}
                                                    underlineColor="transparent"
                                                    placeholder="البحث"
                                                    style={styles.textInput}
                                                    selectionColor="white"
                                                    activeUnderlineColor="transparent"
                                                    placeholderTextColor={'white'}
                                                    onChangeText={text => {
                                                        this.setState({ inputTextForShopScreen: text });
                                                        this.props.changeTextInSearchCaseForShopScreen({
                                                            inputTextFromRootOrShop: text,
                                                        });
                                                        let copiedList = [
                                                            ...this.props.state.task.listOfShopTasks,
                                                        ];
                                                        let filteredList = copiedList.filter(element => {
                                                            return (
                                                                element.taskText.startsWith(
                                                                    text.toUpperCase(),
                                                                ) ||
                                                                element.taskText.startsWith(
                                                                    text.toLocaleLowerCase(),
                                                                ) ||
                                                                element.taskText === text ||
                                                                element.taskText.includes(text) ||
                                                                element.taskText
                                                                    .toLowerCase()
                                                                    .includes(text) ||
                                                                element.taskText.toUpperCase().includes(text)
                                                            );
                                                        });
                                                        this.props.changeListOfTasks({
                                                            filteredList: filteredList,
                                                            search: true,
                                                        });
                                                    }}
                                                    value={this.state.inputTextForShopScreen}
                                                />

                                                {this.state.inputTextForShopScreen.length !== 0 && (
                                                    <View style={styles.iconView}>
                                                        <Pressable
                                                            onPress={() => {
                                                                this.props.changeSearchMode(false);
                                                                this.setState({ inputTextForShopScreen: '' });
                                                                this.props.changeTextInSearchCaseForShopScreen(
                                                                    { inputTextFromRootOrShop: '' },
                                                                );
                                                            }}>
                                                            <Icons
                                                                name="close"
                                                                color={'white'}
                                                                size={hp('3%')}
                                                            />
                                                        </Pressable>
                                                        <View style={styles.spacerOne}></View>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    },
                                }
                        }
                    />
                    <Drawer.Screen
                        name={'الشخصيه'}
                        component={PersonalScreen}
                        options={
                            this.state.showSearchBarForPersonalScreen === false
                                ? {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    الشخصيه
                                                </Text>
                                                {this.props.state.task.listOfPersonalTasks.length >
                                                    0 && (
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontSize: hp('2.5%'),
                                                            }}>
                                                            {this.props.state.task.listOfPersonalTasks.length}
                                                        </Text>
                                                    )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerLeft: props => {
                                        return <View></View>;
                                    },
                                    headerTitle: 'الشخصيه',
                                    headerRight: props => {
                                        return (
                                            <View style={styles.leftView}>
                                                <Pressable
                                                    onPress={() => {
                                                        this.setState({
                                                            showSearchBarForPersonalScreen: true,
                                                            inputTextForPersonalScreen: "",
                                                        });
                                                    }}>
                                                    <EvilIcons
                                                        name="search"
                                                        color={'white'}
                                                        size={hp('5%')}
                                                    />
                                                </Pressable>

                                                <View style={styles.spacer}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.clearTextInputAndDateString({
                                                            textInputString: '',
                                                            dateString: '',
                                                            dropDownValue: '',
                                                            checkBoxValue: false,
                                                        });
                                                        this.props.changeDrawerCondition({
                                                            fromDrawer: true,
                                                        });
                                                        function openDrawer(routeName) {
                                                            if (navigationRef.isReady()) {
                                                                navigationRef.current.dispatch(
                                                                    DrawerActions.openDrawer(),
                                                                );
                                                            }
                                                        }
                                                        openDrawer('الشخصيه');
                                                    }}>
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        color={'white'}
                                                        size={hp('3%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                }
                                : {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    الشخصيه
                                                </Text>
                                                {this.props.state.task.listOfPersonalTasks.length >
                                                    0 && (
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontSize: hp('2.5%'),
                                                            }}>
                                                            {this.props.state.task.listOfPersonalTasks.length}
                                                        </Text>
                                                    )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerTitle: '',

                                    headerLeft: props => {
                                        return (
                                            <View style={styles.iconView}>
                                                <View style={styles.spacerOne}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.changeSearchMode(false);
                                                        this.setState({
                                                            showSearchBarForPersonalScreen: false,
                                                            inputTextForPersonalScreen: '',
                                                        });
                                                        this.props.changeTextInSearchCaseForPersonalScreen(
                                                            { inputTextFromRootOrPersonal: '' },
                                                        );
                                                    }}>
                                                    <AntDesign
                                                        name="arrowright"
                                                        color={'white'}
                                                        size={hp('4%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                    headerRight: props => {
                                        return (
                                            <View style={styles.textInputView}>
                                                <EvilIcons
                                                    name="search"
                                                    color={'white'}
                                                    size={hp('5%')}
                                                />
                                                <TextInput
                                                    theme={{
                                                        colors: {
                                                            text: 'white',
                                                        },
                                                    }}
                                                    underlineColor="transparent"
                                                    placeholder="البحث"
                                                    style={styles.textInput}
                                                    selectionColor="white"
                                                    activeUnderlineColor="transparent"
                                                    placeholderTextColor={'white'}
                                                    onChangeText={text => {
                                                        this.setState({ inputTextForPersonalScreen: text });
                                                        this.props.changeTextInSearchCaseForPersonalScreen(
                                                            { inputTextFromRootOrPersonal: text },
                                                        );
                                                        let copiedList = [
                                                            ...this.props.state.task.listOfPersonalTasks,
                                                        ];
                                                        let filteredList = copiedList.filter(element => {
                                                            return (
                                                                element.taskText.startsWith(
                                                                    text.toUpperCase(),
                                                                ) ||
                                                                element.taskText.startsWith(
                                                                    text.toLocaleLowerCase(),
                                                                ) ||
                                                                element.taskText === text ||
                                                                element.taskText.includes(text) ||
                                                                element.taskText
                                                                    .toLowerCase()
                                                                    .includes(text) ||
                                                                element.taskText.toUpperCase().includes(text)
                                                            );
                                                        });
                                                        this.props.changeListOfTasks({
                                                            filteredList: filteredList,
                                                            search: true,
                                                        });
                                                    }}
                                                    value={this.state.inputTextForPersonalScreen}
                                                />

                                                {this.state.inputTextForPersonalScreen.length !==
                                                    0 && (
                                                        <View style={styles.iconView}>
                                                            <Pressable
                                                                onPress={() => {
                                                                    this.props.changeSearchMode(false);
                                                                    this.setState({
                                                                        inputTextForPersonalScreen: '',
                                                                    });
                                                                    this.props.changeTextInSearchCaseForPersonalScreen(
                                                                        { inputTextFromRootOrPersonal: '' },
                                                                    );
                                                                }}>
                                                                <Icons
                                                                    name="close"
                                                                    color={'white'}
                                                                    size={hp('3%')}
                                                                />
                                                            </Pressable>
                                                            <View style={styles.spacerOne}></View>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    },
                                }
                        }
                    />
                    <Drawer.Screen
                        name={'العمل'}
                        component={WorkScreen}
                        options={
                            this.state.showSearchBarForWorkScreen === false
                                ? {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    العمل
                                                </Text>
                                                {this.props.state.task.listOfWorkTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfWorkTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerLeft: props => {
                                        return <View></View>;
                                    },
                                    headerTitle: 'العمل',
                                    headerRight: props => {
                                        return (
                                            <View style={styles.leftView}>
                                                <Pressable
                                                    onPress={() => {
                                                        this.setState({ showSearchBarForWorkScreen: true, inputTextForWorkScreen: "" });
                                                    }}>
                                                    <EvilIcons
                                                        name="search"
                                                        color={'white'}
                                                        size={hp('5%')}
                                                    />
                                                </Pressable>

                                                <View style={styles.spacer}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.clearTextInputAndDateString({
                                                            textInputString: '',
                                                            dateString: '',
                                                            dropDownValue: '',
                                                            checkBoxValue: false,
                                                        });
                                                        this.props.changeDrawerCondition({
                                                            fromDrawer: true,
                                                        });
                                                        function openDrawer(routeName) {
                                                            if (navigationRef.isReady()) {
                                                                navigationRef.current.dispatch(
                                                                    DrawerActions.openDrawer(),
                                                                );
                                                            }
                                                        }
                                                        openDrawer('العمل');
                                                    }}>
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        color={'white'}
                                                        size={hp('3%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                }
                                : {
                                    drawerLabel: ({ focused, color }) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: hp('2.5%'),
                                                    }}>
                                                    العمل
                                                </Text>
                                                {this.props.state.task.listOfWorkTasks.length > 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: hp('2.5%'),
                                                        }}>
                                                        {this.props.state.task.listOfWorkTasks.length}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    },
                                    drawerIcon: ({ focused, size, color }) => {
                                        return (
                                            <Entypo name="menu" color={'white'} size={hp('4%')} />
                                        );
                                    },
                                    drawerActiveBackgroundColor: '#64b7f6',

                                    drawerLabelStyle: {
                                        color: 'white',
                                        fontSize: hp('2.5%'),
                                    },
                                    headerTintColor: 'white',
                                    headerStyle: {
                                        backgroundColor: '#64b7f6',
                                    },
                                    headerTitle: '',

                                    headerLeft: props => {
                                        return (
                                            <View style={styles.iconView}>
                                                <View style={styles.spacerOne}></View>
                                                <Pressable
                                                    onPress={() => {
                                                        this.props.changeSearchMode(false);
                                                        this.setState({
                                                            showSearchBarForWorkScreen: false,
                                                            inputTextForWorkScreen: '',
                                                        });
                                                        this.props.changeTextInSearchCaseForWorkScreen({
                                                            inputTextFromRootOrWork: '',
                                                        });
                                                    }}>
                                                    <AntDesign
                                                        name="arrowright"
                                                        color={'white'}
                                                        size={hp('4%')}
                                                    />
                                                </Pressable>
                                            </View>
                                        );
                                    },
                                    headerRight: props => {
                                        return (
                                            <View style={styles.textInputView}>
                                                <EvilIcons
                                                    name="search"
                                                    color={'white'}
                                                    size={hp('5%')}
                                                />
                                                <TextInput
                                                    theme={{
                                                        colors: {
                                                            text: 'white',
                                                        },
                                                    }}
                                                    underlineColor="transparent"
                                                    placeholder="البحث"
                                                    style={styles.textInput}
                                                    selectionColor="white"
                                                    activeUnderlineColor="transparent"
                                                    placeholderTextColor={'white'}
                                                    onChangeText={text => {
                                                        this.setState({ inputTextForWorkScreen: text });
                                                        this.props.changeTextInSearchCaseForWorkScreen({
                                                            inputTextFromRootOrWork: text,
                                                        });

                                                        let copiedList = [
                                                            ...this.props.state.task.listOfWorkTasks,
                                                        ];
                                                        let filteredList = copiedList.filter(element => {
                                                            return (
                                                                element.taskText.startsWith(
                                                                    text.toUpperCase(),
                                                                ) ||
                                                                element.taskText.startsWith(
                                                                    text.toLocaleLowerCase(),
                                                                ) ||
                                                                element.taskText === text ||
                                                                element.taskText.includes(text) ||
                                                                element.taskText
                                                                    .toLowerCase()
                                                                    .includes(text) ||
                                                                element.taskText.toUpperCase().includes(text)
                                                            );
                                                        });
                                                        this.props.changeListOfTasks({
                                                            filteredList: filteredList,
                                                            search: true,
                                                        });
                                                    }}
                                                    value={this.state.inputTextForWorkScreen}
                                                />

                                                {this.state.inputTextForWorkScreen.length !== 0 && (
                                                    <View style={styles.iconView}>
                                                        <Pressable
                                                            onPress={() => {
                                                                this.props.changeSearchMode(false);
                                                                this.setState({ inputTextForWorkScreen: '' });
                                                                this.props.changeTextInSearchCaseForWorkScreen(
                                                                    { inputTextFromRootOrWork: '' },
                                                                );
                                                            }}>
                                                            <Icons
                                                                name="close"
                                                                color={'white'}
                                                                size={hp('3%')}
                                                            />
                                                        </Pressable>
                                                        <View style={styles.spacerOne}></View>
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    },
                                }
                        }
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}
const mapDispatchToProps = {
    clearTextInputAndDateString,
    changeListOfTasks,
    changeSearchMode,
    changeListOfFinishedTasks,
    changeDrawerCondition,
    changeTextInSearchCaseForMainScreen,
    changeTextInSearchCaseForShopScreen,
    changeTextInSearchCaseForPersonalScreen,
    changeTextInSearchCaseForWorkScreen,
    changeTextInSearchCaseForFinishedScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

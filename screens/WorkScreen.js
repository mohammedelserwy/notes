import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Pressable,
    FlatList,
    StatusBar,
    Image,
} from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { createSlice } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import {
    changeTextInSearchCaseForWorkScreen,
    clearTextInputAndDateString,
    changeDrawerCondition,
    changeCheckBoxValueForWorkTask,
    changeTaskPressConditionForWorkTask,

    changeNameOfTask,
    changeViewConditionOnPress,

    changeSearchMode,
    changeListOfTasks,
    updateForFirstTime,
    updateForSecondTime,
    updateForThirdTime,
    updateForFourthTime,
    updateForFifthTime,
    updateForSixTime,
    updateForSevenTime,
    updateForEightTime,
    changeTaskType,
    changeTaskTypeOnLongPress,
    changeTaskTypeOnPress,
    changeTaskPressCondition,
    changeTextInputString,
    changeDropDownValue,
    changeIsLongPressForWorkScreen,
    changeTaskTypeOnLongPressForWorkTask,
    changeViewConditionOnPressForWorkTask,
    changeCheckBoxValueOnLongPressForWorkTask,
    changeCheckBoxOnLongPressForWorkTask,
    changeCheckBoxForWorkTask,
    updateForSecondTimeForWorkTask,
    changeTaskTypeForWorkTask,
    deleteTasksForWorkTask,
} from '../store/slice.js';

class WorkScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCheckBox: false,
            visible: false,

            inputText: '',
            checkSquareButtonPressed: false,
            trashButtonPressed: false,
        };
    }
    newList;
    updateHeaderOnPress() {
        this.props.navigation.setOptions({
            headerTintColor: 'white',
            headerTitle: '??????????',
            headerStyle: {
                backgroundColor: '#64b7f6',
            },
            headerLeft: props => {
                return <View></View>;
            },
            headerRight: props => {
                return (
                    <View style={styles.leftView}>
                        <Pressable
                            onPress={() => {
                                this.setState({ inputText: "" });
                                this.updateHeaderOnSearch();
                            }}>
                            <EvilIcons name="search" color={'white'} size={hp('5%')} />
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
                                this.props.changeDrawerCondition({ fromDrawer: true });
                                this.props.navigation.openDrawer();
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
        });
    }
    updateHeaderOnLongPress() {
        this.props.navigation.setOptions({
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: {
                backgroundColor: '#64b7f6',
            },

            headerRight: props => {
                return (
                    <View style={styles.leftView}>
                        <Pressable
                            onPress={() => {
                                this.setState({
                                    visible: true,
                                    checkSquareButtonPressed: true,
                                    trashButtonPressed: false,
                                });
                            }}>
                            <AntDesign name="checksquare" color={'white'} size={hp('3%')} />
                        </Pressable>
                        <View style={styles.spacer}></View>

                        <Pressable
                            onPress={() => {
                                this.setState({
                                    visible: true,
                                    trashButtonPressed: true,
                                    checkSquareButtonPressed: false,
                                });
                            }}>
                            <FontAwesome5 name="trash" color={'white'} size={hp('3%')} />
                        </Pressable>
                    </View>
                );
            },

            headerLeft: props => {
                return (
                    <View style={styles.arrowView}>
                        <View style={styles.spacerOne}></View>
                        <Pressable
                            onPress={() => {
                                this.props.updateForFourthTime({
                                    isLongPressed: false,
                                    selectedNotesIndexsList: [],
                                });
                                this.updateHeaderOnPress();
                            }}>
                            <AntDesign name="arrowright" color={'white'} size={hp('4%')} />
                        </Pressable>
                        <View style={styles.spacerOne}></View>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: hp('2.5%'),
                            }}>
                            {this.newList.length}
                        </Text>
                    </View>
                );
            },
        });
    }

    updateHeaderOnSearch() {
        this.props.navigation.setOptions({
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
                                this.setState({ inputText: '' });
                                this.updateHeaderOnPress();
                                this.props.changeTextInSearchCaseForWorkScreen({ inputTextFromRootOrWork: "" });
                            }}>
                            <AntDesign name="arrowright" color={'white'} size={hp('4%')} />
                        </Pressable>
                    </View>
                );
            },
            headerRight: props => {
                return (
                    <View style={styles.textInputView}>
                        <EvilIcons name="search" color={'white'} size={hp('5%')} />
                        <TextInput
                            theme={{
                                colors: {
                                    text: 'white',
                                },
                            }}
                            underlineColor="transparent"
                            placeholder="??????????"
                            style={styles.textInput}
                            selectionColor="white"
                            activeUnderlineColor="transparent"
                            placeholderTextColor={'white'}
                            onChangeText={text => {
                                this.setState({ inputText: text });
                                this.props.changeTextInSearchCaseForWorkScreen
                                    ({ inputTextFromRootOrWork: text });
                                let copiedList = [...this.props.state.task.listOfWorkTasks];
                                let filteredList = copiedList.filter(
                                    (element, index, array) => {
                                        return (
                                            element.taskText.startsWith(text.toUpperCase()) ||
                                            element.taskText.startsWith(text.toLocaleLowerCase()) ||
                                            element.taskText === text ||
                                            element.taskText.includes(text) ||
                                            element.taskText.toLowerCase().includes(text) ||
                                            element.taskText.toUpperCase().includes(text)
                                        );
                                    },
                                );
                                this.props.changeListOfTasks({
                                    filteredList: filteredList,
                                    search: true,
                                });
                            }}
                            value={this.state.inputText}
                        />

                        {this.state.inputText.length !== 0 && (
                            <View style={styles.iconView}>
                                <Pressable
                                    onPress={() => {
                                        this.props.changeSearchMode(false);
                                        this.setState({ inputText: '' });
                                        this.props.changeTextInSearchCaseForWorkScreen({ inputTextFromRootOrWork: "" });
                                    }}>
                                    <Icons name="close" color={'white'} size={hp('3%')} />
                                </Pressable>
                                <View style={styles.spacerOne}></View>
                            </View>
                        )}
                    </View>
                );
            },
        });
    }
    render() {
        if (this.props.state.task.listOfWorkTasks.length === 0) {
            return (
                <View style={styles.rootScreen}>
                    <StatusBar backgroundColor={'#072A6C'} />
                    <View style={styles.firstView}>
                        <View
                            style={{
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{ color: 'white', fontSize: hp('3%') }}>

                                {this.props.state.task.inputTextFromRootOrWork === ""
                                    ? '???? ???? ???????????? ????'
                                    : `${this.props.state.task.inputTextFromRootOrWork}  ?????? ??????????`

                                }
                            </Text>
                        </View>
                        <FAB
                            icon="plus"
                            style={styles.fab}
                            onPress={() => {
                                this.props.changeDropDownValue({
                                    dropDownValue: '3',
                                    nameOfTask: '??????????',
                                });
                                this.props.changeNameOfTask({
                                    fromView: false,
                                    fromFinishedScreen: false,
                                    dateString: '',
                                    checkBoxValue: false,
                                    textInputString: '',
                                    fromShopScreen: false,
                                    fromFAB: true,
                                    dropDownValue: '3',
                                    fromWorkScreen: true,
                                    fromPersonalScreen: false,
                                    fromDrawer: false,
                                });

                                this.props.changeTextInputString({
                                    textInput: '',
                                    dateInput: '',
                                });

                                this.props.navigation.jumpTo('???????? ??????????');
                            }}
                            color={'#0197f6'}
                            small={false}
                        />

                    </View>
                    <View style={styles.secondView}>
                        <TextInput
                            underlineColor="white"
                            placeholder="???????? ???????????? ??????"
                            style={styles.textInput}
                            selectionColor="#7AD7F0"
                            activeUnderlineColor="#7AD7F0"
                            placeholderTextColor={'white'}
                            onChangeText={text => {
                                this.props.updateForFirstTime(text);
                            }}
                            value={this.props.state.task.inputText}
                        />

                        {this.props.state.task.inputText.length !== 0 && (
                            <Pressable
                                onPress={() => {
                                    this.props.updateForSecondTimeForWorkTask({
                                        inputText: '',
                                        listOfWorkTasks: [
                                            ...this.props.state.task.listOfWorkTasks,

                                            {
                                                taskText: this.props.state.task.taskText,
                                                typeOfTask: 'all',
                                                checkBoxValue: false,
                                                pressTheTaskForFirstTime: false,
                                                fromView: false,
                                                nameOfTask: '??????????',
                                                id: null,
                                                dateString: '',
                                                isLongPressed: false,
                                            },
                                        ],
                                        listOfTasks: [
                                            ...this.props.state.task.listOfTasks,

                                            {
                                                taskText: this.props.state.task.taskText,
                                                typeOfTask: 'all',
                                                checkBoxValue: false,
                                                pressTheTaskForFirstTime: false,
                                                fromView: false,
                                                nameOfTask: '??????????',
                                                id: null,
                                                dateString: '',
                                                isLongPressed: false,
                                            },
                                        ],
                                    });
                                    this.props.changeSearchMode(false);
                                    this.setState({ inputText: '' });
                                    this.updateHeaderOnPress();
                                    this.props.changeTextInSearchCaseForWorkScreen({ inputTextFromRootOrWork: "" });
                                    Snackbar.show({
                                        text: '???? ?????????? ????????',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                }}>
                                <Icons name="check" color={'white'} size={hp('4%')} />
                            </Pressable>
                        )}
                    </View>
                </View>
            );

        } else if (this.props.state.task.filteredList.length === 0 && this.props.state.task.search) {
            return (
                <View style={styles.rootScreen}>
                    <StatusBar backgroundColor={'#072A6C'} />
                    <View style={styles.firstView}>
                        <View
                            style={{
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{ color: 'white', fontSize: hp('3%') }}>

                                {
                                    `${this.props.state.task.inputTextFromRootOrWork}  ?????? ??????????`

                                }
                            </Text>
                        </View>
                        <FAB
                            icon="plus"
                            style={styles.fab}
                            onPress={() => {
                                this.props.changeDropDownValue({
                                    dropDownValue: '3',
                                    nameOfTask: '??????????',
                                });
                                this.props.changeNameOfTask({
                                    fromView: false,
                                    fromFinishedScreen: false,
                                    dateString: '',
                                    checkBoxValue: false,
                                    textInputString: '',
                                    fromShopScreen: false,
                                    fromFAB: true,
                                    dropDownValue: '3',
                                    fromWorkScreen: true,
                                    fromPersonalScreen: false,
                                    fromDrawer: false,
                                });

                                this.props.changeTextInputString({
                                    textInput: '',
                                    dateInput: '',
                                });

                                this.props.navigation.jumpTo('???????? ??????????');
                            }}
                            color={'#0197f6'}
                            small={false}
                        />
                    </View>
                    <View style={styles.secondView}>
                        <TextInput
                            underlineColor="white"
                            placeholder="???????? ???????????? ??????"
                            style={styles.textInput}
                            selectionColor="#7AD7F0"
                            activeUnderlineColor="#7AD7F0"
                            placeholderTextColor={'white'}
                            onChangeText={text => {
                                this.props.updateForFirstTime(text);
                            }}
                            value={this.props.state.task.inputText}
                        />

                        {this.props.state.task.inputText.length !== 0 && (
                            <Pressable
                                onPress={() => {
                                    this.props.updateForSecondTimeForWorkTask({
                                        inputText: '',
                                        listOfWorkTasks: [
                                            ...this.props.state.task.listOfWorkTasks,

                                            {
                                                taskText: this.props.state.task.taskText,
                                                typeOfTask: 'all',
                                                checkBoxValue: false,
                                                pressTheTaskForFirstTime: false,
                                                fromView: false,
                                                nameOfTask: '??????????',
                                                id: null,
                                                dateString: '',
                                                isLongPressed: false,
                                            },
                                        ],
                                        listOfTasks: [
                                            ...this.props.state.task.listOfTasks,

                                            {
                                                taskText: this.props.state.task.taskText,
                                                typeOfTask: 'all',
                                                checkBoxValue: false,
                                                pressTheTaskForFirstTime: false,
                                                fromView: false,
                                                nameOfTask: '??????????',
                                                id: null,
                                                dateString: '',
                                                isLongPressed: false,
                                            },
                                        ],
                                    });
                                    this.props.changeSearchMode(false);
                                    this.setState({ inputText: '' });
                                    this.updateHeaderOnPress();
                                    this.props.changeTextInSearchCaseForWorkScreen({ inputTextFromRootOrWork: "" });
                                    Snackbar.show({
                                        text: '???? ?????????? ????????',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                }}>
                                <Icons name="check" color={'white'} size={hp('4%')} />
                            </Pressable>
                        )}
                    </View>
                </View>
            );

        }





        else {
            return (
                <View style={styles.rootScreen}>
                    <StatusBar backgroundColor={'#072A6C'} />
                    <View style={styles.firstView}>
                        <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            data={
                                this.props.state.task.search === false
                                    ? this.props.state.task.listOfWorkTasks
                                    : this.props.state.task.filteredList
                            }
                            renderItem={itemData => {
                                return (
                                    <Pressable
                                        onLongPress={() => {
                                            this.props.changeIsLongPressForWorkScreen({
                                                id: itemData.index,
                                                isLongPressed: true,
                                            });
                                            this.props.changeTaskPressConditionForWorkTask({
                                                id: itemData.index,
                                                condition: true,
                                            });
                                            this.props.changeTaskTypeOnLongPressForWorkTask({
                                                id: itemData.index,
                                                typeOfTask: 'finished',
                                            });


                                            this.props.updateForFourthTime({
                                                isLongPressed: true,
                                                selectedNotesIndexsList: [
                                                    ...this.props.state.task.selectedNotesIndexsList,
                                                    itemData.index,
                                                ],
                                            });
                                            this.newList = this.props.state.task.selectedNotesIndexsList;
                                            this.updateHeaderOnLongPress();
                                        }}
                                        onPress={() => {
                                            this.props.changeIsLongPressForWorkScreen({
                                                id: itemData.index,
                                                isLongPressed: false,
                                            });
                                            if (
                                                this.props.state.task.listOfWorkTasks[itemData.index]
                                                    .pressTheTaskForFirstTime
                                            ) {
                                                this.props.changeTaskTypeOnLongPressForWorkTask({
                                                    id: itemData.index,
                                                    typeOfTask: 'all',
                                                });
                                                this.newList =
                                                    this.props.state.task.selectedNotesIndexsList.filter(
                                                        element => {
                                                            return element !== itemData.index;
                                                        },
                                                    );

                                                if (this.newList.length === 0) {
                                                    this.props.updateForFifthTime(false);
                                                    this.updateHeaderOnPress();
                                                } else {
                                                    this.props.updateForSixTime(true);
                                                    this.updateHeaderOnLongPress();
                                                }

                                                this.props.updateForEightTime(this.newList);
                                                this.props.changeTaskPressConditionForWorkTask({
                                                    id: itemData.index,
                                                    condition: false,
                                                });
                                            } else if (
                                                this.props.state.task.listOfWorkTasks[itemData.index]
                                                    .pressTheTaskForFirstTime === false
                                            ) {
                                                this.updateHeaderOnPress();

                                                this.props.updateForFourthTime({
                                                    isLongPressed: false,
                                                    selectedNotesIndexsList: [],
                                                });

                                                this.props.changeViewConditionOnPressForWorkTask({
                                                    fromDrawer: false,
                                                    fromShopScreen: false,
                                                    id: itemData.index,
                                                    fromFinishedScreen: false,
                                                    fromView: false,
                                                    fromFAB: false,
                                                    checkBoxValue: false,
                                                    dateString:
                                                        this.props.state.task.listOfWorkTasks[itemData.index]
                                                            .dateString,

                                                    fromWorkScreen: true,
                                                    fromPersonalScreen: false,
                                                });
                                                this.props.changeTextInputString({
                                                    textInput:
                                                        this.props.state.task.listOfWorkTasks[itemData.index]
                                                            .taskText,
                                                });
                                                if (
                                                    this.props.state.task.listOfWorkTasks[itemData.index]
                                                        .nameOfTask === ''
                                                ) {
                                                    this.props.changeDropDownValue({
                                                        dropDownValue: '',
                                                        nameOfTask: '',
                                                    });
                                                } else if (
                                                    this.props.state.task.listOfWorkTasks[itemData.index]
                                                        .nameOfTask === '????????????'
                                                ) {
                                                    this.props.changeDropDownValue({
                                                        dropDownValue: '1',
                                                        nameOfTask: '????????????',
                                                    });
                                                } else if (
                                                    this.props.state.task.listOfWorkTasks[itemData.index]
                                                        .nameOfTask === '??????????????'
                                                ) {
                                                    this.props.changeDropDownValue({
                                                        dropDownValue: '2',
                                                        nameOfTask: '??????????????',
                                                    });
                                                } else if (
                                                    this.props.state.task.listOfWorkTasks[itemData.index]
                                                        .nameOfTask === '??????????'
                                                ) {
                                                    this.props.changeDropDownValue({
                                                        dropDownValue: '3',
                                                        nameOfTask: '??????????',
                                                    });
                                                }
                                                this.setState({ inputText: '' });
                                                this.props.navigation.jumpTo('???????? ??????????');
                                            }
                                        }}>
                                        <View
                                            style={[
                                                {
                                                    margin: hp('1%'),
                                                    backgroundColor: '#1357a6',

                                                    borderRadius: wp('5%'),

                                                    justifyContent: 'space-between',
                                                    height:
                                                        this.props.state.task.listOfWorkTasks[itemData.index]
                                                            .dateString === ''
                                                            ? hp('8%')
                                                            : hp('10%'),
                                                    alignItems: 'center',
                                                    paddingHorizontal: wp('4%'),
                                                    paddingVertical: hp('.4%'),
                                                },

                                                {
                                                    borderColor:
                                                        this.props.state.task.selectedNotesIndexsList.includes(
                                                            itemData.index,
                                                        )
                                                            ? 'white'
                                                            : '#1357a6',
                                                    borderWidth:
                                                        this.props.state.task.selectedNotesIndexsList.includes(
                                                            itemData.index,
                                                        )
                                                            ? wp('.7%')
                                                            : wp('.1%'),
                                                },
                                            ]}>
                                            <View style={styles.taskViewOne}>
                                                <Text style={styles.taskText}>
                                                    {itemData.item.taskText}
                                                </Text>
                                                <CheckBox
                                                    onValueChange={value => {
                                                        if (
                                                            this.props.state.task.listOfWorkTasks[
                                                                itemData.index
                                                            ].isLongPressed
                                                        ) {
                                                            this.props.changeCheckBoxValueOnLongPressForWorkTask(
                                                                {
                                                                    id: itemData.index,
                                                                    typeOfTask: 'nine',
                                                                    checkBoxValue: value,
                                                                },
                                                            );

                                                            setTimeout(() => {
                                                                this.props.changeCheckBoxOnLongPressForWorkTask({
                                                                    id: itemData.index,
                                                                    typeOfTask: 'nine',
                                                                    selectedNotesIndexsList: [],
                                                                    isLongPressed: false,
                                                                });
                                                                Snackbar.show({
                                                                    text: '???????? ????????????',
                                                                    duration: Snackbar.LENGTH_LONG,
                                                                    textColor: 'white',
                                                                    backgroundColor: '#494848',
                                                                });
                                                            }, 1000);
                                                        } else if (
                                                            this.props.state.task.listOfWorkTasks[
                                                                itemData.index
                                                            ].isLongPressed === false
                                                        ) {
                                                            this.props.changeCheckBoxValueForWorkTask({
                                                                id: itemData.index,
                                                                typeOfTask: 'ten',
                                                                checkBoxValue: value,
                                                            });

                                                            setTimeout(() => {
                                                                this.props.changeCheckBoxForWorkTask({
                                                                    id: itemData.index,
                                                                    typeOfTask: 'ten',
                                                                });
                                                                Snackbar.show({
                                                                    text: '???????? ????????????',
                                                                    duration: Snackbar.LENGTH_LONG,
                                                                    textColor: 'white',
                                                                    backgroundColor: '#494848',
                                                                });
                                                            }, 1000);
                                                        }
                                                    }}
                                                    value={
                                                        this.props.state.task.listOfWorkTasks[itemData.index]
                                                            .checkBoxValue
                                                    }
                                                    disabled={false}
                                                    tintColors={{ true: '#00acdf', false: 'white' }}
                                                />
                                            </View>

                                            <View style={styles.taskViewTwo}>
                                                <Text style={styles.dateColor}>{itemData.item.dateString}</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            }}
                        />
                        {this.props.state.task.isLongPressed === false && (
                            <FAB
                                icon="plus"
                                style={styles.fab}
                                onPress={() => {
                                    this.props.changeDropDownValue({
                                        dropDownValue: '3',
                                        nameOfTask: '??????????',
                                    });
                                    this.props.changeNameOfTask({
                                        fromView: false,
                                        fromFinishedScreen: false,
                                        dateString: '',
                                        checkBoxValue: false,
                                        textInputString: '',
                                        fromShopScreen: false,
                                        fromFAB: true,
                                        dropDownValue: '3',
                                        fromWorkScreen: true,
                                        fromPersonalScreen: false,
                                        fromDrawer: false,
                                    });

                                    this.props.changeTextInputString({
                                        textInput: '',
                                        dateInput: '',
                                    });

                                    this.props.navigation.jumpTo('???????? ??????????');
                                }}
                                color={'#0197f6'}
                                small={false}
                            />
                        )}
                    </View>

                    {this.props.state.task.isLongPressed === false && (
                        <View style={styles.secondView}>
                            <TextInput
                                underlineColor="white"
                                placeholder="???????? ???????????? ??????"
                                style={styles.textInput}
                                selectionColor="#7AD7F0"
                                activeUnderlineColor="#7AD7F0"
                                placeholderTextColor={'white'}
                                onChangeText={text => {
                                    this.props.updateForFirstTime(text);
                                }}
                                value={this.props.state.task.inputText}
                            />

                            {this.props.state.task.inputText.length !== 0 && (
                                <Pressable
                                    onPress={() => {
                                        this.props.updateForSecondTimeForWorkTask({
                                            inputText: '',
                                            listOfWorkTasks: [
                                                ...this.props.state.task.listOfWorkTasks,

                                                {
                                                    taskText: this.props.state.task.taskText,
                                                    typeOfTask: 'all',
                                                    checkBoxValue: false,
                                                    pressTheTaskForFirstTime: false,
                                                    fromView: false,
                                                    nameOfTask: '??????????',
                                                    id: null,
                                                    dateString: '',
                                                    isLongPressed: false,
                                                },
                                            ],
                                            listOfTasks: [
                                                ...this.props.state.task.listOfTasks,

                                                {
                                                    taskText: this.props.state.task.taskText,
                                                    typeOfTask: 'all',
                                                    checkBoxValue: false,
                                                    pressTheTaskForFirstTime: false,
                                                    fromView: false,
                                                    nameOfTask: '??????????',
                                                    id: null,
                                                    dateString: '',
                                                    isLongPressed: false,
                                                },
                                            ],
                                        });
                                        this.props.changeSearchMode(false);
                                        this.setState({ inputText: '' });
                                        this.updateHeaderOnPress();
                                        this.props.changeTextInSearchCaseForWorkScreen({ inputTextFromRootOrWork: "" });
                                        Snackbar.show({
                                            text: '???? ?????????? ????????',
                                            duration: Snackbar.LENGTH_LONG,
                                            textColor: 'white',
                                            backgroundColor: '#494848',
                                        });
                                    }}>
                                    <Icons name="check" color={'white'} size={hp('4%')} />
                                </Pressable>
                            )}
                        </View>
                    )}
                    {this.state.visible && this.state.checkSquareButtonPressed && (
                        <View>
                            <Dialog.Container
                                visible={this.state.visible}
                                onBackdropPress={() => {
                                    this.setState({ visible: false });
                                }}>
                                <Dialog.Title style={styles.dialogText}>
                                    ???? ?????? ????????????
                                </Dialog.Title>
                                <View style={{ height: hp('1%') }}></View>
                                <Dialog.Title style={styles.dialogTextOne}>
                                    ?????????? ???????????? ?????????? ????????????
                                </Dialog.Title>

                                <Dialog.Button
                                    label="??????????"
                                    color={'#64b7f6'}
                                    onPress={() => {
                                        this.setState({
                                            visible: false,
                                            checkSquareButtonPressed: false,
                                        });
                                    }}
                                    style={styles.dialogButton}
                                />
                                <Dialog.Button
                                    label="?????? "
                                    color={'#64b7f6'}
                                    style={styles.dialogButton}
                                    onPress={() => {
                                        let filteredList = this.props.state.task.listOfTasks.filter(
                                            element => {
                                                return element.nameOfTask === '??????????';
                                            },
                                        );
                                        let finalList = [];

                                        for (
                                            let i = 0, j = 0;
                                            i < this.props.state.task.listOfTasks.length;
                                            i++
                                        ) {
                                            if (
                                                this.props.state.task.listOfTasks[i].nameOfTask !==
                                                '??????????'
                                            ) {
                                                finalList.push(this.props.state.task.listOfTasks[i]);
                                            } else {
                                                if (j < this.props.state.task.listOfWorkTasks.length) {
                                                    if (
                                                        filteredList[j].typeOfTask ===
                                                        this.props.state.task.listOfWorkTasks[j].typeOfTask
                                                    ) {
                                                        finalList.push(this.props.state.task.listOfTasks[i]);
                                                    }
                                                }

                                                j++;
                                            }
                                        }

                                        this.props.changeTaskTypeForWorkTask({
                                            listOfTasks: finalList,
                                            selectedNotesIndexsList:
                                                this.props.state.task.selectedNotesIndexsList,
                                            isLongPressed: false,
                                        });
                                        this.setState({
                                            visible: false,
                                            checkSquareButtonPressed: false,
                                        });
                                        this.updateHeaderOnPress();
                                        setTimeout(() => {
                                            Snackbar.show({
                                                text: '???????? ????????????',
                                                duration: Snackbar.LENGTH_LONG,
                                                textColor: 'white',
                                                backgroundColor: '#494848',
                                            });
                                        }, 1000);
                                    }}
                                />
                            </Dialog.Container>
                        </View>
                    )}

                    {this.state.visible && this.state.trashButtonPressed && (
                        <View>
                            <Dialog.Container
                                visible={this.state.visible}
                                onBackdropPress={() => {
                                    this.setState({ visible: false });
                                }}>
                                <Dialog.Title style={styles.dialogText}>
                                    ???? ?????? ????????????
                                </Dialog.Title>
                                <Dialog.Title style={styles.dialogTextOne}>
                                    ?????? ??????????????
                                </Dialog.Title>

                                <Dialog.Button
                                    label="??????????"
                                    color={'#64b7f6'}
                                    onPress={() => {
                                        this.setState({ visible: false, trashButtonPressed: false });
                                    }}
                                    style={styles.dialogButton}
                                />
                                <Dialog.Button
                                    label="?????? "
                                    color={'#64b7f6'}
                                    style={styles.dialogButton}
                                    onPress={() => {
                                        let filteredList = this.props.state.task.listOfTasks.filter(
                                            element => {
                                                return element.nameOfTask === '??????????';
                                            },
                                        );
                                        let finalList = [];

                                        for (
                                            let i = 0, j = 0;
                                            i < this.props.state.task.listOfTasks.length;
                                            i++
                                        ) {
                                            if (
                                                this.props.state.task.listOfTasks[i].nameOfTask !==
                                                '??????????'
                                            ) {
                                                finalList.push(this.props.state.task.listOfTasks[i]);
                                            } else {
                                                if (j < this.props.state.task.listOfWorkTasks.length) {
                                                    if (
                                                        filteredList[j].typeOfTask ===
                                                        this.props.state.task.listOfWorkTasks[j].typeOfTask
                                                    ) {
                                                        finalList.push(this.props.state.task.listOfTasks[i]);
                                                    }
                                                }

                                                j++;
                                            }
                                        }

                                        let workDeletedTasks =
                                            this.props.state.task.listOfWorkTasks.filter(element => {
                                                return element.typeOfTask !== 'finished';
                                            });

                                        this.props.deleteTasksForWorkTask({
                                            listOfWorkTasks: workDeletedTasks,
                                            listOfTasks: finalList,
                                            selectedNotesIndexsList: [],
                                            isLongPressed: false,
                                        });
                                        this.updateHeaderOnPress();
                                        this.setState({ visible: false, trashButtonPressed: false });
                                        setTimeout(() => {
                                            Snackbar.show({
                                                text: '???????? ????????????',
                                                duration: Snackbar.LENGTH_LONG,
                                                textColor: 'white',
                                                backgroundColor: '#494848',
                                            });
                                        }, 1000);
                                    }}
                                />
                            </Dialog.Container>
                        </View>
                    )}
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}
const mapDispatchToProps = {
    changeTextInSearchCaseForWorkScreen,
    changeDrawerCondition,
    deleteTasksForWorkTask,
    changeTaskTypeForWorkTask,
    updateForSecondTimeForWorkTask,
    changeCheckBoxForWorkTask,
    changeCheckBoxValueForWorkTask,
    changeCheckBoxOnLongPressForWorkTask,
    changeCheckBoxValueOnLongPressForWorkTask,
    changeViewConditionOnPressForWorkTask,
    changeTaskTypeOnLongPressForWorkTask,
    changeTaskPressConditionForWorkTask,
    changeIsLongPressForWorkScreen,
    changeListOfTasks,
    changeSearchMode,
    updateForFirstTime,
    updateForSecondTime,
    updateForThirdTime,
    updateForFourthTime,
    updateForFifthTime,
    updateForSixTime,
    updateForSevenTime,
    updateForEightTime,
    changeTaskType,
    changeTaskTypeOnLongPress,
    changeTaskTypeOnPress,
    changeTaskPressCondition,
    changeNameOfTask,
    changeViewConditionOnPress,
    changeTextInputString,
    changeDropDownValue,
    clearTextInputAndDateString,
};



export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen);


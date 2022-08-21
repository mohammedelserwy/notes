import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Image,
    Alert,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import Dialog from 'react-native-dialog';
import { TextInput, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../Styles.js';
import {
    addTaskToListOfTasksAndListOfShopTasks,
    addTaskToListOfTasksAndListOfPersonalTasks,
    addTaskToListOfTasksAndListOfWorkTasks,
    addTaskToListOfTasks,
    editListOfPersonalTasksAndPushItToWorkAndAllTaskScreens,
    editWorkTaskToShopAndPushItToTasksScreen,
    pushTaskToFinishedTasksScreenFromAllTaskScreen,
    changeTaskTextOfListOfShopTasksForEditing,
    pushShopTaskToFinishedTasksScreen,
    pushTaskToTasksScreen,
    changeTaskBoxValue,
    changeTaskTextOfListOfTasks,
    changeTextInputString,
    changeCheckBox,
    changeCheckBoxValue,
    changeSearchMode,
    pushTaskToFinishedTasksScreen,
    changeDateInputString,
    changeTaskTextOfListOfFinishedTasks,
    changeDateInputStringForFinishedTasks,
    changeDate,
    clearTextInputAndDateString,
    changeDropDownValue,
    pushTaskToTasksScreenAndShopScreen,
    changeNameOfTaskFromDropDownMenu,
    changeTaskTextOfListOfShopTasks,
    changeTaskTextOfListOfTasksForEditing,
    changeTaskTextOfListOfPersonalTasksForEditing,
    changeTaskTextOfListOfPersonalTasks,
    pushPersonalTaskToFinishedTasksScreenFromAllTaskScreen,
    pushTaskToTasksScreenAndPersonalScreen,
    changeTaskTextOfListOfShopTasksForEditingForPersonalScreen,
    editShopTaskToPersonalAndPushItToFinishesTasksScreen,
    editTaskTextOfListOfPersonalTasks,
    pushPersonalTaskToFinishedTasksScreen,
    changeTaskTextOfListOfPersonalTasksForEditingForShopScreen,
    editPersonalTaskToShopAndPushItToFinishesTasksScreen,
    editShopTaskToPersonalAndPushItToTasksScreen,
    editPersonalTaskToShopAndPushItToTasksScreen,
    editWorkTaskToPersonalAndPushItToTasksScreen,
    changeTaskTextOfListOfWorkTasksForEditing,
    changeTaskTextOfListOfWorkTasks,
    editPersonalTaskToWorkAndPushItToTasksScreen,
    editShopTaskToWorkAndPushItToTasksScreen,
    pushWorkTaskToFinishedTasksScreenFromAllTaskScreen,
    editListOfShopTasksAndPushItToPersonalAndAllTaskScreens,
    editListOfShopTasksAndPushItToWorkAndAllTaskScreens,
    editListOfPersonalTasksAndPushItToShopAndAllTaskScreens,
    editListOfShopTasks,
    editListOfWorkTasksAndPushItToShopAndAllTaskScreens,
    editListOfWorkTasksAndPushItToPersonalAndAllTaskScreens,
    editTaskTextOfListOfWorkTasks,
    pushWorkTaskToFinishedTasksScreen,
    editWorkTaskToShopAndPushItToFinishesTasksScreen,
    editWorkTaskToPersonalAndPushItToFinishesTasksScreen,
    editShopTaskToWorkAndPushItToFinishesTasksScreen,
    editPersonalTaskToWorkAndPushItToFinishesTasksScreen,
    pushTaskToTasksScreenAndWorkScreen,
} from '../store/slice';
import Snackbar from 'react-native-snackbar';
import DatePicker from 'react-native-date-picker';
import 'moment/locale/ar';
const data = [
    { label: 'التسوق', value: '1' },
    { label: 'الشخصيه', value: '2' },
    { label: 'العمل', value: '3' },
];

class EditMainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDownValue: null,

            open: false,
            date: new Date(),
        };
    }

    render() {

        return (

            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={styles.rootScreenForEditScreen}>
                    <View style={styles.firstViewForEditScreen}>
                        <View style={styles.textInputViewForEditScreen}>
                            <View style={styles.textView}>
                                <Text style={styles.text}> ما الذى يجب عمله؟</Text>
                            </View>
                            <TextInput
                                theme={{
                                    colors: {
                                        text: 'white',
                                    },
                                }}
                                underlineColor="white"
                                style={styles.textInput}
                                selectionColor="#7AD7F0"
                                activeUnderlineColor="#7AD7F0"
                                placeholderTextColor={'white'}
                                placeholder={'ادخل هنا مهمه'}
                                value={this.props.state.task.textInputString}
                                onChangeText={text => {
                                    this.props.changeTextInputString({
                                        textInput: text,
                                    });
                                }}
                            />
                        </View>

                        <View style={styles.checkBoxView}>
                            <CheckBox
                                onValueChange={value => {
                                    this.props.changeTaskBoxValue(value);
                                }}
                                value={this.props.state.task.checkBoxValue}
                                disabled={false}
                                tintColors={{ true: '#00acdf', false: 'white' }}
                            />
                            <Text
                                style={
                                    this.props.state.task.checkBoxValue === false
                                        ? {
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: hp('2.4%'),
                                        }
                                        : {
                                            color: '#00acdf',
                                            fontWeight: 'bold',
                                            fontSize: hp('2.4%'),
                                        }
                                }>
                                {this.props.state.task.checkBoxValue
                                    ? 'أنهى المهمه !'
                                    : 'أنهى المهمه؟'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.spacerView}></View>

                    <View style={styles.secondViewForEditScreen}>
                        <View style={styles.textViewOne}>
                            <Text style={styles.text}> الموعد النهائى</Text>
                        </View>
                        <View style={styles.dateView}>
                            <View style={styles.dateViewContainer}>
                                <View style={styles.containerView}>
                                    <Pressable
                                        style={styles.pressableText}
                                        onPress={() => {
                                            this.setState({ open: true });
                                        }}>
                                        <Text style={styles.dateViewContainerText}>
                                            {this.props.state.task.dateString === ''
                                                ? 'تاريخ لم يحدد بعد'
                                                : this.props.state.task.dateString}
                                        </Text>
                                    </Pressable>

                                    <View
                                        style={
                                            this.props.state.task.dateString === ''
                                                ? {
                                                    width: '100%',
                                                    height: hp('.3%'),

                                                    backgroundColor: 'white',
                                                }
                                                : {
                                                    width: '100%',
                                                    height: hp('.3%'),

                                                    backgroundColor: '#7AD7F0',
                                                }
                                        }></View>
                                </View>

                                <Pressable
                                    onPress={() => {
                                        this.setState({ open: true });
                                    }}
                                    style={
                                        this.props.state.task.dateString === ''
                                            ? {
                                                marginLeft: wp('2%'),

                                                marginRight: wp('13%'),
                                            }
                                            : {
                                                marginLeft: wp('3%'),

                                                marginRight: wp('5%'),
                                            }
                                    }>
                                    <Entypo color={'white'} name={'calendar'} size={hp('2.8%')} />

                                    <View style={{ height: hp('.4%') }}></View>
                                </Pressable>
                                {this.props.state.task.dateString !== '' && (
                                    <Pressable
                                        onPress={() => {
                                            this.props.changeDate('');
                                        }}
                                        style={
                                            this.props.state.task.dateString === ''
                                                ? {
                                                    backgroundColor: 'white',
                                                    height: hp('2.6%'),
                                                    width: hp('2.6%'),
                                                    borderRadius: hp('1.3%'),
                                                }
                                                : {
                                                    marginRight: wp('9%'),
                                                    backgroundColor: 'white',
                                                    height: hp('3%'),
                                                    width: hp('3%'),
                                                    borderRadius: hp('1.5%'),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }
                                        }>
                                        <AntDesign
                                            color="#072A6C"
                                            name={'close'}
                                            size={hp('1.8%')}
                                        />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.spacerView}></View>

                    <View style={styles.thirdView}>
                        <View style={styles.textViewOne}>
                            <Text style={styles.text}> أضف الى قائمة</Text>
                        </View>

                        <View style={styles.rowView}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholder={''}
                                selectedTextStyle={styles.selectedTextStyle}
                                search={false}
                                data={data}
                                dropdownPosition={'bottom'}
                                activeColor={'#64b7f6'}
                                labelField="label"
                                valueField="value"
                                value={this.props.state.task.dropDownValue}
                                onChange={item => {
                                    this.props.changeDropDownValue({
                                        dropDownValue: item.value,
                                        nameOfTask: item.label,
                                    });
                                }}
                                renderRightIcon={() => (
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        size={hp('4%')}
                                        color={'white'}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <FAB
                        color={'#0197f6'}
                        small={false}
                        icon="check"
                        style={styles.fabForEditScreen}
                        onPress={() => {

                            /*---------------------------------------------------------------------------*/
                            //floatingFromDrawer
                            if (

                                this.props.state.task.fromDrawer
                            ) {
                                if (

                                    this.props.state.task.textInputString === ''
                                ) {

                                    Snackbar.show({
                                        text: 'ادخل المهمه فى البدايه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                                else if (
                                    this.props.state.task.nameOfTask === '' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'التسوق' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfShopTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'الشخصيه' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfPersonalTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'العمل' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfWorkTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                            }



                            /*---------------------------------------------------------------*/

                            //floatingButtonFromMainScreen




                            else if (
                                this.props.state.task.fromFAB &&
                                this.props.state.task.fromView &&
                                this.props.state.task.fromDrawer === false
                            ) {
                                if (

                                    this.props.state.task.textInputString === ''
                                ) {

                                    Snackbar.show({
                                        text: 'ادخل المهمه فى البدايه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                                else if (
                                    this.props.state.task.nameOfTask === '' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'التسوق' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfShopTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'الشخصيه' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfPersonalTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'العمل' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfWorkTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                            }
                            /*-------------------------------------------------------*/
                            //floatingFromShopScreen
                            else if (
                                this.props.state.task.fromFAB &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.fromDrawer === false
                            ) {
                                if (

                                    this.props.state.task.textInputString === ''
                                ) {

                                    Snackbar.show({
                                        text: 'ادخل المهمه فى البدايه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                                else if (
                                    this.props.state.task.nameOfTask === 'التسوق' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfShopTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'الشخصيه' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfPersonalTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'العمل' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfWorkTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                            }
                            /*------------------------------------------------------------------------------*/
                            //floatingFromPersonalScreen
                            else if (
                                this.props.state.task.fromFAB &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.fromDrawer === false
                            ) {
                                if (

                                    this.props.state.task.textInputString === ''
                                ) {

                                    Snackbar.show({
                                        text: 'ادخل المهمه فى البدايه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                                else if (
                                    this.props.state.task.nameOfTask === 'التسوق' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfShopTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'الشخصيه' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfPersonalTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'العمل' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfWorkTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                            }
                            /*------------------------------------------------------------------------------*/
                            //floatingFromWorkScreen
                            else if (
                                this.props.state.task.fromFAB &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.fromDrawer === false
                            ) {
                                if (

                                    this.props.state.task.textInputString === ''
                                ) {

                                    Snackbar.show({
                                        text: 'ادخل المهمه فى البدايه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                                else if (
                                    this.props.state.task.nameOfTask === 'التسوق' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfShopTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'الشخصيه' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfPersonalTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                } else if (
                                    this.props.state.task.nameOfTask === 'العمل' &&
                                    this.props.state.task.textInputString !== ''
                                ) {
                                    this.props.addTaskToListOfTasksAndListOfWorkTasks({
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: 'تم اضافة مهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });

                                }
                            }

                            /*--------------------------------------------------------------------------*/
                            //  fromView

                            else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .dateString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .taskText !== this.props.state.task.textInputString)
                            ) {
                                this.props.changeTaskTextOfListOfTasks({
                                    id: this.props.state.task.id,
                                    nameOfTask: '',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false &&
                                this.props.state.task.listOfTasks[this.props.state.task.id]
                                    .nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString === '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                Snackbar.show({
                                    text: 'ادخل التعديلات على المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushTaskToFinishedTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,

                                    dateString: this.props.state.task.dateString,
                                    nameOfTask: '',
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .dateString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask !== this.props.state.task.nameOfTask)
                            ) {
                                if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'التسوق'
                                ) {
                                    this.props.changeTaskTextOfListOfTasksForEditing({
                                        nameOfTask: 'التسوق',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === ''
                                ) {
                                    this.props.changeTaskTextOfListOfShopTasks({
                                        nameOfTask: 'التسوق',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'الشخصيه'
                                ) {
                                    this.props.editPersonalTaskToShopAndPushItToTasksScreen({
                                        nameOfTask: 'التسوق',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'العمل'
                                ) {
                                    this.props.editWorkTaskToShopAndPushItToTasksScreen({
                                        nameOfTask: 'التسوق',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                }
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushTaskToFinishedTasksScreenFromAllTaskScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'التسوق',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }
                            if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .dateString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask !== this.props.state.task.nameOfTask)
                            ) {
                                if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'الشخصيه'
                                ) {
                                    this.props.changeTaskTextOfListOfPersonalTasksForEditing({
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === ''
                                ) {
                                    this.props.changeTaskTextOfListOfPersonalTasks({
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'التسوق'
                                ) {
                                    this.props.editShopTaskToPersonalAndPushItToTasksScreen({
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'العمل'
                                ) {
                                    this.props.editWorkTaskToPersonalAndPushItToTasksScreen({
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                }
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushPersonalTaskToFinishedTasksScreenFromAllTaskScreen(
                                    {
                                        taskText: this.props.state.task.textInputString,
                                        id: this.props.state.task.id,
                                        typeOfTask: 'finished',
                                        checkBoxValue: true,
                                        nameOfTask: 'الشخصيه',
                                        dateString: this.props.state.task.dateString,
                                    },
                                );

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }
                            if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .dateString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask !== this.props.state.task.nameOfTask)
                            ) {
                                if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'العمل'
                                ) {
                                    this.props.changeTaskTextOfListOfWorkTasksForEditing({
                                        nameOfTask: 'العمل',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === ''
                                ) {
                                    this.props.changeTaskTextOfListOfWorkTasks({
                                        nameOfTask: 'العمل',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'الشخصيه'
                                ) {
                                    this.props.editPersonalTaskToWorkAndPushItToTasksScreen({
                                        nameOfTask: 'العمل',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                } else if (
                                    this.props.state.task.listOfTasks[this.props.state.task.id]
                                        .nameOfTask === 'التسوق'
                                ) {
                                    this.props.editShopTaskToWorkAndPushItToTasksScreen({
                                        nameOfTask: 'العمل',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,
                                        id: this.props.state.task.id,
                                    });
                                    this.props.navigation.navigate('جميع القوائم');
                                    Snackbar.show({
                                        text: ' حفظ المهمه',
                                        duration: Snackbar.LENGTH_LONG,
                                        textColor: 'white',
                                        backgroundColor: '#494848',
                                    });
                                }
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromView &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushWorkTaskToFinishedTasksScreenFromAllTaskScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'العمل',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            /*-------------------------------------------------------------------------*/
                            // fromShop
                            if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfShopTasksAndPushItToPersonalAndAllTaskScreens(
                                    {
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    },
                                );
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfShopTasksAndPushItToWorkAndAllTaskScreens({
                                    nameOfTask: 'العمل',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,

                                    id: this.props.state.task.id,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                (this.props.state.task.listOfShopTasks[this.props.state.task.id]
                                    .taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfShopTasks[
                                        this.props.state.task.id
                                    ].dateString !== this.props.state.task.dateString) &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfShopTasks({
                                    nameOfTask: 'التسوق',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,

                                    id: this.props.state.task.id,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfShopTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfShopTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString === '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                Snackbar.show({
                                    text: 'ادخل التعديلات على المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushShopTaskToFinishedTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'التسوق',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editShopTaskToPersonalAndPushItToFinishesTasksScreen(
                                    {
                                        taskText: this.props.state.task.textInputString,
                                        id: this.props.state.task.id,
                                        typeOfTask: 'finished',
                                        checkBoxValue: true,
                                        nameOfTask: 'الشخصيه',
                                        dateString: this.props.state.task.dateString,
                                    },
                                );

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromShopScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editShopTaskToWorkAndPushItToFinishesTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'العمل',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            /*-----------------------------------------------------------------*/
                            //fromPersonal

                            if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfPersonalTasksAndPushItToShopAndAllTaskScreens(
                                    {
                                        nameOfTask: 'التسوق',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    },
                                );
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfPersonalTasksAndPushItToWorkAndAllTaskScreens(
                                    {
                                        nameOfTask: 'العمل',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    },
                                );
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }
                            if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfPersonalTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfPersonalTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString)
                            ) {
                                this.props.editTaskTextOfListOfPersonalTasks({
                                    nameOfTask: 'الشخصيه',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,

                                    id: this.props.state.task.id,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfPersonalTasks[
                                    this.props.state.task.id
                                ].taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfPersonalTasks[
                                    this.props.state.task.id
                                ].dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false &&
                                this.props.state.task.nameOfTask ===
                                this.props.state.task.listOfPersonalTasks[
                                    this.props.state.task.id
                                ].nameOfTask
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString === '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                Snackbar.show({
                                    text: 'ادخل التعديلات على المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushPersonalTaskToFinishedTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'الشخصيه',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editPersonalTaskToShopAndPushItToFinishesTasksScreen(
                                    {
                                        taskText: this.props.state.task.textInputString,
                                        id: this.props.state.task.id,
                                        typeOfTask: 'finished',
                                        checkBoxValue: true,
                                        nameOfTask: 'التسوق',
                                        dateString: this.props.state.task.dateString,
                                    },
                                );

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromPersonalScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editPersonalTaskToWorkAndPushItToFinishesTasksScreen(
                                    {
                                        taskText: this.props.state.task.textInputString,
                                        id: this.props.state.task.id,
                                        typeOfTask: 'finished',
                                        checkBoxValue: true,
                                        nameOfTask: 'العمل',
                                        dateString: this.props.state.task.dateString,
                                    },
                                );

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            /*---------------------------------------------------------------------------------------------------------------*/
                            //fromWork
                            if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfWorkTasksAndPushItToShopAndAllTaskScreens({
                                    nameOfTask: 'التسوق',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,

                                    id: this.props.state.task.id,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.editListOfWorkTasksAndPushItToPersonalAndAllTaskScreens(
                                    {
                                        nameOfTask: 'الشخصيه',
                                        taskText: this.props.state.task.textInputString,
                                        dateString: this.props.state.task.dateString,

                                        id: this.props.state.task.id,
                                    },
                                );
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfWorkTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfWorkTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString)
                            ) {
                                this.props.editTaskTextOfListOfWorkTasks({
                                    nameOfTask: 'العمل',
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,

                                    id: this.props.state.task.id,
                                });
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfWorkTasks[this.props.state.task.id]
                                    .taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfWorkTasks[this.props.state.task.id]
                                    .dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.navigation.navigate('جميع القوائم');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString === '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                Snackbar.show({
                                    text: 'ادخل التعديلات على المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.pushWorkTaskToFinishedTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'العمل',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editWorkTaskToShopAndPushItToFinishesTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    id: this.props.state.task.id,
                                    typeOfTask: 'finished',
                                    checkBoxValue: true,
                                    nameOfTask: 'التسوق',
                                    dateString: this.props.state.task.dateString,
                                });

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromWorkScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.editWorkTaskToPersonalAndPushItToFinishesTasksScreen(
                                    {
                                        taskText: this.props.state.task.textInputString,
                                        id: this.props.state.task.id,
                                        typeOfTask: 'finished',
                                        checkBoxValue: true,
                                        nameOfTask: 'الشخصيه',
                                        dateString: this.props.state.task.dateString,
                                    },
                                );

                                this.props.changeTaskBoxValue(false);
                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });

                                this.props.navigation.navigate('جميع القوائم');

                                Snackbar.show({
                                    text: ' حفظ المهمه كمنتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            /*---------------------------------------------------------------------------------------------------*/
                            //fromFinished
                            if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString)
                            ) {
                                this.props.changeTaskTextOfListOfFinishedTasks({
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,
                                });
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue
                            ) {
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].taskText === this.props.state.task.textInputString &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].dateString === this.props.state.task.dateString &&
                                this.props.state.task.checkBoxValue &&
                                this.props.state.task.listOfFinishedTasks[
                                    this.props.state.task.id
                                ].nameOfTask === this.props.state.task.nameOfTask
                            ) {
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: 'لم يتم تعديل المهمه ',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString === '' &&
                                this.props.state.task.checkBoxValue
                            ) {
                                Snackbar.show({
                                    text: 'ادخل التعديلات على المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === '' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.pushTaskToTasksScreen({
                                    taskText: this.props.state.task.textInputString,
                                    nameOfTask: '',
                                    id: this.props.state.task.id,
                                    typeOfTask: 'all',
                                    checkBoxValue: false,

                                    dateString:
                                        this.props.state.task.listOfFinishedTasks[
                                            this.props.state.task.id
                                        ].dateString,
                                });

                                this.props.changeTaskBoxValue(false);

                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });
                                this.props.navigation.navigate('انتهى');

                                Snackbar.show({
                                    text: ' مهمه غير منتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].nameOfTask !== this.props.state.task.nameOfTask)
                            ) {

                                this.props.changeTaskTextOfListOfFinishedTasks({
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,
                                    nameOfTask: this.props.state.task.nameOfTask,
                                });
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'التسوق' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.pushTaskToTasksScreenAndShopScreen({
                                    taskText: this.props.state.task.textInputString,
                                    nameOfTask: 'التسوق',
                                    id: this.props.state.task.id,
                                    typeOfTask: 'all',
                                    checkBoxValue: false,

                                    dateString:
                                        this.props.state.task.listOfFinishedTasks[
                                            this.props.state.task.id
                                        ].dateString,
                                });

                                this.props.changeTaskBoxValue(false);

                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });
                                this.props.navigation.navigate('انتهى');

                                Snackbar.show({
                                    text: ' مهمه غير منتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].nameOfTask !== this.props.state.task.nameOfTask)
                            ) {
                                this.props.changeTaskTextOfListOfFinishedTasks({
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,
                                    nameOfTask: 'الشخصيه',
                                });
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'الشخصيه' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.pushTaskToTasksScreenAndPersonalScreen({
                                    taskText: this.props.state.task.textInputString,
                                    nameOfTask: 'الشخصيه',
                                    id: this.props.state.task.id,
                                    typeOfTask: 'all',
                                    checkBoxValue: false,

                                    dateString:
                                        this.props.state.task.listOfFinishedTasks[
                                            this.props.state.task.id
                                        ].dateString,
                                });

                                this.props.changeTaskBoxValue(false);

                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });
                                this.props.navigation.navigate('انتهى');

                                Snackbar.show({
                                    text: ' مهمه غير منتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue &&
                                (this.props.state.task.dateString !==
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].dateString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].taskText !== this.props.state.task.textInputString ||
                                    this.props.state.task.listOfFinishedTasks[
                                        this.props.state.task.id
                                    ].nameOfTask !== this.props.state.task.nameOfTask)
                            ) {
                                this.props.changeTaskTextOfListOfFinishedTasks({
                                    taskText: this.props.state.task.textInputString,
                                    dateString: this.props.state.task.dateString,
                                    nameOfTask: 'العمل',
                                });
                                this.props.navigation.navigate('انتهى');
                                Snackbar.show({
                                    text: ' حفظ المهمه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            } else if (
                                this.props.state.task.nameOfTask === 'العمل' &&
                                this.props.state.task.fromFAB === false &&
                                this.props.state.task.fromFinishedScreen &&
                                this.props.state.task.textInputString !== '' &&
                                this.props.state.task.checkBoxValue === false
                            ) {
                                this.props.pushTaskToTasksScreenAndWorkScreen({
                                    taskText: this.props.state.task.textInputString,
                                    nameOfTask: 'العمل',
                                    id: this.props.state.task.id,
                                    typeOfTask: 'all',
                                    checkBoxValue: false,

                                    dateString:
                                        this.props.state.task.listOfFinishedTasks[
                                            this.props.state.task.id
                                        ].dateString,
                                });

                                this.props.changeTaskBoxValue(false);

                                this.props.clearTextInputAndDateString({
                                    textInputString: '',
                                    dateString: '',
                                    dropDownValue: '',
                                });
                                this.props.navigation.navigate('انتهى');

                                Snackbar.show({
                                    text: ' مهمه غير منتهيه',
                                    duration: Snackbar.LENGTH_LONG,
                                    textColor: 'white',
                                    backgroundColor: '#494848',
                                });
                            }

                            /*--------------------------------------------------------------------------------------------------*/
                        }}
                    />

                    {this.state.open && (
                        <DatePicker
                            cancelText="الغاء"
                            confirmText="موافق"
                            style={styles.datePicker}
                            title={null}
                            modal
                            locale="ar"
                            open={this.state.open}
                            date={this.state.date}
                            onConfirm={date => {
                                let arabicDateAndTime = moment(date).format(
                                    'dddd Do MMMM  YYYY, h:mm a',
                                );

                                let dateString = arabicDateAndTime;
                                this.setState({
                                    open: false,
                                    date: date,
                                });
                                this.props.changeDate(dateString);
                            }}
                            onCancel={() => {
                                this.setState({ open: false });
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}

const mapDispatchToProps = {
    addTaskToListOfTasksAndListOfShopTasks,
    addTaskToListOfTasksAndListOfPersonalTasks,
    addTaskToListOfTasksAndListOfWorkTasks,
    addTaskToListOfTasks,
    pushTaskToTasksScreenAndWorkScreen,
    editShopTaskToWorkAndPushItToFinishesTasksScreen,
    editWorkTaskToPersonalAndPushItToFinishesTasksScreen,
    editWorkTaskToShopAndPushItToFinishesTasksScreen,
    pushWorkTaskToFinishedTasksScreen,
    editTaskTextOfListOfWorkTasks,
    editListOfWorkTasksAndPushItToPersonalAndAllTaskScreens,
    editListOfWorkTasksAndPushItToShopAndAllTaskScreens,
    editListOfPersonalTasksAndPushItToWorkAndAllTaskScreens,
    editListOfPersonalTasksAndPushItToShopAndAllTaskScreens,
    editListOfShopTasks,
    editListOfShopTasksAndPushItToWorkAndAllTaskScreens,
    pushWorkTaskToFinishedTasksScreenFromAllTaskScreen,
    editShopTaskToWorkAndPushItToTasksScreen,
    editPersonalTaskToWorkAndPushItToTasksScreen,
    changeTaskTextOfListOfWorkTasks,
    changeTaskTextOfListOfWorkTasksForEditing,
    editWorkTaskToPersonalAndPushItToTasksScreen,
    editWorkTaskToShopAndPushItToTasksScreen,
    editPersonalTaskToShopAndPushItToTasksScreen,
    editShopTaskToPersonalAndPushItToTasksScreen,
    editPersonalTaskToShopAndPushItToFinishesTasksScreen,
    changeTaskTextOfListOfPersonalTasksForEditingForShopScreen,
    pushPersonalTaskToFinishedTasksScreen,
    editShopTaskToPersonalAndPushItToFinishesTasksScreen,
    changeTaskTextOfListOfShopTasksForEditingForPersonalScreen,
    changeTaskTextOfListOfTasksForEditing,
    pushTaskToTasksScreenAndPersonalScreen,
    pushPersonalTaskToFinishedTasksScreenFromAllTaskScreen,
    changeTaskTextOfListOfPersonalTasks,
    pushTaskToFinishedTasksScreenFromAllTaskScreen,
    changeTaskTextOfListOfShopTasksForEditing,

    changeTaskTextOfListOfShopTasks,
    pushTaskToTasksScreenAndShopScreen,
    pushShopTaskToFinishedTasksScreen,
    changeTaskTextOfListOfPersonalTasksForEditing,
    changeTaskTextOfListOfTasks,
    changeTextInputString,
    changeCheckBox,
    changeCheckBoxValue,
    changeSearchMode,
    pushTaskToFinishedTasksScreen,
    changeDateInputString,
    changeTaskBoxValue,
    changeTaskTextOfListOfFinishedTasks,
    pushTaskToTasksScreen,
    changeDateInputStringForFinishedTasks,
    changeDate,
    clearTextInputAndDateString,
    changeDropDownValue,
    changeNameOfTaskFromDropDownMenu,
    editTaskTextOfListOfPersonalTasks,
    editListOfShopTasksAndPushItToPersonalAndAllTaskScreens,
    editPersonalTaskToWorkAndPushItToFinishesTasksScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMainScreen);


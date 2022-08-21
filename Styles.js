import React from 'react';
import { StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({

  leftViewForRoot: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,

    paddingHorizontal: wp('4%'),
  },
  leftIcon: {
    marginHorizontal: wp('4%'),
  },

  rootScreen: {
    flex: 1,
    backgroundColor: '#072A6C',
  },
  rootScreenForEditScreen: {
    height: hp("100%"),
    backgroundColor: '#072A6C',
  },
  firstView: {
    flex: 1,
  },
  secondView: {
    backgroundColor: '#64b7f6',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskColor: {
    color: "white",
  },
  dateColor: {
    color: '#64b7f6',
  },

  textInput: {
    backgroundColor: 'transparent',
    fontSize: hp('2.5%'),
    flex: 1,
  },
  taskView: {
    margin: hp('1%'),
    backgroundColor: '#1357a6',

    borderRadius: wp('5%'),

    justifyContent: 'space-between',
    height: hp('8%'),
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('.4%'),
  },
  taskViewOne: {
    width: '100%',
    justifyContent: 'space-between',
    // height: hp('8%'),
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
  },
  taskViewTwo: {
    width: '100%',
    alignItems: 'center',
    // height: hp('8%'),

    paddingHorizontal: wp('4%'),
  },

  taskText: {
    color: 'white',
    backgroundColor: '#1357a6',
    fontSize: hp('2.5%'),
  },
  fab: {
    position: 'absolute',
    margin: hp('2%'),
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  leftView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,

    paddingHorizontal: wp('4%'),
  },
  spacer: {
    width: wp('4%'),
  },
  arrow: {
    marginLeft: wp('4%'),
  },
  dialogButton: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },

  dialogTextOne: {
    color: 'black',
    // fontWeight: "bold",
    fontSize: hp('2.3%'),
  },
  dialogText: {
    color: '#64b7f6',
    fontWeight: 'bold',
    fontSize: hp('3%'),
  },
  iconView: {
    flexDirection: 'row',
  },
  spacerOne: {
    width: wp('3%'),
  },
  textInputView: {
    //backgroundColor: '#64b7f6',

    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  arrowView: {
    flexDirection: 'row',
  },

  /************* */

  taskViewTwoForMainScreen: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',

    paddingHorizontal: wp('4%'),
  },

  /************ */

  taskViewTwoForFinishedScreen: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',

    flexDirection: 'row',

    paddingHorizontal: wp('4%'),
  },

  /*********** */
  //editscreen

  dialogPlaceHolder: {
    fontSize: hp('2.5%'),
  },
  selectedTextStyle: {
    color: 'white',
  },
  addView: {
    width: '30%',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  sizedBox: {
    width: wp('11%'),
  },

  dropdown: {
    height: hp('5%'),

    width: wp('70%'),

    paddingHorizontal: wp('9%'),
  },

  firstViewForEditScreen: {
    marginTop: hp('3%'),
    height: hp('20%'),
  },
  secondViewForEditScreen: {
    marginTop: hp('3%'),
    height: hp('10%'),
  },
  thirdView: {
    marginTop: hp('8%'),
    height: hp('20%'),
  },

  text: {
    color: '#00acdf',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  textView: {
    marginTop: '7.3%',
  },
  textViewOne: {
    marginLeft: wp('5%'),
  },

  textInputViewForEditScreen: {
    marginLeft: wp('5%'),
    marginRight: wp('15%'),
    marginBottom: hp('2%'),

    height: hp('13%'),
  },

  textInputViewTwo: {
    flex: 1,
    marginRight: wp('5.8%'),
  },

  dialogTextInput: {
    fontSize: hp('2.5%'),
  },
  checkBoxView: {
    flexDirection: 'row',
    marginLeft: wp('3.3%'),
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2.4%'),
  },
  dateView: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: wp('5%'),

    marginBottom: hp('2%'),

    height: '78%',

    alignItems: 'center',
    //   backgroundColor: "red",
  },
  timeView: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: wp('5%'),

    marginBottom: hp('2%'),

    height: hp('7%'),

    alignItems: 'flex-end',
  },

  calenderIconView: {
    marginLeft: wp('1%'),

    marginRight: wp('13%'),
  },
  closeIconView: {
    marginRight: wp('5%'),
    backgroundColor: 'white',
    height: hp('2.6%'),
    width: hp('2.6%'),
    borderRadius: hp('1.3%'),
  },
  timeIconView: {
    marginRight: wp('1%'),
  },
  rowView: {
    flexDirection: 'row',
  },

  fabForEditScreen: {
    position: 'absolute',
    margin: hp('2%'),
    right: 0,
    bottom: hp('10%'),
    backgroundColor: 'white',
  },
  dateViewContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  dateViewContainerOne: {
    width: '100%',
    height: hp('.3%'),

    backgroundColor: 'white',
  },
  dateViewContainerText: {
    fontSize: hp('2.5%'),

    color: 'white',
  },
  containerView: {
    flex: 1,
  },
  pressableText: {
    width: '100%',
  },
  datePicker: {
    backgroundColor: '#00acdf',
    fontSize: hp('2%'),
  },
  spacerView: {
    height: hp('3%'),
  },
});

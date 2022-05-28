import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () => {

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextbutton, setShowNextButton] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionDisabled(true);
    if(selectedOption == correct_option) {
      setScore(score + 1);
    }

    // Show Next Button
    setShowNextButton(true);
  }

  const renderQuestion = () => {
    return (
      <View>
        {/* Question Counter */}
        <View style={styles.questions}>
          <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{"Question " + currentQuestionIndex + 1}</Text>
          <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/{allQuestions.length}</Text>
        </View>

        <View style={{height: 25}}>
        </View>

        {/* Question */}
        <Text style={{color: COLORS.white, fontSize: 30}}>{allQuestions[currentQuestionIndex]?.question}</Text>
      </View> 
    )
  }

  const renderOptions = () => {
    return (
      <View>
        {
          allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionDisabled}
              key={option}
              style={{
                borderWidth: 1,
                borderColor: option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary + '40',
                backgroundColor: option == correctOption
                ? COLORS.success + '20'
                : option == currentOptionSelected
                  ? COLORS.error + '20'
                  : COLORS.secondary + '20',
                height: 60,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10
              }}>
              <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
              
              {/* Show Check or Cross based on answer */}
              {
                option == correctOption ? (
                  <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.success,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialCommunityIcons name="check" style={{
                      color: COLORS.white,
                      fontSize: 20
                    }} />
                  </View>
                ) : option == currentOptionSelected ?(
                  <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.error,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialCommunityIcons name="close" style={{
                      color: COLORS.white,
                      fontSize: 20
                    }} />
                  </View>
                ) : null
              }
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  const renderNextButton = () => {
    if (showNextbutton) {
      return (
        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', marginTop: 20, width: '30%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white, textAlign: 'center'}}>Next</Text>
          <MaterialCommunityIcons style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white, textAlign: 'center'}} name='chevron-right'/>
        </TouchableOpacity>
      )
    }
    else {
      return null;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.primary} />
      <View style={styles.mainView}>

        {/* ProgressBar */}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

      </View>
    </SafeAreaView>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  mainView: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  questions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})
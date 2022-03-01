import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Quiz = () => {

  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const renderQuestion = () => {
    return (
      <View>
        {/* Question Counter */}
        <View style={styles.questions}>
          <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex + 1}</Text>
          <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/{allQuestions.length}</Text>
        </View>

        {/* Question */}
        <Text style={{color: COLORS.white, fontSize: 30}}>{allQuestions[currentQuestionIndex]?.question}</Text>
      </View> 
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.primary} />
      <View style={styles.mainView}>

        {/* ProgressBar */}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}

        {/* Next Button */}

      </View>
    </SafeAreaView>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    flex: 1
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
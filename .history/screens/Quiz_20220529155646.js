import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, Modal } from 'react-native';
import { COLORS } from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () => {

  const [optionsArray, setoptionsArray] = useState([]);
  const allQuestions = optionsArray;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextbutton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, 20],
    outputRange: ['0%', '100%']
  });

  useEffect(() => {
      const optionsListResp = async () => {
        await axios.get('https://the-trivia-api.com/api/questions?limit=20&region=FR')
        .then(
          response => setoptionsArray(response.data))
      }
      optionsListResp();
    }, []);

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

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      setShowScoreModal(true);
    }
    else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const renderQuestion = () => {
    return (
      <View>
        {/* Question Counter */}
        <View style={styles.questions}>
          <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{"Question " + (currentQuestionIndex+1)}</Text>
          <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6}}>/20</Text>
        </View>

        <View style={{height: 25}}>
        </View>

        {/* Question */}
        <Text style={{ color: COLORS.white, fontSize: 30 }}>{optionsArray['question']}</Text>
        
        <View style={{height: 10}}>
        </View>
      </View> 
    )
  }

  const renderOptions = () => {
    return (
      <View>
        {
          allQuestions[currentQuestionIndex]?.incorrectAnswers.map(option => (
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
                marginVertical: 10,
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
        <TouchableOpacity
          onPress={handleNext}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 20 }}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white, textAlign: 'center'}}>Next</Text>
          <MaterialCommunityIcons
            style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' }}
            name='chevron-right'
          />
        </TouchableOpacity>
      )
    }
    else {
      return null;
    }
  }

  const renderProgressBar = () => {
    return (
      <View style={{ width: '100%', height: 10, borderRadius: 20, backgroundColor: '#00000020' }}>
        <Animated.View style={[{height: 10, borderRadius: 20, backgroundColor: COLORS.accent}, {width: progressAnim}]}>

        </Animated.View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.primary} />
      <View style={styles.mainView}>

        {/* ProgressBar */}
        {renderProgressBar()}
        
        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}
        
        {/* Score Modal */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={showScoreModal}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: COLORS.white, width: '70%', borderRadius: 20, padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20 }}>
                <Text style={{fontSize: 20, color: COLORS.black, fontWeight: 'bold'}}>Final Score   </Text>
                <Text style={{fontSize: 30, color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error}}>{score}</Text>
                <Text style={{fontSize: 20, color: COLORS.black}}>/{allQuestions.length}</Text>
              </View>
              {/* Restart Quiz */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{ backgroundColor: COLORS.accent, padding: 20, width: '100%', borderRadius: 20 }}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: COLORS.white, fontSize: 20}}>Retry Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
    marginTop: 50
  }
})
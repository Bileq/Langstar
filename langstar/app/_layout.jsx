import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [weeklyStars, setWeeklyStars] = useState(0);
  const [inputs, setInputs] = useState({});
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[currentDayOfWeek]);

  const date = new Date();
  const currentDayOfWeek = date.getDay();
  const currentDayOfMonth = date.getDate();

  useEffect(() => {
    const resetTime = new Date();
    resetTime.setDate(resetTime.getDate() + (1 - resetTime.getDay())); // Next Monday
    resetTime.setHours(0, 0, 0, 0);

    const timeout = resetTime.getTime() - Date.now();
    const timer = setTimeout(() => setWeeklyStars(0), timeout);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (day, value) => {
    const newInputs = {...inputs, [day]: Number(value)};
    setInputs(newInputs);

    const totalStars = Object.values(newInputs).reduce((acc, cur) => acc + cur, 0);
    setWeeklyStars(totalStars);
  };

  const getGrade = (stars) => {
    if (stars >= 30) return 'SS';
    if (stars >= 28) return 'S';
    if (stars >= 25) return 'A';
    if (stars >= 20) return 'B';
    if (stars >= 15) return 'PASS';
    return 'F';
  };

  const starsPerWeek = weeklyStars / (currentDayOfMonth / 7);

  return (
    <View style={styles.container}>
      <View style={styles.dayRow}>
  <Picker
    selectedValue={selectedDay}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
  >
    {daysOfWeek.map((day, index) => (
      <Picker.Item label={day} value={day} key={index} />
    ))}
  </Picker>
  <TextInput
    style={styles.input}
    keyboardType="numeric"
    onChangeText={(text) => handleInputChange(selectedDay, text)}
    value={inputs[selectedDay]?.toString() || ''}
  />
</View>
      <View style={styles.div}>
        <Text>Stars: {weeklyStars} </Text>
        <Text>Grade: {getGrade(weeklyStars)}</Text>
      </View>
      <View style={styles.div}>
        <Text>Average stars weekly: {starsPerWeek.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  div: {
    width: '100%',
    marginBottom: 20,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 50,
    textAlign: 'center',
  },
});

export default App;
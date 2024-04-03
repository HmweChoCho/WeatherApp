import {StyleSheet} from 'react-native';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },

  forecastItem: {
    display: 'flex',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    marginRight: '1rem',
    alignItems: 'center',
    borderRadius: '0.25rem',
    marginTop: 20,
  },
  hourlyForecastItem: {
    display: 'flex',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    marginRight: '1rem',
    alignItems: 'center',
    borderRadius: '0.25rem',
    marginTop: 40,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

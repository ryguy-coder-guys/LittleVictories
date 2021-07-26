import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  bgImg: {
    flex: 1
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#5c83b1'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullScreenView: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20
  },
  section: {
    backgroundColor: '#8ebac6',
    borderRadius: 8,
    marginBottom: 20,
    padding: 20
  }
});

export const imgStyles = StyleSheet.create({
  divider: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15
  },
  logo: {
    resizeMode: 'contain',
    width: '60%',
    height: '50'
  },
  smallIcon: {
    resizeMode: 'contain',
    width: 35,
    height: 35
  }
});

export const inputStyles = StyleSheet.create({
  input: {
    borderRadius: 8,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18
  },
  input_big: {
    borderRadius: 8,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  }
});

export const progBarStyles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: '#3E6592',
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '7%'
  },
  prog_bar: {
    marginLeft: 10,
    marginRight: 10
  },
  txt: {
    color: '#FAFAFA',
    fontSize: 16
  },
  txt_big: {
    color: '#FAFAFA',
    fontSize: 18
  }
});

export const textStyles = StyleSheet.create({
  btnTxt: {
    fontSize: 18,
    color: '#FAFAFA'
  },
  btnTxt_big: {
    fontSize: 20,
    color: '#FAFAFA'
  },
  disabledBtnTxt: {
    fontSize: 18,
    color: '#a3a0a0'
  },
  disabledBtnTxt_big: {
    fontSize: 20,
    color: '#a3a0a0'
  },
  h1: {
    fontSize: 26,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  h1_big: {
    fontSize: 28,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  h2: {
    fontSize: 22,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  h2_big: {
    fontSize: 24,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  h3: {
    fontSize: 20,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  h3_big: {
    fontSize: 22,
    color: '#1D426D',
    fontWeight: 'bold',
    marginBottom: 15
  },
  txt: {
    fontSize: 18,
    color: '#1D426D',
    marginBottom: 10
  },
  txt_big: {
    fontSize: 20,
    color: '#1D426D',
    marginBottom: 10
  }
});

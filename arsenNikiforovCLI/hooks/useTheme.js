// hooks/useTheme.js
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../themes';

const useTheme = () => {
  const theme = useSelector(state => state.theme);
  const colors = theme === 'light' ? lightTheme : darkTheme;
  return colors;
};

export default useTheme;
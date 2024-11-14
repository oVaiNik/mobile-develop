import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

export const ThemedText = ({style, ...props}) => {
  const theme = useSelector(state => state.theme);

  return (
    <Text
      style={[
        {
          color: theme === 'light' ? '#000' : '#FFF',
        },
        style,
      ]}
      {...props}
    />
  );
};

export const TitleText = ({style, ...props}) => (
  <ThemedText
    style={[
      {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      style,
    ]}
    {...props}
  />
);

export const InfoText = ({style, ...props}) => (
  <ThemedText
    style={[
      {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
      },
      style,
    ]}
    {...props}
  />
);

export default ThemedText;

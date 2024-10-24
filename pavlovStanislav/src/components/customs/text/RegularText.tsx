import React from 'react'
import {Text} from 'react-native'
import {CustomText} from '../../../constants/types'

const RegularText: React.FC<CustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-Regular'}]}>{children}</Text>
  )
}

export default RegularText

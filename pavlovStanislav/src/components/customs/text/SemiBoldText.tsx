import React from 'react'
import {Text} from 'react-native'
import {CustomText} from '../../../constants/types'

const SemiBoldText: React.FC<CustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-SemiBold'}]}>{children}</Text>
  )
}

export default SemiBoldText

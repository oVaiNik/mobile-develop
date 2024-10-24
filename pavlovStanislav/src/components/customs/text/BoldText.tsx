import React from 'react'
import {Text} from 'react-native'
import {CustomText} from '../../../constants/types'

const BoldText: React.FC<CustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-Bold'}]}>{children}</Text>
  )
}

export default BoldText

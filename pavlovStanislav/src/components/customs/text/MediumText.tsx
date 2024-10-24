import React from 'react'
import {Text} from 'react-native'
import {CustomText} from '../../../constants/types'

const MediumText: React.FC<CustomText> = ({style, children}) => {
  return (
    <Text style={[style, {fontFamily: 'Montserrat-Medium'}]}>{children}</Text>
  )
}

export default MediumText

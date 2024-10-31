import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {api} from '../api/api'
import {CryptoCurrency} from '../interfaces/cryptocurrency.interface'
import BoldText from '../components/customs/text/BoldText'
import RegularText from '../components/customs/text/RegularText'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
})

const Lab2: React.FC = () => {
  const getCryptocurrencyData = () => {
    api.getCryptocurrencyData().then(response => {
      console.log(response)
      setCryptocurrencyData(response)
    })
  }

  const [cryptocurrencyData, setCryptocurrencyData] = useState<
    CryptoCurrency[]
  >([])
  useEffect(getCryptocurrencyData, [])

  return (
    <View style={[styles.container]}>
      <ScrollView style={[styles.scrollContainer]}>
        {cryptocurrencyData.map(cryptocurrency => {
          return (
            <View>
              <BoldText>{cryptocurrency.name}</BoldText>
              <RegularText>{cryptocurrency.priceUsd} USD</RegularText>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Lab2

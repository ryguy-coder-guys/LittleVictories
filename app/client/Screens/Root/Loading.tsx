import React, { ReactElement } from 'react';
import { ImageBackground, Text } from 'react-native';
import { useQuoteContext } from '../../Contexts/quoteContext';
import bgImage from '../../../assets/images/blue-gradient.png';
import { containerStyles, textStyles } from '../../Stylesheets/Stylesheet';

const Loading = (): ReactElement => {
  interface QuoteInterface {
    quote: string;
    author: string;
  }
  const { quote, author }: QuoteInterface = useQuoteContext();

  return (
    <ImageBackground
      style={[containerStyles.bgImg, { justifyContent: 'center' }]}
      source={bgImage}
    >
      <Text style={[textStyles.loading_txt, { fontWeight: 'bold' }]}>
        &quot;{quote.trim()}&quot;
      </Text>
      <Text style={textStyles.loading_txt}>{author.trim()}</Text>
    </ImageBackground>
  );
};

export default Loading;

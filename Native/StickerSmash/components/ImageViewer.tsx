import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
  selectedFrame?: ImageSource;
};

export default function ImageViewer({ imgSource, selectedImage, selectedFrame }: Props) {
  const imageSource = imgSource;
  return <Image source={selectedFrame || imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

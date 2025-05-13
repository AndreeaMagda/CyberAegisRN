import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const scale = Math.min(width, height) / 375; // Use 375 as base width (iPhone standard)
const responsiveSize = (size: number) => Math.round(size * scale);

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingTop: responsiveSize(10),
    },
    content: {
      padding: responsiveSize(16),
      flexGrow: 1,
    },
    title: {
      fontSize: responsiveSize(22),
      fontWeight: 'bold',
      color: '#333',
      marginBottom: responsiveSize(8),
      flexWrap: 'wrap',
      paddingHorizontal: responsiveSize(4),
    },
    description: {
      fontSize: responsiveSize(16),
      color: '#666',
      marginBottom: responsiveSize(20),
      flexWrap: 'wrap',
      paddingHorizontal: responsiveSize(4),
    },
    section: {
      backgroundColor: '#fff',
      padding: responsiveSize(16),
      borderRadius: responsiveSize(8),
      marginBottom: responsiveSize(16),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexShrink: 1,
    },
    sectionTitle: {
      fontSize: responsiveSize(18),
      fontWeight: '600',
      color: '#444',
      marginBottom: responsiveSize(12),
      flexWrap: 'wrap',
    },
    sectionText: {
      fontSize: responsiveSize(16),
      color: '#666',
      lineHeight: responsiveSize(24),
      marginBottom: responsiveSize(8),
      flexWrap: 'wrap',
    },
    imageContainer: {
      width: '100%',
      height: height * 0.25, // 25% din înălțimea ecranului
      marginVertical: responsiveSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    sectionTextWrapper: {
      marginBottom: 8,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
});
  
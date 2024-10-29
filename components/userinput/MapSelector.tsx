import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

const MapSelector = ({ floor, onPositionSelect }) => {
  const [selectedPosition, setSelectedPosition] = React.useState(null);
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [loading, setLoading] = React.useState(true);

  const screenWidth = Dimensions.get('window').width;

  const getMapSource = (floor) => {
    try {
      switch(floor) {
        case '3':
          return require('../../assets/maps/floor3.png');
        case '2':
          return require('../../assets/maps/floor2.jpg');
        case '1':
            return require('../../assets/maps/floor1.png');
        default:
          return require('../../assets/maps/floor0.png');
      }
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  };

  React.useEffect(() => {
    const source = getMapSource(floor);
    if (source) {
      const imageAsset = Image.resolveAssetSource(source);
      if (imageAsset) {
        const aspectRatio = imageAsset.width / imageAsset.height;
        const containerWidth = screenWidth;
        const calculatedHeight = containerWidth / aspectRatio;

        setImageSize({
          width: containerWidth,
          height: calculatedHeight,
          originalWidth: imageAsset.width,
          originalHeight: imageAsset.height,
        });
        setLoading(false);
      } else {
        console.error('Could not resolve image asset');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [floor]);

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    
    const scaleX = imageSize.originalWidth / imageSize.width;
    const scaleY = imageSize.originalHeight / imageSize.height;

    const position = {
      x: Math.round(locationX * scaleX),
      y: Math.round(locationY * scaleY)
    };

    setSelectedPosition(position);
    onPositionSelect(position);
    console.log('Selected position:', position);
    console.log('Image dimensions:', imageSize);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (!imageSize.width) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading map image</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Position on Floor {floor}</Text>
      
      <View style={styles.mapOuterContainer}>
        <TouchableOpacity 
          onPress={handlePress} 
          activeOpacity={0.9}
          style={[
            styles.imageContainer,
            {
              width: imageSize.width,
              height: imageSize.height,
            }
          ]}
        >
          <Image
            source={getMapSource(floor)}
            style={[
              styles.map,
              {
                width: imageSize.width,
                height: imageSize.height,
              }
            ]}
            resizeMode="contain"
          />
          {selectedPosition && (
            <View 
              style={[
                styles.marker,
                {
                  left: (selectedPosition.x / imageSize.originalWidth) * imageSize.width - 10,
                  top: (selectedPosition.y / imageSize.originalHeight) * imageSize.height - 10,
                }
              ]}
            />
          )}
        </TouchableOpacity>
      </View>

      {selectedPosition && (
        <View style={styles.positionInfo}>
          <Text>Selected Position - X: {selectedPosition.x}, Y: {selectedPosition.y}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  mapOuterContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  map: {
    backgroundColor: '#fff',
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  positionInfo: {
    margin: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  }
});

export default MapSelector;
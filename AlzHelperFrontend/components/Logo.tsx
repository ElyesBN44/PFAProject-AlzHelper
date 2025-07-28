import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../utils/sharedStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showSubtitle?: boolean;
  centered?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showSubtitle = true, 
  centered = true 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          logoSize: 32,
          titleSize: 18,
          subtitleSize: 12,
        };
      case 'large':
        return {
          logoSize: 80,
          titleSize: 32,
          subtitleSize: 16,
        };
      default: // medium
        return {
          logoSize: 48,
          titleSize: 24,
          subtitleSize: 14,
        };
    }
  };

  const { logoSize, titleSize, subtitleSize } = getSizeStyles();

  return (
    <View style={[styles.container, centered && styles.centered]}>
      <View style={styles.logoContainer}>
        {/* Brain Icon */}
        <View style={[styles.brainIcon, { width: logoSize, height: logoSize }]}>
          <Text style={[styles.brainText, { fontSize: logoSize * 0.6 }]}>🧠</Text>
        </View>
        
        {/* Neural Network Lines */}
        <View style={[styles.neuralNetwork, { width: logoSize * 2, height: logoSize * 1.5 }]}>
          {/* Connection lines */}
          <View style={[styles.connectionLine, styles.line1]} />
          <View style={[styles.connectionLine, styles.line2]} />
          <View style={[styles.connectionLine, styles.line3]} />
          <View style={[styles.connectionLine, styles.line4]} />
          <View style={[styles.connectionLine, styles.line5]} />
        </View>
      </View>
      
      <Text style={[styles.title, { fontSize: titleSize }]}>AlzHelper</Text>
      {showSubtitle && (
        <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
          Neurological Care Assistant
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  brainIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  brainText: {
    textAlign: 'center',
  },
  neuralNetwork: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  connectionLine: {
    position: 'absolute',
    backgroundColor: colors.text.light,
    opacity: 0.3,
  },
  line1: {
    top: '20%',
    left: '10%',
    width: '30%',
    height: 1,
  },
  line2: {
    top: '40%',
    right: '15%',
    width: '25%',
    height: 1,
  },
  line3: {
    bottom: '30%',
    left: '20%',
    width: '35%',
    height: 1,
  },
  line4: {
    top: '60%',
    right: '25%',
    width: '20%',
    height: 1,
  },
  line5: {
    bottom: '20%',
    right: '10%',
    width: '40%',
    height: 1,
  },
  title: {
    ...typography.h1,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default Logo; 
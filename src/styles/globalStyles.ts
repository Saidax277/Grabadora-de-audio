import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#050505', 
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(5, 5, 5, 0.85)',
  },

  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  title: { 
    fontSize: 28, 
    color: '#FF3131', 
    textAlign: 'center', 
    fontWeight: '900', 
    textTransform: 'uppercase', 
    marginTop: 60,
    letterSpacing: 5,
    textShadowColor: 'rgba(255, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },

  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
  },

  recorderSection: { 
    alignItems: 'center', 
    marginVertical: 30,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },

  mainButton: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    backgroundColor: '#121212', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 3, 
    borderColor: '#222',
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },

  recordingActive: { 
    backgroundColor: '#200', 
    borderColor: '#FF3131',
    borderWidth: 4,
    transform: [{ scale: 1.1 }] 
  },

  btnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14, 
    letterSpacing: 2,
    opacity: 0.9 
  },

  timerText: {
    color: '#FF3131',
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginTop: 15,
    fontWeight: 'bold',
  },

  spellListContainer: {
    paddingBottom: 100,
  },

  spellItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    backgroundColor: '#0f0f0f', 
    marginBottom: 16, 
    borderRadius: 15, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderLeftWidth: 5, 
    borderLeftColor: '#400', 
  },

  spellItemActive: {
    borderColor: '#800',
    backgroundColor: '#1a0505',
  },

  spellInfo: {
    flex: 1,
  },

  spellText: { 
    color: '#E0E0E0', 
    fontSize: 17, 
    fontWeight: '700',
    marginBottom: 4,
  },

  spellDate: {
    color: '#555',
    fontSize: 11,
    textTransform: 'uppercase',
  },

  itemActions: { 
    flexDirection: 'row',
    gap: 10,
  },
  
  actionIcon: { 
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },

  deleteIcon: {
    borderColor: '#300',
  },

  clearBtn: { 
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 18, 
    alignItems: 'center', 
    backgroundColor: 'rgba(30, 0, 0, 0.6)', 
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: '#600',
  },

  clearBtnText: {
    color: '#FF3131',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 12,
  },

  loadingBox: {
    padding: 30,
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3131',
    alignItems: 'center',
  },

  emptyState: {
    marginTop: 50,
    alignItems: 'center',
    opacity: 0.5,
  },

  emptyText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  }
});
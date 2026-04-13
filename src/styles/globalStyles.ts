import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', paddingHorizontal: 20 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' },

  title: { fontSize: 28, color: '#ffcc00', textAlign: 'center', marginVertical: 30, fontWeight: '900', textTransform: 'uppercase' },
  
  recorderSection: { alignItems: 'center', marginBottom: 40 },

  mainButton: { 
    width: 110, height: 110, borderRadius: 55, backgroundColor: '#1a1a1a', 

    justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#ffcc00' 

  },

  recordingActive: { backgroundColor: '#600', borderColor: '#ff0000' },

  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  statusText: { color: '#ff0000', marginTop: 15, fontWeight: 'bold', letterSpacing: 2 },

  spellItem: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 20, 

    backgroundColor: '#1a1a1a', marginBottom: 12, borderRadius: 12, alignItems: 'center',

    borderLeftWidth: 5, borderLeftColor: '#ffcc00'
  },
  spellText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  itemActions: { flexDirection: 'row' },
  
  actionIcon: { marginLeft: 20 },

  clearBtn: { padding: 18, alignItems: 'center', backgroundColor: '#300', borderRadius: 15, marginBottom: 20 },
  
  loadingText: { color: '#ffcc00', marginTop: 20, fontWeight: 'bold' }
});
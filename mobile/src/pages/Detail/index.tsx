import React, { useEffect, useState } from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, SafeAreaView, Linking , TouchableOpacity} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface Data {
  serializedPoint: {
    id: number,
    image: string;
    name: string;
    responsibleName: string;
    email: string;
    whatsapp: number;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
    image_url: string;
  };
  serializedItems: {
    id: number;
    title: string;
    image_url: string;
    category: number; 
  }[];
}

const Detail = () => {
    const [dataResponse, setDataResponse] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
      api.get(`points/${routeParams.point_id}`).then(response => {
        setDataResponse(response.data);
      });
    }, []);
  
    function handleNavigateBack() {
      navigation.goBack();
    }
  
    function handleWhatsapp() {
      Linking.openURL(`whatsapp://send?phone=${dataResponse.serializedPoint.whatsapp}&text=Tenho interesse sobre os produtos da sua horta!`);
    }
  
    function handleComposeMail() {
      MailComposer.composeAsync({
        subject: 'Interesse nos produtos da sua horta',
        recipients: [dataResponse.serializedPoint.email],
      })
    }
  
    if (!dataResponse.serializedPoint) {
      return null;
    }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={20} color="#AF2708" />
          </TouchableOpacity>
  
          <Image style={styles.pointImage} source={{ uri: dataResponse.serializedPoint.image_url }} />
        
          <Text style={styles.pointName}>{dataResponse.serializedPoint.name}</Text>
          <Text style={styles.pointItems}>
            {dataResponse.serializedItems.map(item => item.title).join(', ')}
          </Text>
  
          <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>{dataResponse.serializedPoint.city}, {dataResponse.serializedPoint.uf}</Text>
          </View>

          <View style={styles.address}>
            <Text style={styles.addressTitle}>Responsável pela horta</Text>
            <Text style={styles.addressContent}>{dataResponse.serializedPoint.responsibleName}</Text>
          </View>          
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleWhatsapp}>
            <FontAwesome name="whatsapp" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>
  
          <RectButton style={styles.button} onPress={handleComposeMail}>
            <Icon name="mail" size={20} color="#FFF" />
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#AF2708',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#CC4729'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#AF2708',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#CC4729'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#AF2708',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#AF2708',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });
  
  export default Detail;
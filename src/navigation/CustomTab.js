import {TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {FULL_WIDTH} from '../common/Constant';
import Typography from '../components/ui/Typography';
import Icon from '../components/ui/Icon';
import { Colors } from '../common/Colors';
import { Icons } from '../common/Icons';

const arr = [
  {
    name: 'Home',
    icon : Icons.home,
    activeIcon : Icons.filledHome,
    navigate: 'HomeTab',
  },
  {
    name: 'Booking History',
    icon : Icons.booking,
    activeIcon : Icons.booking,
    navigate: 'BookingHistory',
  },
  // {
  //   name: 'My Offers',
  //   icon : Icons.offers,
  //   // activeIcon : images.activeIssueTab,
  //   navigate: 'MyOffers',
  // },
  {
    name: 'Account',
    icon : Icons.account,
    activeIcon : Icons.filledAccount,
    navigate: 'Account',
  },
];

const ListTab = ({
  currentIndex = 0,
  index = 0,
  item = {},
  onPress = () => {},
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          width: FULL_WIDTH / 4,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: FULL_WIDTH / 8,
          height: FULL_WIDTH / 4,
          bottom: 20
        }}>
        <Icon
          onPress={() => onPress()}
          source={index == currentIndex ? item.activeIcon : item.icon}
          size={index == currentIndex ? 30 : 30}
          tintColor={index == currentIndex ? Colors.black : null}
        />

        {index == currentIndex ? 
          <Typography style={{marginTop: 4}}>{item?.name}</Typography>
          :
          <Typography style={{marginTop: 4, color: Colors.para}}>{item?.name}</Typography>
        }
      </TouchableOpacity>
    </View>
  );
};

const CustomTab = props => {
  // console.log();
  const [tabList, setTablist] = useState(arr);
  const currentIndex = props?.state?.index;
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 70,
        width: FULL_WIDTH,
        elevation: 5,
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderColor: 'lightgrey',
        paddingTop:10
      }}>
      <View style={{flexDirection: 'row', backgroundColor: 'white',justifyContent:"space-between"}}>
        {arr.map((item, index) => (
          <ListTab
            item={item}
            index={index}
            currentIndex={currentIndex}
            onPress={() => {
              console.log("m,b,b,",item)
              navigation?.navigate(item?.navigate)}}
          />
        ))}
      </View>
    </View>
  );
};

export default CustomTab;

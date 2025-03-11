import { Modal, TouchableOpacity } from "react-native"
import Icon from "../ui/Icon"
import { Icons } from "../../common/Icons"
import { openCamera, openPicker } from 'react-native-image-crop-picker';
import { PERMISSIONS, request } from "react-native-permissions";

const ImagePicker =({
    visible= false,
    onClose=()=>{},
    selected=()=>{}
})=>{
    const onSelect = async(type= "camera")=>{
      var open = type =="camera" ? openCamera : openPicker
        setTimeout(async () => {
            const response = await open({
            //   mediaType: mediaType,
              width: 200,
              height: 200,
              cropping: true,
              // compressImageQuality: 0.2
            })
              .then(async response => {
                console.log('sadasd',response);
               selected({
                name : response?.path,
                type : response.mime,
                uri  : response.path
               })
                onClose();
              })
              .catch(err => {
                console.log('error', err)
                // toast.show(localization.permissions.camera.provide)
                // SimpleToast.show(localization.permissions.camera.provide, SimpleToast.SHORT)
                
                onClose();
              });
          }, 200);
       
        
    }
    return(
        <Modal transparent visible={visible} >
<TouchableOpacity activeOpacity={1} onPress={onClose} style={{
    flex: 1,justifyContent: "flex-end",alignItems: "center",backgroundColor: "rgba(0,0,0,0.5)"
}} >
    <TouchableOpacity activeOpacity={1}  style={{
        padding: 15,backgroundColor: "white",margin:20,flexDirection: 'row',borderRadius: 20,elevation: 5
    }} >
<TouchableOpacity onPress={()=> onSelect("camera")} style={{flex:1,height: 100,justifyContent: 'center',alignItems: 'center'}} >
<Icon source={Icons.camera} resizeMode="contain" size={70}   onPress={()=> onSelect("camera")}  touchable/>
</TouchableOpacity>
<TouchableOpacity  onPress={()=> onSelect("gallery")} style={{flex:1,height: 100,justifyContent: 'center',alignItems: 'center'}} >
<Icon onPress={()=> onSelect("gallery")} resizeMode="contain" source={Icons.gallery} size={70} touchable />
</TouchableOpacity>
    </TouchableOpacity>
</TouchableOpacity>
        </Modal>
    )
}

export default ImagePicker